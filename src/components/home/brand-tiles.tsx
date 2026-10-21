import Link from "next/link";
import { brands } from "@/lib/sample-catalog";
import { SectionHeading } from "./section-heading";

// Hairline grid of brand wordmarks (text only until real logo artwork is licensed).
export function BrandTiles() {
  return (
    <section aria-labelledby="brands-heading" className="shell pt-12 lg:pt-16">
      <SectionHeading
        id="brands-heading"
        eyebrow="Brands"
        title="Shop by brand"
        link={{ label: "All brands", href: "/brands" }}
      />
      <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <li key={brand.slug}>
            <Link
              href={`/brands/${brand.slug}`}
              className="grid h-20 place-items-center bg-paper px-3 text-center font-display text-lg tracking-[0.12em] uppercase transition-colors hover:bg-stone sm:h-24 sm:text-xl"
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
