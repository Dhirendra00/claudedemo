import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import { SearchIcon } from "@/components/ui/icons";
import { getCategories, searchProducts, searchTerms } from "@/lib/catalog";
import { asCollection, curatedCollections } from "@/lib/collections";
import { brands } from "@/lib/sample-catalog";

const popularSearches = ["Badminton racket", "Feather shuttles", "Court shoes", "Padel", "Tennis", "Bags"];

/** The `q` param as a single trimmed string (repeated params use the first value). */
function readQuery(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export async function generateMetadata({ searchParams }: PageProps<"/search">): Promise<Metadata> {
  const query = readQuery((await searchParams).q);
  return {
    title: query ? `Search: ${query}` : "Search",
    // Result pages are endless permutations of the catalog; keep them out of search engines.
    robots: { index: false, follow: true },
  };
}

// Reads the query from the URL, so this page renders on every request.
export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const query = readQuery((await searchParams).q);
  const terms = searchTerms(query);
  const [results, categories] = await Promise.all([searchProducts(query), getCategories()]);

  // Collections and brands whose names contain every word of the query.
  const matchesName = (name: string) => terms.length > 0 && terms.every((term) => name.toLowerCase().includes(term));
  const shortcuts = [
    ...[...categories, ...curatedCollections.map(asCollection)]
      .filter((item, index, all) => all.findIndex((other) => other.slug === item.slug) === index)
      .filter((item) => matchesName(item.title))
      .map((item) => ({ label: item.title, href: `/collections/${item.slug}` })),
    ...brands.filter((brand) => matchesName(brand.name)).map((brand) => ({ label: brand.name, href: `/brands/${brand.slug}` })),
  ];

  const count = `${results.length} ${results.length === 1 ? "result" : "results"}`;

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

        <header className="mt-8 max-w-3xl lg:mt-12">
          <p className="eyebrow text-muted">Search</p>
          <h1 className="mt-3 font-display text-4xl leading-tight break-words sm:text-5xl lg:text-6xl">
            {query ? <>Results for &ldquo;{query}&rdquo;</> : "What are you looking for?"}
          </h1>

          <form action="/search" role="search" className="mt-8 flex">
            <label className="flex h-12 min-w-0 flex-1 items-center gap-3 border border-r-0 border-line px-4 transition-colors focus-within:border-ink">
              <SearchIcon className="shrink-0 text-muted" />
              <span className="sr-only">Search products</span>
              <input
                type="search"
                name="q"
                defaultValue={query}
                autoFocus={!query}
                maxLength={100}
                placeholder="Search rackets, shoes, shuttles…"
                className="h-full w-full min-w-0 bg-transparent text-sm placeholder:text-muted focus:outline-none"
              />
            </label>
            <button type="submit" className="eyebrow h-12 shrink-0 bg-ink px-6 text-paper transition-colors hover:bg-ink/85 sm:px-8">
              Search
            </button>
          </form>
        </header>

        {query ? (
          <>
            <div className="mt-10 flex flex-col gap-4 border-y border-line py-4 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
              {shortcuts.length > 0 ? (
                <nav aria-label="Matching collections and brands" className="-mx-4 sm:-mx-6 lg:mx-0">
                  <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 sm:px-6 lg:flex-wrap lg:px-0">
                    {shortcuts.map((item) => (
                      <li key={item.href} className="shrink-0">
                        <Link
                          href={item.href}
                          className="eyebrow inline-flex h-9 items-center border border-line px-4 transition-colors hover:border-ink"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : (
                <span className="hidden lg:block" />
              )}
              <p className="shrink-0 text-xs text-muted" role="status">
                {count}
              </p>
            </div>

            <div className="mt-6 lg:mt-8">
              {results.length > 0 ? (
                <ProductGrid products={results} label={`Search results for ${query}`} />
              ) : (
                <div className="border-b border-line py-16 text-center">
                  <p className="font-display text-2xl sm:text-3xl">No matches</p>
                  <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                    Nothing matched &ldquo;{query}&rdquo;. Check the spelling, try a broader word like &ldquo;racket&rdquo;, or
                    browse the collections.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <ButtonLink href="/collections">Browse collections</ButtonLink>
                    <ButtonLink href="/contact" variant="outline">
                      Ask our team
                    </ButtonLink>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : null}

        {results.length === 0 && (
          <section aria-labelledby="suggestions-heading" className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
            <div className="border-t border-line pt-6">
              <h2 id="suggestions-heading" className="eyebrow">
                Popular searches
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <li key={term}>
                    <Link
                      href={`/search?q=${encodeURIComponent(term)}`}
                      className="eyebrow inline-flex h-9 items-center border border-line px-4 transition-colors hover:border-ink"
                    >
                      {term}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-line pt-6">
              <h2 className="eyebrow">Shop by category</h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/collections/${category.slug}`} className="underline-offset-4 hover:underline">
                      {category.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/collections/sale" className="text-sale underline-offset-4 hover:underline">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
