import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import { getProductsByBrand } from "@/lib/catalog";
import { brands, findBrand } from "@/lib/sample-catalog";

// Re-render at most once a minute so price and stock changes show up.
export const revalidate = 60;
// Brands are static content, so any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/brands/[slug]">): Promise<Metadata> {
  const brand = findBrand((await params).slug);
  if (!brand) return {};
  return { title: brand.name, description: brand.description };
}

export default async function BrandPage({ params }: PageProps<"/brands/[slug]">) {
  const brand = findBrand((await params).slug);
  if (!brand) notFound();

  const products = await getProductsByBrand(brand.name);
  const count = `${products.length} ${products.length === 1 ? "product" : "products"}`;

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Brands", href: "/brands" }, { label: brand.name }]} />

        <header className="mt-8 grid gap-6 border-b border-line pb-10 lg:mt-12 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16 lg:pb-14">
          <div>
            <p className="eyebrow text-muted">Brand</p>
            <h1 className="mt-3 font-display text-4xl leading-tight tracking-[0.12em] uppercase sm:text-5xl lg:text-6xl">
              {brand.name}
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">{brand.description}</p>
        </header>

        <div className="flex flex-col gap-4 border-b border-line py-4 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Brands" className="-mx-4 sm:-mx-6 lg:mx-0">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 sm:px-6 lg:flex-wrap lg:px-0">
              {brands.map((item) => {
                const current = item.slug === brand.slug;
                return (
                  <li key={item.slug} className="shrink-0">
                    <Link
                      href={`/brands/${item.slug}`}
                      aria-current={current ? "page" : undefined}
                      className={`eyebrow inline-flex h-9 items-center border px-4 transition-colors ${
                        current ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <p className="shrink-0 text-xs text-muted">{count}</p>
        </div>

        <div className="mt-6 lg:mt-8">
          {products.length > 0 ? (
            <ProductGrid products={products} label={`${brand.name} products`} />
          ) : (
            <div className="border-b border-line py-16 text-center">
              <p className="font-display text-2xl sm:text-3xl">Coming soon</p>
              <p className="mt-3 text-sm text-muted">New {brand.name} stock is on its way.</p>
              <ButtonLink href="/brands" variant="outline" className="mt-6">
                See all brands
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
