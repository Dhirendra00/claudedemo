// Static editorial and help content: help topics, buying guides, legal pages and the store/service pages.
// Rendered by `ContentPage`. Sample copy for the demo storefront; review policies and contact details before launch.

import { pexels } from "@/lib/sample-catalog";
import type { NavLink } from "@/lib/site-nav";

export type ContentFact = { label: string; value: string };

export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  facts?: ContentFact[];
};

export type ContentPageData = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  image?: { src: string; alt: string };
  sections: ContentSection[];
  cta?: { label: string; href: string };
};

/** Placeholder contact details, kept in one place so they're easy to replace. */
export const storeDetails = {
  name: "Racket Point Nepal",
  city: "Kathmandu, Nepal",
  hours: "Sun–Fri · 10:00–19:00",
  closed: "Closed on Saturdays and public holidays",
  email: "hello@racketpoint.example",
};

export const helpPages: ContentPageData[] = [
  {
    slug: "delivery",
    eyebrow: "Help",
    title: "Delivery",
    intro: "We dispatch from our Kathmandu store every working day. Here's how long your order takes and what it costs.",
    sections: [
      {
        heading: "Delivery times and charges",
        facts: [
          { label: "Kathmandu Valley", value: "1–2 working days · free over Rs. 5,000" },
          { label: "Other districts", value: "3–5 working days by courier" },
          { label: "Store pickup", value: "Ready the same day, free" },
        ],
      },
      {
        heading: "Before your order ships",
        paragraphs: [
          "Orders placed before 14:00 on a working day leave the store the same day. Orders placed later, or on a Saturday or public holiday, go out the next working day.",
          "Rackets you've asked us to string are strung in store first, which can add up to one working day.",
        ],
      },
      {
        heading: "Cash on delivery",
        paragraphs: [
          "Cash on delivery is available inside Kathmandu Valley. Please have the exact amount ready, as couriers may not carry change.",
        ],
      },
      {
        heading: "If something arrives damaged",
        paragraphs: [
          "Check the parcel when it arrives. If anything is damaged or missing, contact us within 48 hours with a photo of the item and packaging and we'll put it right.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    eyebrow: "Help",
    title: "Exchanges & returns",
    intro: "If something doesn't suit you, you can exchange it within 14 days of delivery.",
    sections: [
      {
        heading: "What can be exchanged",
        list: [
          "Unused items in their original packaging, with tags attached",
          "Shoes tried on indoors only, with clean soles",
          "Unstrung rackets with their protective film intact",
        ],
      },
      {
        heading: "What can't be exchanged",
        list: [
          "Rackets that have been strung to order and used",
          "Opened tubes of shuttles or balls",
          "Socks and grips once opened, for hygiene reasons",
        ],
      },
      {
        heading: "How to exchange",
        paragraphs: [
          "Bring the item and your order number to the store, or contact us to arrange a courier pickup inside the valley. We'll swap it for another size or product, or issue store credit.",
          "Refunds to your original payment method are given only for faulty or wrongly supplied items. See our refund policy for details.",
        ],
      },
    ],
    cta: { label: "Read the refund policy", href: "/legal/refunds" },
  },
  {
    slug: "warranty",
    eyebrow: "Help",
    title: "Warranty",
    intro: "Everything we sell is genuine stock and carries the manufacturer's warranty.",
    sections: [
      {
        heading: "What's covered",
        paragraphs: [
          "Manufacturer warranties cover defects in materials and workmanship, such as a frame cracking under normal play or a shoe sole separating. Cover periods vary by brand and product, and are shown on the product page where they apply.",
        ],
      },
      {
        heading: "What isn't covered",
        list: [
          "Frame damage from clashes, hitting the floor or walls",
          "Broken strings and worn grips",
          "Damage from stringing above the frame's maximum tension",
          "Normal wear to shoe outsoles and clothing",
        ],
      },
      {
        heading: "Making a claim",
        paragraphs: [
          "Bring the item and proof of purchase to the store. We'll inspect it and, where needed, send it to the brand's authorised distributor. Most claims are settled within two to three weeks.",
        ],
      },
    ],
  },
];

export const guides: ContentPageData[] = [
  {
    slug: "badminton-rackets",
    eyebrow: "Buying guide",
    title: "Choosing a badminton racket",
    intro: "Weight, balance and flex decide how a racket feels. Match them to how you play, not to what the pros use.",
    image: { src: pexels(4966373, 2000), alt: "White and red badminton racket held with a shuttlecock" },
    sections: [
      {
        heading: "Weight",
        paragraphs: ["Badminton racket weight is graded in U. The higher the number, the lighter the frame."],
        facts: [
          { label: "3U (85–89 g)", value: "Stable and powerful; suits strong singles players" },
          { label: "4U (80–84 g)", value: "The all-round choice for most club players" },
          { label: "5U (75–79 g)", value: "Very quick to swing; good for doubles and juniors" },
        ],
      },
      {
        heading: "Balance",
        list: [
          "Head heavy: more power on smashes and clears, slower at the net",
          "Even balance: a mix of power and speed for all-round play",
          "Head light: fast for defence and net play, less weight behind the shuttle",
        ],
      },
      {
        heading: "Shaft flex",
        paragraphs: [
          "A flexible shaft bends and returns more energy for players with a slower swing, which makes it easier for beginners to hit the back line. A stiff shaft gives more control and accuracy, but only pays off with a fast, well-timed swing.",
        ],
      },
      {
        heading: "Grip size",
        paragraphs: [
          "G4 and G5 are the most common grip sizes. If you're unsure, choose the smaller one: building a grip up with an overgrip is easy, but making it smaller isn't.",
        ],
      },
    ],
    cta: { label: "Shop badminton rackets", href: "/collections/badminton-rackets" },
  },
  {
    slug: "string-tension",
    eyebrow: "Buying guide",
    title: "String tension explained",
    intro: "Higher tension isn't always better. The right tension depends on your swing speed and the feel you want.",
    image: { src: pexels(6307230, 2000), alt: "Two badminton rackets with feather shuttlecocks" },
    sections: [
      {
        heading: "Low tension vs high tension",
        list: [
          "Lower tension: a bigger sweet spot and more easy power, with less control",
          "Higher tension: more control and feel, but it needs a faster swing and is less forgiving",
        ],
      },
      {
        heading: "Where to start",
        facts: [
          { label: "Badminton beginner", value: "20–22 lbs" },
          { label: "Badminton club player", value: "23–26 lbs" },
          { label: "Badminton advanced", value: "27 lbs and up" },
          { label: "Tennis all-round", value: "50–55 lbs" },
        ],
      },
      {
        heading: "Check your frame",
        paragraphs: [
          "Every racket has a maximum recommended tension, usually printed on the shaft or frame. Stringing above it can crack the frame and isn't covered by warranty.",
        ],
      },
      {
        heading: "How often to restring",
        paragraphs: [
          "Strings lose tension even when they don't break. As a rule of thumb, restring as many times a year as you play each week.",
        ],
      },
    ],
    cta: { label: "Book stringing", href: "/services/stringing" },
  },
  {
    slug: "padel-paddles",
    eyebrow: "Buying guide",
    title: "Padel paddle shapes",
    intro: "A paddle's shape sets where its sweet spot sits, and that decides whether it rewards control or power.",
    image: { src: pexels(4536850, 2000), alt: "Padel paddle leaning on a net beside bright yellow balls" },
    sections: [
      {
        heading: "Round",
        paragraphs: [
          "The sweet spot sits low and central and the balance is close to the handle. Round paddles are the most forgiving shape and the best place to start.",
        ],
      },
      {
        heading: "Teardrop",
        paragraphs: [
          "A slightly higher sweet spot and an even balance. Teardrop paddles suit improving players who want some extra power without losing control.",
        ],
      },
      {
        heading: "Diamond",
        paragraphs: [
          "The sweet spot sits high and the balance is towards the head, so smashes and viboras get the most power. They're the least forgiving shape, and best for experienced attacking players.",
        ],
      },
      {
        heading: "Core and face",
        list: [
          "Soft EVA or foam cores: more comfort and ball output at lower speeds",
          "Hard EVA cores: more control and power for fast swings",
          "Carbon faces are stiffer and more responsive than fibreglass",
        ],
      },
    ],
    cta: { label: "Shop padel paddles", href: "/collections/padel-paddles" },
  },
  {
    slug: "shoe-sizing",
    eyebrow: "Buying guide",
    title: "Court shoe sizing",
    intro: "Court shoes should fit snugly at the heel with a thumb's width of room at the toe.",
    image: { src: pexels(2529148, 2000), alt: "Pair of lightweight sport shoes on a white background" },
    sections: [
      {
        heading: "Measuring your foot",
        list: [
          "Measure in the evening, when your feet are at their largest",
          "Stand on a sheet of paper and mark your heel and longest toe",
          "Measure both feet and size to the longer one",
          "Wear the socks you play in",
        ],
      },
      {
        heading: "EU sizing at a glance",
        facts: [
          { label: "24.5 cm", value: "EU 39" },
          { label: "25.5 cm", value: "EU 40" },
          { label: "26 cm", value: "EU 41" },
          { label: "26.5 cm", value: "EU 42" },
          { label: "27.5 cm", value: "EU 43" },
          { label: "28 cm", value: "EU 44" },
          { label: "29 cm", value: "EU 45" },
        ],
      },
      {
        heading: "Choosing the right sole",
        paragraphs: [
          "Indoor shoes use soft gum rubber for grip on wood and synthetic courts; wear them outdoors and they'll wear out quickly. All-court soles handle hard courts, and herringbone clay soles let you slide without losing grip.",
        ],
      },
    ],
    cta: { label: "Shop court shoes", href: "/collections/shoes" },
  },
];

export const legalPages: ContentPageData[] = [
  {
    slug: "privacy",
    eyebrow: "Legal",
    title: "Privacy policy",
    intro: "How we collect, use and protect your personal information. This is sample policy text for the demo storefront.",
    sections: [
      {
        heading: "What we collect",
        list: [
          "Your name, email address, phone number and delivery address when you order or create an account",
          "Your order history and the items in your bag",
          "Basic technical data such as your browser type, used to keep the site working",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use your details to process and deliver orders, provide customer service and, if you opt in, send you our newsletter. We never sell your personal information.",
        ],
      },
      {
        heading: "Payments",
        paragraphs: [
          "Card and wallet payments are handled by the payment provider you choose. We don't store your full card details.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can update your details from your account, unsubscribe from emails at any time, or ask us to delete your account by contacting us.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    eyebrow: "Legal",
    title: "Terms of service",
    intro: "The terms that apply when you shop with Racket Point Nepal. This is sample policy text for the demo storefront.",
    sections: [
      {
        heading: "Orders",
        paragraphs: [
          "Placing an order is an offer to buy. We confirm it once payment is received, or once a cash-on-delivery order is checked. We may cancel an order if an item is out of stock or mispriced, and we'll refund any payment in full.",
        ],
      },
      {
        heading: "Prices",
        paragraphs: ["Prices are in Nepali rupees and include VAT. Delivery charges are shown at checkout."],
      },
      {
        heading: "Stringing",
        paragraphs: [
          "We string rackets to the tension you choose, within the frame's recommended maximum. Rackets strung to order can't be exchanged once used.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "Nothing in these terms affects your statutory rights as a consumer in Nepal.",
        ],
      },
    ],
  },
  {
    slug: "refunds",
    eyebrow: "Legal",
    title: "Refund policy",
    intro: "When we refund your money and how long it takes. This is sample policy text for the demo storefront.",
    sections: [
      {
        heading: "When you'll get a refund",
        list: [
          "The item is faulty and can't be repaired or replaced",
          "We sent the wrong item",
          "We cancelled your order",
        ],
      },
      {
        heading: "Exchanges",
        paragraphs: [
          "For unused items that don't suit you, we offer an exchange or store credit within 14 days of delivery rather than a refund.",
        ],
      },
      {
        heading: "How refunds are paid",
        facts: [
          { label: "eSewa, Khalti, Fonepay", value: "Back to your wallet within 3 working days" },
          { label: "Visa, Mastercard", value: "Back to your card within 5–10 working days" },
          { label: "Cash on delivery", value: "By bank transfer or wallet, within 3 working days" },
        ],
      },
    ],
    cta: { label: "Exchanges & returns", href: "/help/returns" },
  },
];

export const stringingPage: ContentPageData = {
  slug: "stringing",
  eyebrow: "Service",
  title: "Racket stringing",
  intro: "Restrung in store on an electronic machine, usually within 24 hours. Badminton, tennis and squash.",
  image: { src: pexels(6307230, 2000), alt: "Two badminton rackets with feather shuttlecocks" },
  sections: [
    {
      heading: "Prices",
      paragraphs: ["Labour prices are per racket. Choose a string from our range, or bring your own."],
      facts: [
        { label: "Badminton", value: "Rs. 400 labour + string" },
        { label: "Tennis", value: "Rs. 600 labour + string" },
        { label: "Squash", value: "Rs. 500 labour + string" },
        { label: "Express (same day)", value: "Rs. 200 extra" },
      ],
    },
    {
      heading: "How it works",
      list: [
        "Drop your racket at the store and tell us the string and tension you want",
        "We check the frame and grommets before stringing",
        "Collect it the next working day, or the same day with express",
      ],
    },
    {
      heading: "New rackets",
      paragraphs: [
        "Buying a racket online? Pick a string and tension when you add it to your bag and we'll string it before it ships.",
      ],
    },
    {
      heading: "Not sure what tension?",
      paragraphs: ["Our string tension guide explains where to start, or just ask us in store."],
    },
  ],
  cta: { label: "Read the tension guide", href: "/guides/string-tension" },
};

export const storePage: ContentPageData = {
  slug: "store",
  eyebrow: "Visit",
  title: "Visit the store",
  intro: "Try rackets, get fitted for shoes and have your strings done, all in one visit to our Kathmandu store.",
  image: { src: pexels(34015721, 2000), alt: "Tennis rackets and balls laid out on a hard court" },
  sections: [
    {
      heading: "Opening hours",
      facts: [
        { label: "Sunday – Friday", value: "10:00–19:00" },
        { label: "Saturday", value: "Closed" },
        { label: "Public holidays", value: "Closed" },
      ],
    },
    {
      heading: "In store",
      list: [
        "Demo rackets to try before you buy",
        "Shoe fitting with the socks you play in",
        "Stringing while you shop, or next-day collection",
        "Free pickup for online orders",
      ],
    },
    {
      heading: "Location",
      paragraphs: [`${storeDetails.name}, ${storeDetails.city}.`],
    },
  ],
  cta: { label: "Book stringing", href: "/services/stringing" },
};

export const contactPage: ContentPageData = {
  slug: "contact",
  eyebrow: "Help",
  title: "Contact us",
  intro: "Questions about an order, sizing or stringing? Our team in Kathmandu replies within one working day.",
  sections: [
    {
      heading: "Get in touch",
      facts: [
        { label: "Email", value: storeDetails.email },
        { label: "Store", value: `${storeDetails.name}, ${storeDetails.city}` },
        { label: "Hours", value: storeDetails.hours },
      ],
    },
    {
      heading: "About an order",
      paragraphs: ["Include your order number so we can find it quickly. You can also see your orders in your account."],
    },
    {
      heading: "Clubs, academies and schools",
      paragraphs: [
        "We offer team pricing on rackets, shuttles and kit. Send us the quantities you need and we'll come back with a quote.",
      ],
    },
  ],
  cta: { label: "Visit the store", href: "/store" },
};

/** Side menu shared by the help, service, store and contact pages. */
export const helpMenu: NavLink[] = [
  { label: "Help centre", href: "/help" },
  ...helpPages.map((page) => ({ label: page.title, href: `/help/${page.slug}` })),
  { label: "Racket stringing", href: "/services/stringing" },
  { label: "Visit the store", href: "/store" },
  { label: "Contact us", href: "/contact" },
];

export const guideMenu: NavLink[] = guides.map((page) => ({ label: page.title, href: `/guides/${page.slug}` }));

export const legalMenu: NavLink[] = legalPages.map((page) => ({ label: page.title, href: `/legal/${page.slug}` }));

export function findPage(pages: ContentPageData[], slug: string) {
  return pages.find((page) => page.slug === slug);
}
