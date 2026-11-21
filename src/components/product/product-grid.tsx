import type { Product } from "@/lib/product";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
  label: string;
};

// Listing grid: 2 columns on mobile, 4 on desktop, near-zero column gaps.
export function ProductGrid({ products, label }: ProductGridProps) {
  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-x-0.5 gap-y-4 sm:gap-x-1 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} sizes="(min-width: 1024px) 300px, 50vw" />
        </li>
      ))}
    </ul>
  );
}
