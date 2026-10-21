import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/home/section-heading";
import { PlusIcon } from "@/components/ui/icons";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductRail } from "@/components/product/product-rail";
import { StockStatus } from "@/components/product/stock-status";
import {
  discountPercent,
  formatPrice,
  getCategory,
  getProduct,
  products,
  relatedProducts,
} from "@/lib/sample-catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.collection);
  const discount = discountPercent(product);
  const services = [
    { title: "Valley delivery", detail: "Free in Kathmandu Valley over Rs. 5,000, usually in 1–2 days." },
    // Frames sold with a grip choice ship unstrung; pre-strung sets don't need the service.
    ...(product.collection === "rackets" && product.option
      ? [{ title: "Free stringing", detail: "Pick your string and tension at checkout; strung in store." }]
      : []),
    { title: "14-day exchanges", detail: "Unused, in original packaging." },
  ];

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            {category && (
              <li className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <Link href={`/collections/${category.slug}`} className="hover:text-ink">
                  {category.title}
                </Link>
              </li>
            )}
            <li className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="mt-4 grid gap-8 lg:mt-6 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <ProductGallery images={product.images} />

          <div className="lg:sticky lg:top-36 lg:self-start">
            <Link href={`/brands/${product.brand.toLowerCase().replace(/\s+/g, "-")}`} className="eyebrow text-muted hover:text-ink">
              {product.brand}
            </Link>
            <h1 className="mt-2 text-2xl leading-tight font-medium sm:text-3xl">{product.name}</h1>
            <p className="mt-2 text-sm text-muted">
              {category && (
                <>
                  <Link href={`/collections/${category.slug}`} className="underline-offset-4 hover:text-ink hover:underline">
                    {category.title}
                  </Link>
                  <span aria-hidden="true"> · </span>
                </>
              )}
              {product.category}
            </p>

            <div className="mt-6">
              {product.compareAtPrice ? (
                <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="sr-only">Sale price: </span>
                  <span className="text-2xl font-medium text-sale">{formatPrice(product.price)}</span>
                  <span className="sr-only">, was </span>
                  <s className="text-muted">{formatPrice(product.compareAtPrice)}</s>
                  <span className="eyebrow bg-sale px-2 py-1 text-[0.625rem] text-paper">
                    Save {formatPrice(product.compareAtPrice - product.price)} ({discount}%)
                  </span>
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

            <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-ink" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ProductPurchase name={product.name} stock={product.stock} option={product.option} />
            </div>

            <ul className="mt-8 grid gap-4 border-y border-line py-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {services.map((service) => (
                <li key={service.title}>
                  <p className="eyebrow">{service.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{service.detail}</p>
                </li>
              ))}
            </ul>

            <div>
              <Disclosure title="Description" open>
                <p>{product.description}</p>
              </Disclosure>
              <Disclosure title="Specifications">
                <dl className="divide-y divide-line">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-6 py-2">
                      <dt className="text-muted">{spec.label}</dt>
                      <dd className="text-right text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </Disclosure>
              <Disclosure title="Delivery & returns">
                <p>
                  Orders inside Kathmandu Valley arrive in 1–2 working days; other districts take 3–5 working days.
                  Unused items in their original packaging can be exchanged within 14 days of delivery.
                </p>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="related-heading" className="border-t border-line">
        <div className="shell pt-12 pb-16 lg:pt-16 lg:pb-24">
          <SectionHeading
            id="related-heading"
            eyebrow="More to explore"
            title="You may also like"
            link={category && { label: `Shop ${category.title.toLowerCase()}`, href: `/collections/${category.slug}` }}
          />
          <ProductRail products={relatedProducts(product)} label="Related products" />
        </div>
      </section>
    </main>
  );
}

function Disclosure({ title, open, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <PlusIcon className="shrink-0 transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-muted">{children}</div>
    </details>
  );
}
