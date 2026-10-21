import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/sample-catalog";
import { SectionHeading } from "./section-heading";

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories-heading" className="shell py-12 lg:py-16">
      <SectionHeading
        id="categories-heading"
        eyebrow="Categories"
        title="Shop by category"
        link={{ label: "View all", href: "/collections" }}
      />
      <ul className="grid grid-cols-2 gap-x-0.5 gap-y-8 sm:gap-x-1 lg:grid-cols-3 lg:gap-y-10">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/collections/${category.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 pr-2">
                <h3 className="font-display text-xl group-hover:underline sm:text-2xl">{category.title}</h3>
                <p className="mt-1 text-xs text-muted sm:text-sm">{category.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
