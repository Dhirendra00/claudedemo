"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { removeLine, setLineQuantity, useCart, type CartLine } from "@/lib/cart";
import { formatPrice } from "@/lib/product";

// Matches the delivery promise in ServiceHighlights.
const FREE_DELIVERY_THRESHOLD = 5000;

export function CartView() {
  const { items, ready, count, subtotal, savings } = useCart();

  return (
    <>
      <header className="mt-8 flex flex-wrap items-end justify-between gap-4 lg:mt-12">
        <div>
          <p className="eyebrow text-muted">Shopping bag</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Your bag</h1>
        </div>
        {ready && count > 0 && (
          <p className="text-sm text-muted tabular-nums">
            {count} {count === 1 ? "item" : "items"}
          </p>
        )}
      </header>

      {!ready ? (
        // Storage hasn't been read yet (server render and hydration): hold the space without claiming "empty".
        <div aria-hidden="true" className="mt-10 h-64 border-t border-line lg:mt-14" />
      ) : items.length === 0 ? (
        <div className="mt-10 border-y border-line py-16 text-center lg:mt-14">
          <p className="text-sm text-muted">Your bag is empty.</p>
          <ButtonLink href="/new-arrivals" variant="outline" className="mt-6">
            Shop new arrivals
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-start lg:gap-16">
          <section aria-label="Items in your bag">
            <ul className="border-t border-line">
              {items.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </ul>
            <TextLink href="/" className="mt-8">
              Continue shopping
            </TextLink>
          </section>

          <OrderSummary subtotal={subtotal} savings={savings} />
        </div>
      )}
    </>
  );
}

function CartLineItem({ line }: { line: CartLine }) {
  const href = `/products/${line.slug}`;
  const lineTotal = line.price * line.quantity;
  const label = line.option ? `${line.name}, ${line.option.value}` : line.name;

  return (
    <li className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-line py-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-square overflow-hidden bg-stone">
        <Image src={line.image.src} alt="" fill sizes="(min-width: 640px) 128px, 96px" className="object-cover" />
      </Link>

      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="eyebrow text-[0.625rem] text-muted">{line.brand}</p>
          <h2 className="mt-1.5 text-sm leading-snug font-medium">
            <Link href={href} className="hover:underline">
              {line.name}
            </Link>
          </h2>
          {line.option && (
            <p className="mt-1 text-xs text-muted">
              {line.option.name}: {line.option.value}
            </p>
          )}
          <p className="mt-2 text-sm">
            {line.compareAtPrice ? (
              <>
                <span className="sr-only">Sale price: </span>
                <span className="font-medium whitespace-nowrap text-sale">{formatPrice(line.price)}</span>
                <span className="sr-only">, was </span>
                <s className="ml-2 whitespace-nowrap text-muted">{formatPrice(line.compareAtPrice)}</s>
              </>
            ) : (
              <>
                <span className="sr-only">Price: </span>
                {formatPrice(line.price)}
              </>
            )}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
          <QuantityStepper
            size="sm"
            value={line.quantity}
            max={line.maxQuantity}
            onChange={(quantity) => setLineQuantity(line.id, quantity)}
            label={label}
          />
          <div className="text-right">
            <p className="text-sm font-medium tabular-nums">
              <span className="sr-only">Line total: </span>
              {formatPrice(lineTotal)}
            </p>
            <button
              type="button"
              onClick={() => removeLine(line.id)}
              className="mt-1 text-xs text-muted underline underline-offset-4 hover:text-ink"
            >
              Remove<span className="sr-only"> {label}</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function OrderSummary({ subtotal, savings }: { subtotal: number; savings: number }) {
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <aside aria-labelledby="summary-heading" className="bg-stone p-6 sm:p-8 lg:sticky lg:top-6">
      <h2 id="summary-heading" className="eyebrow">
        Order summary
      </h2>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        {savings > 0 && (
          <div className="flex justify-between gap-4 text-sale">
            <dt>You save</dt>
            <dd className="tabular-nums">−{formatPrice(savings)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <dt>Delivery</dt>
          <dd className="text-right text-muted">Calculated at checkout</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-line pt-4 text-base font-medium">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
      </dl>
      <p className="mt-1 text-xs text-muted">Inclusive of VAT</p>

      <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        {remaining > 0
          ? `Add ${formatPrice(remaining)} more for free delivery across Kathmandu Valley.`
          : "Your order qualifies for free delivery across Kathmandu Valley."}
      </p>

      <ButtonLink href="/checkout" className="mt-6 w-full">
        Checkout
      </ButtonLink>
    </aside>
  );
}
