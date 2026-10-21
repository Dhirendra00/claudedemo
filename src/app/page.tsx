import { BrandTiles } from "@/components/home/brand-tiles";
import { CategoryGrid } from "@/components/home/category-grid";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { NewsletterSignup } from "@/components/home/newsletter-signup";
import { PromoTiles } from "@/components/home/promo-tiles";
import { SectionHeading } from "@/components/home/section-heading";
import { ServiceHighlights } from "@/components/home/service-highlights";
import { ProductRail } from "@/components/product/product-rail";
import { products } from "@/lib/sample-catalog";

export default function Home() {
  return (
    <main className="flex-1">
      <h1 className="sr-only">Racket Point Nepal — badminton, tennis, padel and squash equipment</h1>
      <Hero />
      <BrandTiles />
      <CategoryGrid />

      <section aria-labelledby="featured-heading" className="shell pb-16 lg:pb-24">
        <SectionHeading
          id="featured-heading"
          eyebrow="Bestsellers"
          title="Most wanted this season"
          link={{ label: "Shop all", href: "/collections/bestsellers" }}
        />
        <ProductRail products={products} label="Bestsellers" />
      </section>

      <PromoTiles />
      <Faq />
      <ServiceHighlights />
      <NewsletterSignup />
    </main>
  );
}
