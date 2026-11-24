import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import type { ContentPageData } from "@/lib/content-pages";
import type { NavLink } from "@/lib/site-nav";

type ContentPageProps = {
  page: ContentPageData;
  /** Trail above the page title, ending with the parent (the page's own title is appended). */
  trail: { label: string; href?: string }[];
  /** Sibling pages listed in the side menu, e.g. the other help topics. */
  related?: { title: string; links: NavLink[] };
  currentHref?: string;
};

// Editorial layout shared by help, guide, legal and service pages: title block, optional banner,
// a side menu of related pages and the page's sections.
export function ContentPage({ page, trail, related, currentHref }: ContentPageProps) {
  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[...trail, { label: page.title }]} />

        <header className="mt-8 max-w-2xl lg:mt-12">
          <p className="eyebrow text-muted">{page.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{page.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{page.intro}</p>
        </header>

        {page.image && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-stone sm:aspect-[21/9] lg:mt-14">
            <Image src={page.image.src} alt={page.image.alt} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-16">
          {related && (
            <aside className="lg:order-none order-last">
              <nav aria-label={related.title} className="border-t border-line pt-6 lg:sticky lg:top-44">
                <p className="eyebrow text-muted">{related.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {related.links.map((link) => {
                    const current = link.href === currentHref;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={current ? "page" : undefined}
                          className={current ? "font-medium underline underline-offset-4" : "text-muted hover:text-ink"}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}

          <article className={related ? "" : "lg:col-span-2 lg:max-w-3xl"}>
            {page.sections.map((section) => (
              <section key={section.heading} className="border-t border-line py-8 first:pt-6 lg:py-10">
                <h2 className="font-display text-2xl leading-tight sm:text-3xl">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 max-w-[65ch] text-sm leading-relaxed sm:text-base">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 max-w-[65ch] space-y-2.5 text-sm sm:text-base">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-ink" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.facts && (
                  <dl className="mt-6 max-w-2xl border-t border-line text-sm">
                    {section.facts.map((fact) => (
                      <div key={fact.label} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6">
                        <dt className="font-medium">{fact.label}</dt>
                        <dd className="break-words text-muted">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}

            <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              {page.cta ? (
                <ButtonLink href={page.cta.href}>{page.cta.label}</ButtonLink>
              ) : (
                <span />
              )}
              {currentHref !== "/contact" && (
                <p className="text-sm text-muted">
                  Still need help?{" "}
                  <TextLink href="/contact" className="ml-2">
                    Contact us
                  </TextLink>
                </p>
              )}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
