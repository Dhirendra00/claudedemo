// Placeholder catalog for the storefront UI until products live in the database.
// Photos are free-to-use images from Pexels (https://www.pexels.com/license/).
// Brand and product names are fictional.

export type Sport = "badminton" | "tennis" | "padel" | "squash";

export type Collection = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  /** Slug of the parent entry in `categories`, used for breadcrumbs and links. */
  collection: string;
  /** Short product type shown under the name, e.g. "Badminton racket". */
  category: string;
  sport: Sport;
  price: number;
  compareAtPrice?: number;
  badge?: "New" | "Bestseller";
  /** Units available. 0 means sold out. */
  stock: number;
  /** First image is the card and listing image. */
  images: ProductImage[];
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  option?: { name: string; values: string[] };
};

export type StockState = "in_stock" | "low_stock" | "out_of_stock";

const LOW_STOCK_THRESHOLD = 5;

export type Brand = {
  slug: string;
  name: string;
};

export type HeroSlide = {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
};

export type PromoTile = {
  eyebrow: string;
  title: string;
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export function pexels(id: number, width = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export function formatPrice(amount: number) {
  return `Rs. ${new Intl.NumberFormat("en-IN").format(amount)}`;
}

export function discountPercent(product: Product) {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return null;
  return Math.round((1 - product.price / product.compareAtPrice) * 100);
}

export function stockState(product: Product): StockState {
  if (product.stock <= 0) return "out_of_stock";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

/** Other products, same sport first. */
export function relatedProducts(product: Product, limit = 8) {
  const others = products.filter((p) => p.slug !== product.slug);
  return [
    ...others.filter((p) => p.sport === product.sport),
    ...others.filter((p) => p.sport !== product.sport),
  ].slice(0, limit);
}

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Autumn–Winter 2026",
    title: "Built for the long rally",
    body: "Tournament-grade rackets, court footwear and apparel for the season ahead.",
    cta: { label: "Shop new in", href: "/collections/new" },
    image: pexels(34015711, 2400),
    imageAlt: "Two tennis rackets and balls resting on a sunlit court, in black and white",
  },
  {
    eyebrow: "The Court Edit",
    title: "Classic whites, cut for modern play",
    body: "Breathable layers and lightweight shoes that look as good off court as on it.",
    cta: { label: "Shop clothing", href: "/collections/clothing" },
    image: pexels(27064342, 2400),
    imageAlt: "Player in white sportswear sitting on a teal tennis court with racket and balls",
  },
  {
    eyebrow: "Padel",
    title: "Fast glass-court rallies start here",
    body: "Carbon paddles, pressurised balls and bags for the fastest-growing game in the valley.",
    cta: { label: "Shop padel", href: "/collections/padel" },
    image: pexels(32474981, 2400),
    imageAlt: "Empty indoor padel court with a blue surface under a glass roof",
  },
];

export const brands: Brand[] = [
  { slug: "aerocourt", name: "Aerocourt" },
  { slug: "featherline", name: "Featherline" },
  { slug: "courtline", name: "Courtline" },
  { slug: "himal-pro", name: "Himal Pro" },
  { slug: "rallycraft", name: "Rallycraft" },
  { slug: "summit-edge", name: "Summit Edge" },
];

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

export const promoTiles: PromoTile[] = [
  {
    eyebrow: "Service",
    title: "Restrung in 24 hours",
    cta: { label: "Book stringing", href: "/services/stringing" },
    image: pexels(6307230),
    imageAlt: "Two badminton rackets with feather shuttlecocks",
  },
  {
    eyebrow: "Padel",
    title: "Built for the glass court",
    cta: { label: "Shop padel", href: "/collections/padel" },
    image: pexels(33641987),
    imageAlt: "Padel player holding a paddle and ball on an indoor court",
  },
  {
    eyebrow: "Kathmandu",
    title: "Try before you play",
    cta: { label: "Visit the store", href: "/store" },
    image: pexels(34015721),
    imageAlt: "Tennis rackets and balls laid out on a hard court",
  },
];

export const faqs: Faq[] = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders inside Kathmandu Valley usually arrive in 1–2 working days, and delivery is free over Rs. 5,000. Other districts take 3–5 working days by courier.",
  },
  {
    question: "Can I get my racket strung before it ships?",
    answer:
      "Yes. Pick a string and tension when you add a racket to your bag, and we string it in store before dispatch. Restringing for rackets you already own is also available in store.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "You can pay with eSewa, Khalti, Fonepay QR, Visa or Mastercard. Cash on delivery is available inside Kathmandu Valley.",
  },
  {
    question: "Is all your stock genuine?",
    answer:
      "Every racket, shoe and shuttle we sell comes from the brand or its authorised distributor in Nepal, and carries the manufacturer's warranty.",
  },
  {
    question: "What if a shoe or racket doesn't suit me?",
    answer:
      "Unused items in their original packaging can be exchanged within 14 days of delivery. Strung rackets can't be exchanged once they have been used.",
  },
  {
    question: "Do you supply clubs and schools?",
    answer:
      "Yes. We offer team pricing on rackets, shuttles and kit for clubs, academies and schools. Get in touch with the quantities you need.",
  },
];
