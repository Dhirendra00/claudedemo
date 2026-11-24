import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/home/faq";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { contactPage, helpPages, stringingPage, storePage, type ContentPageData } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: "Help centre",
  description: "Delivery, exchanges, warranty, stringing and how to reach Racket Point Nepal.",
};

const topics: { page: ContentPageData; href: string }[] = [
  ...helpPages.map((page) => ({ page, href: `/help/${page.slug}` })),
  { page: stringingPage, href: "/services/stringing" },
  { page: storePage, href: "/store" },
  { page: contactPage, href: "/contact" },
];

export default function HelpPage() {
  return (
    <main className="flex-1">
      <div className="shell pt-4 lg:pt-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Help" }]} />

        <header className="mt-8 max-w-2xl lg:mt-12">
          <p className="eyebrow text-muted">Help</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Help centre</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Everything you need to know about ordering, delivery and looking after your gear.
          </p>
        </header>

        <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {topics.map(({ page, href }) => (
            <li key={href}>
              <Link href={href} className="flex h-full flex-col bg-paper p-6 transition-colors hover:bg-stone sm:p-8">
                <span className="eyebrow text-muted">{page.eyebrow}</span>
                <span className="mt-3 font-display text-2xl leading-tight sm:text-3xl">{page.title}</span>
                <span className="mt-3 text-sm leading-relaxed text-muted">{page.intro}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Faq />
    </main>
  );
}
