import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { promoTiles } from "@/lib/sample-catalog";

// Full-bleed row of image tiles, each with a scrim, eyebrow, heading and button.
export function PromoTiles() {
  return (
    <section aria-label="Highlights" className="grid gap-0.5 sm:gap-1 md:grid-cols-3">
      {promoTiles.map((tile) => (
        <article
          key={tile.title}
          className="relative flex aspect-[4/3] items-end overflow-hidden bg-ink text-paper md:aspect-[3/4] lg:aspect-[4/5]"
        >
          <Image
            src={tile.image}
            alt={tile.imageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-transparent" />
          <div className="relative p-6 sm:p-8 lg:p-10">
            <p className="eyebrow text-paper/80">{tile.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl leading-tight lg:text-4xl">{tile.title}</h2>
            <ButtonLink href={tile.cta.href} variant="outline-light" className="mt-6">
              {tile.cta.label}
            </ButtonLink>
          </div>
        </article>
      ))}
    </section>
  );
}
