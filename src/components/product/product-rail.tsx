"use client";

import { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { Product } from "@/lib/sample-catalog";
import { ProductCard } from "./product-card";

type ProductRailProps = {
  products: Product[];
  label: string;
};

// Swipeable row of product cards; arrow buttons page through it on larger screens.
export function ProductRail({ products, label }: ProductRailProps) {
  const listRef = useRef<HTMLUListElement>(null);

  function page(direction: 1 | -1) {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ left: direction * list.clientWidth, behavior: "smooth" });
  }

  return (
    <div>
      <ul
        ref={listRef}
        aria-label={label}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-0.5 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:gap-1 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {products.map((product) => (
          <li
            key={product.slug}
            className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[calc((100%-0.75rem)/4)]"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div className="mt-6 hidden justify-end gap-2 lg:flex">
        <button
          type="button"
          onClick={() => page(-1)}
          aria-label="Previous products"
          className="grid size-11 place-items-center border border-line transition-colors hover:border-ink"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          aria-label="Next products"
          className="grid size-11 place-items-center border border-line transition-colors hover:border-ink"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
