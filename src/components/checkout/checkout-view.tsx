"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { buttonStyles, ButtonLink } from "@/components/ui/button-link";
import { Field } from "@/components/ui/field";
import { useCart } from "@/lib/cart";
import {
  deliveryFee,
  deliveryRegions,
  FREE_DELIVERY_THRESHOLD,
  NEPAL_MOBILE_PATTERN,
  paymentMethods,
  type DeliveryRegion,
  type PaymentMethod,
} from "@/lib/checkout";
import { formatPrice } from "@/lib/product";

type CheckoutViewProps = {
  /** Signed-in shopper, used to prefill contact and delivery details. */
  customer?: { name: string; email: string };
};

export function CheckoutView({ customer }: CheckoutViewProps) {
  const { items, ready, subtotal, savings } = useCart();
  const [region, setRegion] = useState<DeliveryRegion>("valley");
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const fee = deliveryFee(region, subtotal);
  const total = subtotal + fee;

  function chooseRegion(next: DeliveryRegion) {
    setRegion(next);
    // Cash on delivery only works inside the valley.
    if (next === "outside" && payment === "cod") setPayment(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    if (!payment) {
      setError("Choose how you'd like to pay.");
      return;
    }
    setError(null);
    // No order backend yet: nothing is saved or charged, and the bag stays as it is.
    setSubmitted(true);
  }

  if (!ready) {
    // Storage hasn't been read yet (server render and hydration): hold the space without claiming "empty".
    return <div aria-hidden="true" className="mt-10 h-96 border-t border-line lg:mt-14" />;
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 border-y border-line py-16 text-center lg:mt-14">
        <p className="text-sm text-muted">Your bag is empty, so there&rsquo;s nothing to check out.</p>
        <ButtonLink href="/new-arrivals" variant="outline" className="mt-6">
          Shop new arrivals
        </ButtonLink>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-16"
    >
      <div className="grid gap-12">
        <Step title="Contact" aside={!customer && <SignInHint />}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={customer?.email}
              hint="For your order confirmation."
              required
            />
            <Field
              label="Mobile number"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern={NEPAL_MOBILE_PATTERN}
              title="A 10-digit Nepali mobile number, e.g. 98XXXXXXXX"
              placeholder="98XXXXXXXX"
              hint="The rider calls this number on delivery."
              required
            />
          </div>
        </Step>

        <Step title="Delivery">
          <fieldset>
            <legend className="eyebrow text-[0.625rem]">Deliver to</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(Object.keys(deliveryRegions) as DeliveryRegion[]).map((id) => {
                const option = deliveryRegions[id];
                const optionFee = deliveryFee(id, subtotal);
                return (
                  <ChoiceCard
                    key={id}
                    name="region"
                    value={id}
                    checked={region === id}
                    onChange={() => chooseRegion(id)}
                    title={option.label}
                    detail={option.detail}
                    meta={optionFee === 0 ? "Free" : formatPrice(optionFee)}
                  />
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Full name" name="name" autoComplete="name" defaultValue={customer?.name} required />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Street address"
                name="address"
                autoComplete="street-address"
                placeholder="House number, street or tole"
                required
              />
            </div>
            <Field label="City or municipality" name="city" autoComplete="address-level2" required />
            <Field label="District" name="district" autoComplete="address-level1" required />
            <div className="sm:col-span-2">
              <Field
                label="Landmark (optional)"
                name="landmark"
                placeholder="Near a school, temple or shop"
                hint="Helps the rider find you."
              />
            </div>
          </div>
        </Step>

        <Step title="Payment">
          <fieldset aria-describedby={error ? "payment-error" : undefined}>
            <legend className="sr-only">Payment method</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((method) => {
                const unavailable = method.valleyOnly && region !== "valley";
                return (
                  <ChoiceCard
                    key={method.id}
                    name="payment"
                    value={method.id}
                    checked={payment === method.id}
                    disabled={unavailable}
                    onChange={() => {
                      setPayment(method.id);
                      setError(null);
                    }}
                    title={method.label}
                    detail={unavailable ? "Only available inside Kathmandu Valley." : method.detail}
                  />
                );
              })}
            </div>
          </fieldset>
          {error && (
            <p id="payment-error" role="alert" className="mt-3 text-sm text-sale">
              {error}
            </p>
          )}
        </Step>
      </div>

      <OrderSummary
        subtotal={subtotal}
        savings={savings}
        fee={fee}
        total={total}
        region={region}
        submitted={submitted}
      />
    </form>
  );
}

function Step({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  const id = `step-${title.toLowerCase()}`;
  return (
    <section aria-labelledby={id} className="border-t border-line pt-6">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id={id} className="eyebrow">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function SignInHint() {
  return (
    <p className="text-xs text-muted">
      Have an account?{" "}
      <Link href="/account" className="text-ink underline underline-offset-4 hover:opacity-60">
        Sign in
      </Link>
    </p>
  );
}

type ChoiceCardProps = {
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  title: string;
  detail: string;
  meta?: string;
};

// Radio styled as a bordered tile; the selected tile gets an ink border, matching the size picker.
function ChoiceCard({ name, value, checked, disabled, onChange, title, detail, meta }: ChoiceCardProps) {
  return (
    <label className={`relative block ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="flex h-full items-start gap-3 border border-line p-4 transition-colors peer-checked:border-ink peer-checked:shadow-[inset_0_0_0_1px_var(--color-ink)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink peer-disabled:opacity-50 hover:border-muted peer-checked:hover:border-ink">
        <span
          aria-hidden="true"
          className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border ${checked ? "border-ink" : "border-muted"}`}
        >
          {checked && <span className="size-2 rounded-full bg-ink" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex justify-between gap-3 text-sm font-medium">
            {title}
            {meta && <span className="shrink-0 tabular-nums">{meta}</span>}
          </span>
          <span className="mt-1 block text-xs text-muted">{detail}</span>
        </span>
      </span>
    </label>
  );
}

type OrderSummaryProps = {
  subtotal: number;
  savings: number;
  fee: number;
  total: number;
  region: DeliveryRegion;
  submitted: boolean;
};

function OrderSummary({ subtotal, savings, fee, total, region, submitted }: OrderSummaryProps) {
  const { items, count } = useCart();
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <aside aria-labelledby="summary-heading" className="bg-stone p-6 sm:p-8 lg:sticky lg:top-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="summary-heading" className="eyebrow">
          Order summary
        </h2>
        <Link href="/cart" className="text-xs text-muted underline underline-offset-4 hover:text-ink">
          Edit bag
        </Link>
      </div>

      <ul className="mt-6 space-y-4 border-b border-line pb-6" aria-label={`${count} items`}>
        {items.map((line) => (
          <li key={line.id} className="grid grid-cols-[4rem_minmax(0,1fr)_auto] items-start gap-4">
            <div className="relative aspect-square overflow-hidden bg-paper">
              <Image src={line.image.src} alt="" fill sizes="64px" className="object-cover" />
              <span className="absolute top-0 right-0 grid min-w-5 place-items-center bg-ink px-1 text-[0.625rem] font-medium text-paper tabular-nums">
                <span className="sr-only">Quantity </span>
                {line.quantity}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm leading-snug">{line.name}</p>
              {line.option && (
                <p className="mt-0.5 text-xs text-muted">
                  {line.option.name}: {line.option.value}
                </p>
              )}
            </div>
            <p className="text-sm tabular-nums">{formatPrice(line.price * line.quantity)}</p>
          </li>
        ))}
      </ul>

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
          <dt>Delivery · {deliveryRegions[region].label}</dt>
          <dd className="tabular-nums">{fee === 0 ? "Free" : formatPrice(fee)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-line pt-4 text-base font-medium">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
      <p className="mt-1 text-xs text-muted">Inclusive of VAT</p>

      {region === "valley" && remaining > 0 && (
        <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
          Add {formatPrice(remaining)} more for free delivery across Kathmandu Valley.
        </p>
      )}

      <button type="submit" className={`${buttonStyles("solid")} mt-6 w-full`}>
        Place order · {formatPrice(total)}
      </button>

      {submitted && (
        <p role="status" className="mt-4 border border-ink bg-paper p-4 text-sm leading-relaxed">
          Your details look good, but online ordering isn&rsquo;t switched on yet, so this order hasn&rsquo;t been
          placed and nothing has been charged. Your bag is saved.
        </p>
      )}

      <p className="mt-6 text-xs leading-relaxed text-muted">
        Unused items in their original packaging can be exchanged within 14 days of delivery.
      </p>
    </aside>
  );
}
