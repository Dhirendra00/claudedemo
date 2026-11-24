// Curated collections: filtered views over the catalog (sub-collections, accessories, sale, bestsellers).
// They need no tables of their own. Each one is a rule applied to products already in the database,
// served by the same /collections/[slug] route as the database categories. Pure, so safe anywhere.

import type { Collection, Product } from "@/lib/product";
import { pexels } from "@/lib/sample-catalog";

export type CuratedCollection = Collection & {
  /** Slug of the database category this sits under, for breadcrumbs and sibling links. */
  parent?: string;
  matches: (product: Product) => boolean;
};

/** Case-insensitive match against the product's name and type label. */
function mentions(product: Product, pattern: RegExp) {
  return pattern.test(`${product.name} ${product.category}`);
}

export const curatedCollections: CuratedCollection[] = [
  // Rackets
  {
    slug: "badminton-rackets",
    parent: "rackets",
    title: "Badminton Rackets",
    description: "Attacking, all-round and control frames, strung to your tension",
    image: pexels(4966373),
    imageAlt: "White and red badminton racket held with a shuttlecock",
    matches: (p) => p.collection === "rackets" && p.sport === "badminton",
  },
  {
    slug: "tennis-rackets",
    parent: "rackets",
    title: "Tennis Rackets",
    description: "Frames for spin, control and easy power from the baseline",
    image: pexels(34015717),
    imageAlt: "Close-up of tennis rackets and a ball on court",
    matches: (p) => p.collection === "rackets" && p.sport === "tennis",
  },
  {
    slug: "padel-paddles",
    parent: "rackets",
    title: "Padel Paddles",
    description: "Round, teardrop and diamond shapes for every style at the net",
    image: pexels(32897040),
    imageAlt: "Padel paddle and balls on a blue indoor court",
    matches: (p) => p.sport === "padel" && mentions(p, /paddle/i),
  },
  {
    slug: "squash-rackets",
    parent: "rackets",
    title: "Squash Rackets",
    description: "Light, head-light frames for fast exchanges off the front wall",
    image: pexels(34015718),
    imageAlt: "Two rackets crossed with balls on a court",
    matches: (p) => p.collection === "rackets" && p.sport === "squash",
  },
  {
    slug: "junior-rackets",
    parent: "rackets",
    title: "Junior Rackets",
    description: "Shorter, lighter frames sized for young players",
    image: pexels(6307230),
    imageAlt: "Two badminton rackets with feather shuttlecocks",
    matches: (p) => p.collection === "rackets" && mentions(p, /junior|kids?\b/i),
  },

  // Shoes
  {
    slug: "indoor-shoes",
    parent: "shoes",
    title: "Indoor Court Shoes",
    description: "Gum-rubber grip and low profiles for wooden and synthetic courts",
    image: pexels(2529148),
    imageAlt: "Pair of lightweight sport shoes on a white background",
    matches: (p) => p.collection === "shoes" && mentions(p, /indoor/i),
  },
  {
    slug: "all-court-shoes",
    parent: "shoes",
    title: "All-Court Shoes",
    description: "Durable outsoles that handle hard courts and artificial grass",
    image: pexels(31054365),
    imageAlt: "Player's court shoes and racket on a clay court",
    matches: (p) => p.collection === "shoes" && mentions(p, /all[- ]court/i),
  },
  {
    slug: "clay-shoes",
    parent: "shoes",
    title: "Clay Court Shoes",
    description: "Herringbone soles that grip and slide on clay",
    image: pexels(31054365),
    imageAlt: "Player's court shoes and racket on a clay court",
    matches: (p) => p.collection === "shoes" && mentions(p, /clay/i),
  },

  // Shuttles & balls
  {
    slug: "feather-shuttles",
    parent: "shuttles-balls",
    title: "Feather Shuttles",
    description: "Tournament and club-grade goose and duck feather shuttles",
    image: pexels(8496267),
    imageAlt: "Feather shuttlecock resting on a badminton racket",
    matches: (p) => p.collection === "shuttles-balls" && p.sport === "badminton" && mentions(p, /feather/i),
  },
  {
    slug: "nylon-shuttles",
    parent: "shuttles-balls",
    title: "Nylon Shuttles",
    description: "Long-lasting shuttles for practice and outdoor play",
    image: pexels(6307230),
    imageAlt: "Two badminton rackets with feather shuttlecocks",
    matches: (p) => p.collection === "shuttles-balls" && p.sport === "badminton" && mentions(p, /nylon/i),
  },
  {
    slug: "tennis-balls",
    parent: "shuttles-balls",
    title: "Tennis Balls",
    description: "Pressurised match balls and long-life practice packs",
    image: pexels(34015721),
    imageAlt: "Tennis rackets and balls laid out on a hard court",
    matches: (p) => p.collection === "shuttles-balls" && p.sport === "tennis",
  },
  {
    slug: "padel-balls",
    parent: "shuttles-balls",
    title: "Padel Balls",
    description: "Lower-pressure balls built for glass-court rallies",
    image: pexels(4536850),
    imageAlt: "Padel paddle leaning on a net beside bright yellow balls",
    matches: (p) => p.sport === "padel" && mentions(p, /\bballs?\b/i),
  },

  // Clothing
  {
    slug: "shirts",
    parent: "clothing",
    title: "Shirts",
    description: "Breathable tees and polos for match day and training",
    image: pexels(5740817),
    imageAlt: "Tennis player in a red outfit holding a racket on a clay court",
    matches: (p) => p.collection === "clothing" && mentions(p, /shirt|tee|polo|top/i),
  },
  {
    slug: "shorts-skirts",
    parent: "clothing",
    title: "Shorts & Skirts",
    description: "Lightweight bottoms with room to lunge",
    image: pexels(27064342),
    imageAlt: "Player in white sportswear sitting on a teal tennis court with racket and balls",
    matches: (p) => p.collection === "clothing" && mentions(p, /shorts?|skirts?|skort/i),
  },
  {
    slug: "jackets",
    parent: "clothing",
    title: "Jackets",
    description: "Warm-up layers for cold mornings in the valley",
    image: pexels(5740817),
    imageAlt: "Tennis player in a red outfit holding a racket on a clay court",
    matches: (p) => p.collection === "clothing" && mentions(p, /jacket|hoodie|track top/i),
  },
  {
    slug: "socks",
    parent: "clothing",
    title: "Socks",
    description: "Cushioned court socks that keep blisters away",
    image: pexels(2529148),
    imageAlt: "Pair of lightweight sport shoes on a white background",
    matches: (p) => p.collection === "clothing" && mentions(p, /socks?/i),
  },

  // Accessories: bags plus the small gear that has no category of its own yet.
  {
    slug: "accessories",
    title: "Accessories",
    description: "Bags, strings, grips and court gear",
    image: pexels(16688911),
    imageAlt: "Two red badminton rackets and a shuttlecock on a backpack outdoors",
    matches: (p) => p.collection === "bags" || mentions(p, /\bstrings?\b|grip|\bnet\b|court gear/i),
  },
  {
    slug: "strings",
    parent: "accessories",
    title: "Strings",
    description: "Reels and sets for badminton, tennis and squash",
    image: pexels(6307230),
    imageAlt: "Two badminton rackets with feather shuttlecocks",
    matches: (p) => mentions(p, /\bstrings?\b/i) && !mentions(p, /racket|paddle/i),
  },
  {
    slug: "grips",
    parent: "accessories",
    title: "Grips",
    description: "Replacement grips and overgrips for a dry, sure hold",
    image: pexels(4966373),
    imageAlt: "White and red badminton racket held with a shuttlecock",
    matches: (p) => mentions(p, /grip/i) && !mentions(p, /racket|paddle/i),
  },
  {
    slug: "court-gear",
    parent: "accessories",
    title: "Nets & Court Gear",
    description: "Nets, posts and training kit for clubs and home courts",
    image: pexels(32474981),
    imageAlt: "Empty indoor padel court with a blue surface under a glass roof",
    matches: (p) => mentions(p, /\bnet\b|court gear|marker|cone/i),
  },

  // Cross-catalog edits
  {
    slug: "sale",
    title: "Sale",
    description: "Reduced rackets, shoes and kit while stock lasts",
    image: pexels(34015711),
    imageAlt: "Two tennis rackets and balls resting on a sunlit court, in black and white",
    matches: (p) => p.compareAtPrice !== undefined && p.compareAtPrice > p.price,
  },
  {
    slug: "bestsellers",
    title: "Bestsellers",
    description: "The gear players in the valley keep coming back for",
    image: pexels(27064342),
    imageAlt: "Player in white sportswear sitting on a teal tennis court with racket and balls",
    matches: (p) => p.badge === "Bestseller",
  },
];

export function findCuratedCollection(slug: string) {
  return curatedCollections.find((collection) => collection.slug === slug);
}

/** Curated collections that sit under a given category or curated parent, in display order. */
export function childCollections(parent: string) {
  return curatedCollections.filter((collection) => collection.parent === parent);
}

/** The display fields only, without the matching rule (functions can't be passed to client components). */
export function asCollection({ slug, title, description, image, imageAlt }: CuratedCollection): Collection {
  return { slug, title, description, image, imageAlt };
}
