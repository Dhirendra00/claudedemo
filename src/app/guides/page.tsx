import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { guides } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: "Buying guides",
  description: "How to choose rackets, strings, padel paddles and court shoes.",
};

export default function GuidesPage() {
  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Buying guides" }]} />

        <header className="mt-8 max-w-2xl lg:mt-12">
          <p className="eyebrow text-muted">Advice</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Buying guides</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Plain-spoken advice from our stringers and fitters, so you buy the right gear the first time.
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-2 gap-x-0.5 gap-y-10 sm:gap-x-1 lg:mt-14 lg:grid-cols-4">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link href={`/guides/${guide.slug}`} className="group block">
                {guide.image && (
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                    <Image
                      src={guide.image.src}
                      alt={guide.image.alt}
                      fill
                      sizes="(min-width: 1024px) 300px, 50vw"
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <h2 className="mt-4 pr-2 font-display text-xl leading-tight sm:text-2xl">{guide.title}</h2>
                <p className="mt-2 pr-2 text-xs leading-relaxed text-muted sm:text-sm">{guide.intro}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
