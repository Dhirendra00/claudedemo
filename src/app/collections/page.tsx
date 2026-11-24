import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getCategories } from "@/lib/catalog";
import { asCollection, childCollections, curatedCollections } from "@/lib/collections";
import type { Collection } from "@/lib/product";

// Re-render at most once a minute so new categories show up.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "All collections",
  description: "Browse every category at Racket Point Nepal: rackets, shoes, shuttles, clothing, bags and padel.",
};

export default async function CollectionsPage() {
  const categories = await getCategories();
  const categorySlugs = new Set(categories.map((category) => category.slug));
  // Top-level curated collections (accessories, sale, bestsellers) that aren't database categories.
  const edits = curatedCollections.filter((item) => !item.parent && !categorySlugs.has(item.slug)).map(asCollection);

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />

        <header className="mt-8 max-w-2xl lg:mt-12">
          <p className="eyebrow text-muted">Shop</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">All collections</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Everything we stock, by category. Pick a sport or a type of gear to narrow it down.
          </p>
        </header>

        <CollectionList items={categories} label="Categories" className="mt-10 lg:mt-14" />

        <section aria-labelledby="edits-heading" className="mt-16 border-t border-line pt-12 lg:mt-24 lg:pt-16">
          <p className="eyebrow text-muted">Edits</p>
          <h2 id="edits-heading" className="mt-3 mb-8 font-display text-3xl sm:text-4xl lg:mb-12 lg:text-5xl">
            More ways to shop
          </h2>
          <CollectionList items={edits} label="Edits" />
        </section>
      </div>
    </main>
  );
}

function CollectionList({ items, label, className = "" }: { items: Collection[]; label: string; className?: string }) {
  return (
    <ul aria-label={label} className={`grid grid-cols-2 gap-x-0.5 gap-y-10 sm:gap-x-1 lg:grid-cols-3 ${className}`}>
      {items.map((item) => {
        const children = childCollections(item.slug);
        return (
          <li key={item.slug}>
            <Link href={`/collections/${item.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-4 text-sm font-medium sm:text-base">{item.title}</h3>
              <p className="mt-1 pr-2 text-xs text-muted sm:text-sm">{item.description}</p>
            </Link>
            {children.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 pr-2 text-xs sm:text-sm">
                {children.map((child) => (
                  <li key={child.slug}>
                    <Link href={`/collections/${child.slug}`} className="underline-offset-4 hover:underline">
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
