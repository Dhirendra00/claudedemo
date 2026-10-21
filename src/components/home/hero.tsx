"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { heroSlides } from "@/lib/sample-catalog";

// Swipeable full-bleed banner carousel. No autoplay: slides change only when the visitor asks.
export function Hero() {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    const list = listRef.current;
    if (!list) return;
    const target = (index + heroSlides.length) % heroSlides.length;
    list.scrollTo({ left: target * list.clientWidth, behavior: "smooth" });
  }

  function handleScroll() {
    const list = listRef.current;
    if (!list) return;
    setActive(Math.round(list.scrollLeft / list.clientWidth));
  }

  return (
    <section aria-roledescription="carousel" aria-label="Featured" className="relative bg-ink text-paper">
      <ul
        ref={listRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {heroSlides.map((slide, index) => (
          <li
            key={slide.title}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${heroSlides.length}`}
            className="relative h-[min(72svh,720px)] min-h-[460px] w-full shrink-0 snap-start"
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              preload={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="shell absolute inset-x-0 bottom-0 pb-16 lg:pb-20">
              <p className="eyebrow text-paper/80">{slide.eyebrow}</p>
              <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                {slide.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/85 sm:text-base">
                {slide.body}
              </p>
              <ButtonLink href={slide.cta.href} variant="light" className="mt-8">
                {slide.cta.label}
              </ButtonLink>
            </div>
          </li>
        ))}
      </ul>

      <div className="shell pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between pb-6">
        <div className="pointer-events-auto flex gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={active === index}
              className="group grid h-6 w-8 place-items-center"
            >
              <span
                className={`block h-0.5 w-full transition-colors ${active === index ? "bg-paper" : "bg-paper/35 group-hover:bg-paper/70"}`}
              />
            </button>
          ))}
        </div>
        <div className="pointer-events-auto hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous slide"
            className="grid size-11 place-items-center border border-paper/40 transition-colors hover:border-paper"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next slide"
            className="grid size-11 place-items-center border border-paper/40 transition-colors hover:border-paper"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
