// Catalog types and pure helpers. Safe to import from client components;
// database queries live in `@/lib/catalog` (server only).

export type Sport = "badminton" | "tennis" | "padel" | "squash";

export type Collection = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductSpec = { label: string; value: string };

export type ProductOption = { name: string; values: string[] };

export type Product = {
  slug: string;
  name: string;
  brand: string;
  /** Slug of the parent category, used for breadcrumbs and links. */
  collection: string;
  /** Short product type shown under the name, e.g. "Badminton racket". */
  category: string;
  sport: Sport;
  price: number;
  compareAtPrice?: number;
  badge?: "New" | "Bestseller";
  /** Units available. 0 means sold out. */
  stock: number;
  /** First image is the card and listing image. */
  images: ProductImage[];
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  option?: ProductOption;
};

export type StockState = "in_stock" | "low_stock" | "out_of_stock";

const LOW_STOCK_THRESHOLD = 5;

export function formatPrice(amount: number) {
  return `Rs. ${new Intl.NumberFormat("en-IN").format(amount)}`;
}

export function discountPercent(product: Product) {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return null;
  return Math.round((1 - product.price / product.compareAtPrice) * 100);
}

export function stockState(product: Product): StockState {
  if (product.stock <= 0) return "out_of_stock";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}
