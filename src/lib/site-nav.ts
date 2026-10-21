// Storefront navigation shared by the header (mega menu, mobile drawer) and footer.

export type NavLink = { label: string; href: string };

export type NavCategory = NavLink & {
  groups?: { title: string; links: NavLink[] }[];
  highlight?: boolean;
};

export const mainNav: NavCategory[] = [
  {
    label: "Rackets",
    href: "/collections/rackets",
    groups: [
      {
        title: "By sport",
        links: [
          { label: "Badminton", href: "/collections/badminton-rackets" },
          { label: "Tennis", href: "/collections/tennis-rackets" },
          { label: "Padel", href: "/collections/padel-paddles" },
          { label: "Squash", href: "/collections/squash-rackets" },
        ],
      },
      {
        title: "By level",
        links: [
          { label: "Beginner", href: "/collections/rackets?level=beginner" },
          { label: "Intermediate", href: "/collections/rackets?level=intermediate" },
          { label: "Advanced", href: "/collections/rackets?level=advanced" },
          { label: "Junior", href: "/collections/junior-rackets" },
        ],
      },
      {
        title: "By brand",
        links: [
          { label: "Aerocourt", href: "/brands/aerocourt" },
          { label: "Courtline", href: "/brands/courtline" },
          { label: "Rallycraft", href: "/brands/rallycraft" },
          { label: "Summit Edge", href: "/brands/summit-edge" },
        ],
      },
    ],
  },
  {
    label: "Shoes",
    href: "/collections/shoes",
    groups: [
      {
        title: "By court",
        links: [
          { label: "Indoor court", href: "/collections/indoor-shoes" },
          { label: "All-court", href: "/collections/all-court-shoes" },
          { label: "Clay court", href: "/collections/clay-shoes" },
        ],
      },
      {
        title: "By fit",
        links: [
          { label: "Men", href: "/collections/shoes?fit=men" },
          { label: "Women", href: "/collections/shoes?fit=women" },
          { label: "Junior", href: "/collections/shoes?fit=junior" },
        ],
      },
    ],
  },
  {
    label: "Shuttles & Balls",
    href: "/collections/shuttles-balls",
    groups: [
      {
        title: "Shop",
        links: [
          { label: "Feather shuttles", href: "/collections/feather-shuttles" },
          { label: "Nylon shuttles", href: "/collections/nylon-shuttles" },
          { label: "Tennis balls", href: "/collections/tennis-balls" },
          { label: "Padel balls", href: "/collections/padel-balls" },
        ],
      },
    ],
  },
  {
    label: "Clothing",
    href: "/collections/clothing",
    groups: [
      {
        title: "Shop",
        links: [
          { label: "Shirts", href: "/collections/shirts" },
          { label: "Shorts & skirts", href: "/collections/shorts-skirts" },
          { label: "Jackets", href: "/collections/jackets" },
          { label: "Socks", href: "/collections/socks" },
        ],
      },
    ],
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    groups: [
      {
        title: "Shop",
        links: [
          { label: "Bags", href: "/collections/bags" },
          { label: "Strings", href: "/collections/strings" },
          { label: "Grips", href: "/collections/grips" },
          { label: "Nets & court gear", href: "/collections/court-gear" },
        ],
      },
    ],
  },
  { label: "Sale", href: "/collections/sale", highlight: true },
];

export const utilityNav: NavLink[] = [
  { label: "Stringing service", href: "/services/stringing" },
  { label: "Visit the store", href: "/store" },
  { label: "Help & returns", href: "/help" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Customer care",
    links: [
      { label: "Delivery", href: "/help/delivery" },
      { label: "Exchanges & returns", href: "/help/returns" },
      { label: "Warranty", href: "/help/warranty" },
      { label: "Track an order", href: "/account/orders" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Shop",
    links: mainNav.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Buying guides",
    links: [
      { label: "Choosing a badminton racket", href: "/guides/badminton-rackets" },
      { label: "String tension explained", href: "/guides/string-tension" },
      { label: "Padel paddle shapes", href: "/guides/padel-paddles" },
      { label: "Court shoe sizing", href: "/guides/shoe-sizing" },
    ],
  },
];
