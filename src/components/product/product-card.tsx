import Image from "next/image";
import Link from "next/link";
import { discountPercent, formatPrice, stockState, type Product } from "@/lib/sample-catalog";

type ProductCardProps = {
  product: Product;
  sizes?: string;
};

export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
}: ProductCardProps) {
  const discount = discountPercent(product);
  const soldOut = stockState(product) === "out_of_stock";
  const [image] = product.images;

  return (
    // `relative` keeps the absolutely positioned sr-only text inside the card (and inside scroll containers).
    <Link href={`/products/${product.slug}`} className="group relative block bg-paper pb-4">
      <div className="relative aspect-square p-3">
        {/* Sample photos are lifestyle shots, so they fill the frame; switch to object-contain for cut-out packshots. */}
        <div className="relative h-full overflow-hidden bg-stone">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className={`object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04] ${soldOut ? "opacity-60" : ""}`}
          />
        </div>
        {soldOut ? (
          <span className="eyebrow absolute top-3 left-3 bg-paper px-2 py-1 text-[0.625rem] text-ink">
            Sold out
          </span>
        ) : discount ? (
          <span className="eyebrow absolute top-3 left-3 bg-sale px-2 py-1 text-[0.625rem] text-paper">
            −{discount}%
          </span>
        ) : (
          product.badge && (
            <span className="eyebrow absolute top-3 left-3 bg-ink px-2 py-1 text-[0.625rem] text-paper">
              {product.badge}
            </span>
          )
        )}
      </div>
      <div className="px-3 text-center">
        <p className="eyebrow text-[0.625rem] text-muted">{product.brand}</p>
        <h3 className="mt-1.5 text-sm leading-snug group-hover:underline">{product.name}</h3>
        <p className="mt-2 text-sm">
          {product.compareAtPrice ? (
            <>
              <span className="sr-only">Sale price: </span>
              <span className="font-medium whitespace-nowrap text-sale">{formatPrice(product.price)}</span>
              <span className="sr-only">, was </span>
              <s className="ml-2 whitespace-nowrap text-muted">{formatPrice(product.compareAtPrice)}</s>
            </>
          ) : (
            <>
              <span className="sr-only">Price: </span>
              <span className="font-medium">{formatPrice(product.price)}</span>
            </>
          )}
        </p>
      </div>
    </Link>
  );
}
