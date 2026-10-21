import Link from "next/link";
import { footerNav } from "@/lib/site-nav";

const promises = [
  { title: "Genuine stock", description: "Sourced from brands and authorised distributors." },
  { title: "14-day exchanges", description: "Unused gear in original packaging." },
  { title: "Secure checkout", description: "Wallets, cards or cash on delivery." },
];

const paymentMethods = ["eSewa", "Khalti", "Fonepay", "Visa", "Mastercard", "Cash on delivery"];

const legalLinks = [
  { label: "Privacy policy", href: "/legal/privacy" },
  { label: "Terms of service", href: "/legal/terms" },
  { label: "Refund policy", href: "/legal/refunds" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {footerNav.map((column) => (
          <div key={column.title}>
            <h2 className="eyebrow text-paper/60">{column.title}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-paper/85 transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="eyebrow text-paper/60">Visit</h2>
          <address className="mt-5 space-y-1 text-sm text-paper/85 not-italic">
            <p>Racket Point Nepal</p>
            <p>Kathmandu, Nepal</p>
            <p className="pt-2">Sun–Fri · 10:00–19:00</p>
          </address>
          <Link href="/contact" className="eyebrow mt-6 inline-block border-b border-current pb-1">
            Get in touch
          </Link>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <ul className="shell grid gap-6 py-10 sm:grid-cols-3">
          {promises.map((promise) => (
            <li key={promise.title}>
              <h3 className="eyebrow">{promise.title}</h3>
              <p className="mt-2 text-sm text-paper/60">{promise.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-paper/15">
        <div className="shell flex flex-col gap-8 py-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-3xl tracking-[0.22em] uppercase sm:text-4xl">Racket Point</p>
            <ul aria-label="Payment methods" className="mt-6 flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <li key={method} className="border border-paper/25 px-2.5 py-1 text-[0.6875rem] text-paper/75">
                  {method}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 text-xs text-paper/60 lg:items-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>© {new Date().getFullYear()} Racket Point Nepal. Sample storefront content.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
