// Seed data for the catalog tables (`npm run db:seed`). The storefront reads these from the database.
// Photos are free-to-use images from Pexels (https://www.pexels.com/license/).
// Brand and product names are fictional.

import type { Collection, Product } from "@/lib/product";
import { pexels } from "@/lib/sample-catalog";

export const categories: Collection[] = [
  {
    slug: "rackets",
    title: "Rackets",
    description: "Badminton, tennis, padel and squash",
    image: pexels(4966373),
    imageAlt: "White and red badminton racket held with a shuttlecock",
  },
  {
    slug: "shoes",
    title: "Court Shoes",
    description: "Grip for clay, hard and indoor courts",
    image: pexels(31054365),
    imageAlt: "Player's court shoes and racket on a clay court",
  },
  {
    slug: "shuttles-balls",
    title: "Shuttles & Balls",
    description: "Feather, nylon and pressurised",
    image: pexels(8496267),
    imageAlt: "Feather shuttlecock resting on a badminton racket",
  },
  {
    slug: "bags",
    title: "Bags",
    description: "Backpacks and thermal kit bags",
    image: pexels(16688911),
    imageAlt: "Two red badminton rackets and a shuttlecock on a backpack outdoors",
  },
  {
    slug: "clothing",
    title: "Clothing",
    description: "Shirts, shorts and skirts for match day",
    image: pexels(5740817),
    imageAlt: "Tennis player in a red outfit holding a racket on a clay court",
  },
  {
    slug: "padel",
    title: "Padel",
    description: "Paddles, balls and accessories",
    image: pexels(4536850),
    imageAlt: "Padel paddle leaning on a net beside bright yellow balls",
  },
];

const gripSizes = { name: "Grip size", values: ["G4", "G5"] };
const shoeSizes = { name: "Size (EU)", values: ["39", "40", "41", "42", "43", "44", "45"] };

