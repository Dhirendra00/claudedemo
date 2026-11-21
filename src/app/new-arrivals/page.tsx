import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { StockStatus } from "@/components/product/stock-status";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import { getNewArrivals } from "@/lib/catalog";
import { discountPercent, formatPrice, type Product } from "@/lib/product";

// Re-render at most once a minute so newly added products, price and stock changes show up.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "New arrivals",
  description: "The latest rackets, shoes, shuttles, clothing and accessories to land at Racket Point Nepal.",
};

export default async function NewArrivalsPage() {
  const [latest, ...rest] = await getNewArrivals();

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "New arrivals" }]} />

        <header className="mt-8 max-w-2xl lg:mt-12">
          <p className="eyebrow text-muted">Just landed</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">New arrivals</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            The latest gear in store, newest first. Fresh stock sells quickly, so check sizes while they last.
          </p>
        </header>

        {latest ? (
          <>
            <LatestSpotlight product={latest} />

            {rest.length > 0 && (
              <section aria-labelledby="more-arrivals-heading" className="mt-16 border-t border-line pt-12 lg:mt-24 lg:pt-16">
                <SectionHeading id="more-arrivals-heading" eyebrow="Also new" title="Recently added" />
                <ProductGrid products={rest} label="Recently added products" />
              </section>
            )}
          </>
        ) : (
          <div className="mt-12 border-y border-line py-16 text-center">
            <p className="text-sm text-muted">Nothing new just yet. Check back soon.</p>
            <ButtonLink href="/" variant="outline" className="mt-6">
              Back to home
            </ButtonLink>
          </div>
        )}
      </div>
    </main>
  );
}

function LatestSpotlight({ product }: { product: Product }) {
  const [image] = product.images;
  const discount = discountPercent(product);
  const href = `/products/${product.slug}`;

  return (
    <section aria-labelledby="latest-heading" className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-16">
      <Link href={href} className="group relative block aspect-square overflow-hidden bg-stone" tabIndex={-1} aria-hidden="true">
        <Image
          src={image.src}
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
        />
        <span className="eyebrow absolute top-3 left-3 bg-ink px-2 py-1 text-[0.625rem] text-paper">Latest</span>
      </Link>

      <div>
        <p className="eyebrow text-muted">
          {product.brand} <span aria-hidden="true">·</span> {product.category}
        </p>
        <h2 id="latest-heading" className="mt-2 text-2xl leading-tight font-medium sm:text-3xl">
          <Link href={href} className="hover:underline">
            {product.name}
          </Link>
        </h2>

        <div className="mt-6">
          {product.compareAtPrice ? (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="sr-only">Sale price: </span>
              <span className="text-2xl font-medium text-sale">{formatPrice(product.price)}</span>
              <span className="sr-only">, was </span>
              <s className="text-muted">{formatPrice(product.compareAtPrice)}</s>
              <span className="eyebrow bg-sale px-2 py-1 text-[0.625rem] text-paper">−{discount}%</span>
            </p>
          ) : (
            <p className="text-2xl font-medium">
              <span className="sr-only">Price: </span>
              {formatPrice(product.price)}
            </p>
          )}
          <p className="mt-1 text-xs text-muted">Inclusive of VAT</p>
        </div>

        <div className="mt-4">
          <StockStatus product={product} />
        </div>

        <p className="mt-6 border-t border-line pt-6 text-sm leading-relaxed text-muted">{product.description}</p>

        {product.highlights.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm">
            {product.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-ink" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <ButtonLink href={href} className="mt-8 w-full sm:w-auto">
          View product
        </ButtonLink>
      </div>
    </section>
  );
}
