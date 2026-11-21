// Browser-only shopping bag kept in localStorage. There is no cart table yet (see CLAUDE.md),
// so each line stores a snapshot of the product as it was when added.
// Only import this from client components.

import { useSyncExternalStore } from "react";
import type { Product, ProductImage } from "@/lib/product";

export const MAX_PER_ORDER = 10;

export type CartLine = {
  /** `slug` plus the chosen option value, so two grip sizes of one racket are separate lines. */
  id: string;
  slug: string;
  name: string;
  brand: string;
  image: ProductImage;
  price: number;
  compareAtPrice?: number;
  option?: { name: string; value: string };
  quantity: number;
  /** Upper limit for this line: stock at the time it was added, capped at MAX_PER_ORDER. */
  maxQuantity: number;
};

const STORAGE_KEY = "rpn-cart-v1";
const EMPTY: CartLine[] = [];

let lines: CartLine[] | null = null;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  if (lines) return lines;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    lines = Array.isArray(parsed) ? (parsed as CartLine[]) : EMPTY;
  } catch {
    lines = EMPTY;
  }
  return lines;
}

function write(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be full or blocked (private mode); the bag still works for this page view.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep tabs in sync: another tab changed the bag.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    lines = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const noopSubscribe = () => () => {};

export function useCart() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  // False during server render and hydration, so pages don't flash "empty" before storage is read.
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const count = items.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const savings = items.reduce(
    (sum, line) => sum + (line.compareAtPrice ? (line.compareAtPrice - line.price) * line.quantity : 0),
    0,
  );
  return { items, ready, count, subtotal, savings };
}

type AddableProduct = Pick<Product, "slug" | "name" | "brand" | "images" | "price" | "compareAtPrice" | "stock" | "option">;

/** Adds to the bag, merging with an existing line. Returns the quantity actually added (0 if at the limit). */
export function addToCart(product: AddableProduct, quantity: number, optionValue?: string) {
  const current = read();
  const id = optionValue ? `${product.slug}::${optionValue}` : product.slug;
  const maxQuantity = Math.min(product.stock, MAX_PER_ORDER);
  const existing = current.find((line) => line.id === id);
  const before = existing?.quantity ?? 0;
  const after = Math.min(maxQuantity, before + quantity);
  if (after <= before) return 0;

  const line: CartLine = existing
    ? { ...existing, quantity: after, maxQuantity, price: product.price, compareAtPrice: product.compareAtPrice }
    : {
        id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        option: optionValue && product.option ? { name: product.option.name, value: optionValue } : undefined,
        quantity: after,
        maxQuantity,
      };
  write(existing ? current.map((l) => (l.id === id ? line : l)) : [...current, line]);
  return after - before;
}

export function setLineQuantity(id: string, quantity: number) {
  write(
    read().map((line) =>
      line.id === id ? { ...line, quantity: Math.max(1, Math.min(line.maxQuantity, quantity)) } : line,
    ),
  );
}

export function removeLine(id: string) {
  write(read().filter((line) => line.id !== id));
}
