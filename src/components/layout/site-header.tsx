"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BagIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/icons";
import { mainNav, utilityNav } from "@/lib/site-nav";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="bg-ink text-paper">
        <div className="shell flex h-9 items-center justify-center lg:justify-between">
          <p className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">
            Free delivery in Kathmandu Valley over Rs. 5,000
          </p>
          <ul className="hidden gap-6 lg:flex">
            {utilityNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="eyebrow text-paper/75 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-paper">
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-6 lg:h-20 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-ml-2 grid size-10 place-items-center lg:hidden"
          >
            <MenuIcon />
          </button>

          <Link href="/" aria-label="Racket Point Nepal — home" className="text-center leading-none lg:text-left">
            <span className="block font-display text-lg font-medium tracking-[0.16em] whitespace-nowrap uppercase sm:text-[1.625rem] sm:tracking-[0.22em]">
              Racket Point
            </span>
            <span className="eyebrow mt-1 block text-[0.5625rem] tracking-[0.45em] text-muted">
              Nepal
            </span>
          </Link>

          <form action="/search" role="search" className="hidden w-full max-w-xl justify-self-center lg:block">
            <label className="flex h-11 items-center gap-3 border border-line px-4 transition-colors focus-within:border-ink">
              <SearchIcon className="shrink-0 text-muted" />
              <span className="sr-only">Search products</span>
              <input
                type="search"
                name="q"
                placeholder="Search rackets, shoes, shuttles…"
                className="h-full w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
              />
            </label>
          </form>

          <div className="-mr-2 flex items-center justify-end">
            <Link href="/search" aria-label="Search" className="grid size-10 place-items-center lg:hidden">
              <SearchIcon />
            </Link>
            <Link
              href="/account"
              className="hidden h-10 items-center gap-2 px-2 sm:flex"
              aria-label="Account"
            >
              <UserIcon />
              <span className="eyebrow hidden lg:inline">Account</span>
            </Link>
            <Link href="/cart" aria-label="Bag, 0 items" className="flex h-10 items-center gap-2 px-2">
              <span className="relative">
                <BagIcon />
                <span className="absolute -top-1.5 -right-2 grid size-4 place-items-center rounded-full bg-ink text-[0.5625rem] font-medium text-paper">
                  0
                </span>
              </span>
              <span className="eyebrow ml-1 hidden lg:inline">Bag</span>
            </Link>
          </div>
        </div>

        <nav aria-label="Primary" className="relative hidden border-t border-line lg:block">
          <ul className="shell flex justify-center gap-10">
            {mainNav.map((item) => (
              <li key={item.href} className="group">
                <Link
                  href={item.href}
                  className={`eyebrow flex h-12 items-center gap-1 border-b-2 border-transparent transition-colors group-hover:border-current ${item.highlight ? "text-sale" : ""}`}
                >
                  {item.label}
                  {item.groups && <ChevronDownIcon width={14} height={14} />}
                </Link>
                {item.groups && (
                  <div className="invisible absolute inset-x-0 top-full border-y border-line bg-paper opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="shell flex gap-16 py-10">
                      {item.groups.map((group) => (
                        <div key={group.title} className="min-w-40">
                          <p className="eyebrow text-muted">{group.title}</p>
                          <ul className="mt-4 space-y-2.5 text-sm">
                            {group.links.map((link) => (
                              <li key={link.href}>
                                <Link href={link.href} className="hover:underline">
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link href={item.href} className="eyebrow ml-auto self-end border-b border-current pb-1">
                        Shop all {item.label.toLowerCase()}
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "visible" : "invisible"}`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-paper transition-transform duration-500 ease-premium ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="-mr-2 grid size-10 place-items-center"
            >
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="divide-y divide-line">
              {mainNav.map((item) =>
                item.groups ? (
                  <li key={item.href}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-2xl [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <ChevronDownIcon className="transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="space-y-6 pb-6">
                        {item.groups.map((group) => (
                          <div key={group.title}>
                            <p className="eyebrow text-muted">{group.title}</p>
                            <ul className="mt-3 space-y-2.5 text-sm">
                              {group.links.map((link) => (
                                <li key={link.href}>
                                  <Link href={link.href} onClick={() => setMenuOpen(false)}>
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="eyebrow inline-block border-b border-current pb-1"
                        >
                          Shop all {item.label.toLowerCase()}
                        </Link>
                      </div>
                    </details>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-4 font-display text-2xl ${item.highlight ? "text-sale" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            <ul className="mt-6 space-y-4 border-t border-line pt-8">
              {utilityNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="eyebrow text-muted hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-line px-4 py-5">
            <Link href="/account" onClick={() => setMenuOpen(false)} className="eyebrow flex items-center gap-3">
              <UserIcon /> Sign in / Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
