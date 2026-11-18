// Static storefront content (hero, brands, promos, FAQs). Products and categories live in the database.
// Photos are free-to-use images from Pexels (https://www.pexels.com/license/).
// Brand names are fictional.

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
