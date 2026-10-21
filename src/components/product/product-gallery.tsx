"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProductImage } from "@/lib/sample-catalog";

type ProductGalleryProps = {
  images: ProductImage[];
};

// Mobile: full-bleed swipeable strip with a counter. Desktop: stacked grid, lead image full width.
export function ProductGallery({ images }: ProductGalleryProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const list = listRef.current;
    if (!list) return;
    setActive(Math.round(list.scrollLeft / list.clientWidth));
  }

  return (
    <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
      <ul
        ref={listRef}
        onScroll={handleScroll}
        aria-label="Product images"
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto lg:grid lg:grid-cols-2 lg:gap-1 lg:overflow-visible"
      >
        {images.map((image, index) => {
          // The lead image spans both columns, and so does a last image that would otherwise sit alone.
          const fullWidth = index === 0 || (index === images.length - 1 && index % 2 === 1);
          return (
            <li
              key={image.src}
              className={`relative aspect-square w-full shrink-0 snap-start bg-stone lg:w-auto ${fullWidth ? "lg:col-span-2" : ""}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload={index === 0}
                sizes={fullWidth ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 29vw, 100vw"}
                className="object-cover"
              />
            </li>
          );
        })}
      </ul>
      {images.length > 1 && (
        <p aria-hidden="true" className="eyebrow absolute right-4 bottom-4 bg-paper px-2 py-1 sm:right-6 lg:hidden">
          {active + 1} / {images.length}
        </p>
      )}
    </div>
  );
}