export const products: Product[] = [
  {
    slug: "aero-strike-88-badminton-racket",
    name: "Aero Strike 88 Racket",
    brand: "Aerocourt",
    collection: "rackets",
    category: "Badminton racket",
    sport: "badminton",
    price: 18500,
    badge: "New",
    stock: 14,
    images: [
      { src: pexels(4966373), alt: "White and red badminton racket held with a shuttlecock" },
      { src: pexels(6307230), alt: "Two badminton rackets with feather shuttlecocks" },
      { src: pexels(8496267), alt: "Feather shuttlecock resting on a badminton racket" },
    ],
    description:
      "A head-heavy attacking frame for players who win points from the back court. The stiff shaft returns energy fast on smashes, while the slim aerodynamic frame keeps the racket quick enough for drives and blocks.",
    highlights: ["Head-heavy balance for steep smashes", "Stiff high-modulus graphite shaft", "Strung on request before dispatch"],
    specs: [
      { label: "Weight", value: "4U (80–84 g)" },
      { label: "Balance", value: "Head heavy, 300 mm" },
      { label: "Flex", value: "Stiff" },
      { label: "Frame", value: "High-modulus graphite" },
      { label: "Max tension", value: "28 lbs" },
    ],
    option: gripSizes,
  },
  {
    slug: "baseline-pro-100-tennis-racket",
    name: "Baseline Pro 100",
    brand: "Courtline",
    collection: "rackets",
    category: "Tennis racket",
    sport: "tennis",
    price: 32000,
    compareAtPrice: 36000,
    stock: 4,
    images: [
      { src: pexels(34015717), alt: "Close-up of tennis rackets and a ball on court" },
      { src: pexels(34015721), alt: "Tennis rackets and balls laid out on a hard court" },
      { src: pexels(34015718), alt: "Two tennis rackets crossed with yellow balls on a court" },
    ],
    description:
      "A 100 sq in all-court frame with an open string pattern for easy spin and a forgiving sweet spot. Light enough for club players moving up, solid enough to hold its own in long baseline rallies.",
    highlights: ["Open 16×19 pattern for spin", "Forgiving 100 sq in head", "Supplied unstrung or strung to your tension"],
    specs: [
      { label: "Head size", value: "100 sq in" },
      { label: "Weight", value: "300 g unstrung" },
      { label: "Balance", value: "320 mm" },
      { label: "String pattern", value: "16 × 19" },
      { label: "Length", value: "27 in" },
    ],
    option: { name: "Grip size", values: ["L2", "L3", "L4"] },
  },
  {
    slug: "carbon-edge-padel-paddle",
    name: "Carbon Edge Paddle",
    brand: "Rallycraft",
    collection: "padel",
    category: "Padel paddle",
    sport: "padel",
    price: 27500,
    badge: "New",
    stock: 9,
    images: [
      { src: pexels(32897040), alt: "Padel paddle and balls on a blue indoor court" },
      { src: pexels(4536850), alt: "Padel paddle leaning on a net beside bright yellow balls" },
      { src: pexels(33641987), alt: "Padel player holding a paddle and ball on an indoor court" },
    ],
    description:
      "A diamond-shaped carbon paddle built for power at the net. The textured face grips the ball for extra bite on bandejas and viboras, and the soft EVA core keeps vibration down.",
    highlights: ["Diamond shape for attacking players", "3K carbon face with grit texture", "Soft EVA core"],
    specs: [
      { label: "Shape", value: "Diamond" },
      { label: "Weight", value: "360–370 g" },
      { label: "Face", value: "3K carbon" },
      { label: "Core", value: "Soft EVA" },
      { label: "Thickness", value: "38 mm" },
    ],
  },
  {
    slug: "tournament-feather-shuttles",
    name: "Tournament Feather Shuttles, Tube of 12",
    brand: "Featherline",
    collection: "shuttles-balls",
    category: "Shuttlecocks",
    sport: "badminton",
    price: 4200,
    badge: "Bestseller",
    stock: 120,
    images: [
      { src: pexels(8496270), alt: "White feather shuttlecock near a badminton net" },
      { src: pexels(8496267), alt: "Feather shuttlecock resting on a badminton racket" },
    ],
    description:
      "Graded goose-feather shuttles with a cork base for true, stable flight. Chosen for club nights and local tournaments, and matched to Kathmandu's altitude so they fly the right distance.",
    highlights: ["Goose feather, natural cork base", "Speed-matched for altitude", "Tube of 12"],
    specs: [
      { label: "Feather", value: "Goose, grade A" },
      { label: "Base", value: "Natural cork" },
      { label: "Speed", value: "76 (altitude matched)" },
      { label: "Quantity", value: "12 shuttles" },
    ],
  },
  {
    slug: "swift-court-trainer",
    name: "Swift Court Trainer",
    brand: "Himal Pro",
    collection: "shoes",
    category: "Indoor court shoe",
    sport: "badminton",
    price: 14800,
    compareAtPrice: 16900,
    stock: 3,
    images: [
      { src: pexels(2529148), alt: "Pair of lightweight sport shoes on a white background" },
      { src: pexels(31054365), alt: "Player's court shoes and racket on a clay court" },
    ],
    description:
      "A low, light indoor court shoe with a gum rubber sole that grips wooden and synthetic floors. A wide forefoot and reinforced toe cap stand up to lunges and drag.",
    highlights: ["Non-marking gum rubber sole", "Reinforced toe for lunges", "Breathable mesh upper"],
    specs: [
      { label: "Surface", value: "Indoor court" },
      { label: "Sole", value: "Non-marking gum rubber" },
      { label: "Upper", value: "Engineered mesh" },
      { label: "Weight", value: "310 g (EU 42)" },
      { label: "Fit", value: "Regular, wide forefoot" },
    ],
    option: shoeSizes,
  },
  {
    slug: "rally-duo-tennis-set",
    name: "Rally Duo Set",
    brand: "Courtline",
    collection: "rackets",
    category: "Two tennis rackets + balls",
    sport: "tennis",
    price: 21000,
    stock: 0,
    images: [
      { src: pexels(34015718), alt: "Two tennis rackets crossed with yellow balls on a court" },
      { src: pexels(34015717), alt: "Close-up of tennis rackets and a ball on court" },
      { src: pexels(34015711), alt: "Two tennis rackets and balls resting on a sunlit court, in black and white" },
    ],
    description:
      "Two pre-strung aluminium rackets and a tube of three balls, everything two players need to start hitting. A good first set for families and new players.",
    highlights: ["Two pre-strung rackets", "Tube of 3 pressurised balls", "Carry cover included"],
    specs: [
      { label: "Rackets", value: "2 × aluminium, pre-strung" },
      { label: "Head size", value: "105 sq in" },
      { label: "Balls", value: "3 × pressurised" },
      { label: "Includes", value: "Carry cover" },
    ],
  },
  {
    slug: "club-classic-badminton-pair",
    name: "Club Classic Pair",
    brand: "Aerocourt",
    collection: "rackets",
    category: "Two badminton rackets + shuttles",
    sport: "badminton",
    price: 9500,
    compareAtPrice: 11200,
    stock: 22,
    images: [
      { src: pexels(6307230), alt: "Two badminton rackets with feather shuttlecocks" },
      { src: pexels(4966373), alt: "White and red badminton racket held with a shuttlecock" },
      { src: pexels(8496267), alt: "Feather shuttlecock resting on a badminton racket" },
    ],
    description:
      "Two even-balance graphite rackets with three feather shuttles. Easy to swing and forgiving on off-centre hits, so it suits weekly club sessions and players still building technique.",
    highlights: ["Two graphite rackets, pre-strung", "Even balance for all-round play", "Three feather shuttles"],
    specs: [
      { label: "Rackets", value: "2 × graphite, pre-strung" },
      { label: "Weight", value: "5U (75–79 g)" },
      { label: "Balance", value: "Even" },
      { label: "Includes", value: "3 feather shuttles, full covers" },
    ],
  },
  {
    slug: "weekend-badminton-kit",
    name: "Weekend Kit",
    brand: "Summit Edge",
    collection: "bags",
    category: "Two rackets, shuttle, carry bag",
    sport: "badminton",
    price: 6800,
    badge: "Bestseller",
    stock: 35,
    images: [
      { src: pexels(16688911), alt: "Two red badminton rackets and a shuttlecock on a backpack outdoors" },
      { src: pexels(6307230), alt: "Two badminton rackets with feather shuttlecocks" },
    ],
    description:
      "A grab-and-go kit for the park or the terrace: two light rackets, a durable nylon shuttle and a backpack that holds it all. Built for fun rallies rather than competition.",
    highlights: ["Two lightweight rackets", "Durable nylon shuttle", "Padded carry backpack"],
    specs: [
      { label: "Rackets", value: "2 × steel-shaft, pre-strung" },
      { label: "Shuttle", value: "Nylon, medium speed" },
      { label: "Bag", value: "Backpack with racket sleeve" },
    ],
  },
];
