import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import { getCategories, getCollection } from "@/lib/catalog";
import { childCollections, curatedCollections } from "@/lib/collections";

// Re-render at most once a minute so price and stock changes show up.
export const revalidate = 60;

// Database categories plus the curated collections in `@/lib/collections`.
export async function generateStaticParams() {
  const categories = await getCategories();
  return [...categories, ...curatedCollections].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCollection(slug);
  if (!result) return {};
  return { title: result.collection.title, description: result.collection.description };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const [result, categories] = await Promise.all([getCollection(slug), getCategories()]);
  if (!result) notFound();

  const { collection, parent, products } = result;
  const count = `${products.length} ${products.length === 1 ? "product" : "products"}`;
  // Sub-collections of this page, or of its parent when this page is itself a sub-collection.
  const familySlug = parent?.slug ?? collection.slug;
  const family = childCollections(familySlug);

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
            ...(parent ? [{ label: parent.title, href: `/collections/${parent.slug}` }] : []),
            { label: collection.title },
          ]}
        />

        <header className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[5fr_7fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-muted">{parent ? parent.title : "Shop the collection"}</p>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{collection.title}</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">{collection.description}</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-stone">
            <Image
              src={collection.image}
              alt={collection.imageAlt}
              fill
              priority
              sizes="(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </header>

        <div className="mt-10 flex flex-col gap-4 border-y border-line py-4 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Categories" className="-mx-4 sm:-mx-6 lg:mx-0">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 sm:px-6 lg:flex-wrap lg:px-0">
              {categories.map((item) => {
                const current = item.slug === familySlug;
                return (
                  <li key={item.slug} className="shrink-0">
                    <Link
                      href={`/collections/${item.slug}`}
                      aria-current={item.slug === collection.slug ? "page" : undefined}
                      className={`eyebrow inline-flex h-9 items-center border px-4 transition-colors ${
                        current ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <p className="shrink-0 text-xs text-muted">{count}</p>
        </div>

        {family.length > 0 && (
          <nav aria-label={`${parent?.title ?? collection.title} collections`} className="-mx-4 border-b border-line sm:-mx-6 lg:mx-0">
            <ul className="no-scrollbar flex gap-6 overflow-x-auto px-4 text-sm sm:px-6 lg:px-0">
              {[{ slug: familySlug, title: "All" }, ...family].map((item) => {
                const current = item.slug === collection.slug;
                return (
                  <li key={item.slug} className="relative shrink-0">
                    <Link
                      href={`/collections/${item.slug}`}
                      aria-current={current ? "page" : undefined}
                      className={`inline-flex h-11 items-center border-b-2 transition-colors ${
                        current ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <div className="mt-6 lg:mt-8">
          {products.length > 0 ? (
            <ProductGrid products={products} label={`${collection.title} products`} />
          ) : (
            <div className="border-b border-line py-16 text-center">
              <p className="font-display text-2xl sm:text-3xl">Coming soon</p>
              <p className="mt-3 text-sm text-muted">
                We&apos;re restocking {collection.title.toLowerCase()}. In the meantime, see what just landed.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {parent && (
                  <ButtonLink href={`/collections/${parent.slug}`}>Shop all {parent.title.toLowerCase()}</ButtonLink>
                )}
                <ButtonLink href="/new-arrivals" variant="outline">
                  Shop new arrivals
                </ButtonLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
