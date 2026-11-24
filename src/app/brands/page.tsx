import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getFeaturedProducts } from "@/lib/catalog";
import { brands } from "@/lib/sample-catalog";

// Re-render at most once a minute so product counts stay current.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Brands",
  description: "Every racket, shoe and shuttle brand stocked at Racket Point Nepal.",
};

export default async function BrandsPage() {
  const products = await getFeaturedProducts();
  const countFor = (name: string) => products.filter((product) => product.brand === name).length;

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Brands" }]} />

        <header className="mt-8 max-w-2xl lg:mt-12">
          <p className="eyebrow text-muted">Shop by brand</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Brands</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Genuine stock from every brand we carry, sourced direct or through authorised distributors in Nepal.
          </p>
        </header>

        <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {brands.map((brand) => {
            const count = countFor(brand.name);
            return (
              <li key={brand.slug}>
                <Link href={`/brands/${brand.slug}`} className="flex h-full flex-col bg-paper p-6 transition-colors hover:bg-stone sm:p-8">
                  <span className="font-display text-2xl tracking-[0.12em] uppercase sm:text-3xl">{brand.name}</span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed text-muted">{brand.description}</span>
                  <span className="eyebrow mt-6">
                    {count > 0 ? `${count} ${count === 1 ? "product" : "products"}` : "Coming soon"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
