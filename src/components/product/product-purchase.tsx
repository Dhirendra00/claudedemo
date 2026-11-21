"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonStyles } from "@/components/ui/button-link";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { addToCart, MAX_PER_ORDER } from "@/lib/cart";
import type { Product } from "@/lib/product";

type ProductPurchaseProps = {
  product: Pick<Product, "slug" | "name" | "brand" | "images" | "price" | "compareAtPrice" | "stock" | "option">;
};

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const { name, stock, option } = product;
  const [selected, setSelected] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<{ text: string; error?: boolean; link?: boolean } | null>(null);

  const soldOut = stock <= 0;
  const maxQuantity = Math.min(stock, MAX_PER_ORDER);

  function addToBag() {
    if (option && !selected) {
      // "Size (EU)" → "size": drop the unit note in brackets.
      const label = option.name.replace(/\s*\(.*\)/, "").toLowerCase();
      setMessage({ text: `Choose your ${label} first.`, error: true });
      return;
    }
    const added = addToCart(product, quantity, selected ?? undefined);
    if (added === 0) {
      setMessage({ text: `Your bag already holds the most we can sell of this item (${maxQuantity}).`, error: true });
      return;
    }
    const variant = selected ? ` (${selected})` : "";
    setMessage({ text: `Added ${added} × ${name}${variant} to your bag.`, link: true });
  }

  if (soldOut) {
    return (
      <div className="space-y-3">
        <button type="button" disabled className={`${buttonStyles("solid")} w-full`}>
          Sold out
        </button>
        <button
          type="button"
          onClick={() => setMessage({ text: "We'll email you when it's back in stock." })}
          className={`${buttonStyles("outline")} w-full`}
        >
          Email me when it&rsquo;s back
        </button>
        {message && (
          <p role="status" className="text-sm">
            {message.text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {option && (
        <fieldset>
          <legend className="eyebrow flex w-full justify-between">
            <span>{option.name}</span>
            {selected && <span className="text-muted normal-case tracking-normal">{selected}</span>}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {option.values.map((value) => (
              <label key={value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="option"
                  value={value}
                  checked={selected === value}
                  onChange={() => {
                    setSelected(value);
                    setMessage(null);
                  }}
                  className="peer sr-only"
                />
                <span className="grid h-11 min-w-12 place-items-center border border-line px-3 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink">
                  {value}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex gap-3">
        <QuantityStepper value={quantity} max={maxQuantity} onChange={setQuantity} />
        <button type="button" onClick={addToBag} className={`${buttonStyles("solid")} flex-1`}>
          Add to bag
        </button>
      </div>

      {message && (
        <p role={message.error ? "alert" : "status"} className={`text-sm ${message.error ? "text-sale" : ""}`}>
          {message.text}
          {message.link && (
            <>
              {" "}
              <Link href="/cart" className="underline underline-offset-4 hover:opacity-60">
                View bag
              </Link>
            </>
          )}
        </p>
      )}
    </div>
  );
}
