"use client";

import { useState } from "react";
import { buttonStyles } from "@/components/ui/button-link";
import type { Product } from "@/lib/sample-catalog";

const MAX_PER_ORDER = 10;

type ProductPurchaseProps = Pick<Product, "name" | "stock" | "option">;

// UI only — there is no cart backend yet, so adding just confirms on screen.
export function ProductPurchase({ name, stock, option }: ProductPurchaseProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const soldOut = stock <= 0;
  const maxQuantity = Math.min(stock, MAX_PER_ORDER);

  function addToBag() {
    if (option && !selected) {
      // "Size (EU)" → "size": drop the unit note in brackets.
      const label = option.name.replace(/\s*\(.*\)/, "").toLowerCase();
      setMessage({ text: `Choose your ${label} first.`, error: true });
      return;
    }
    const variant = selected ? ` (${selected})` : "";
    setMessage({ text: `Added ${quantity} × ${name}${variant} to your bag.` });
  }

  if (soldOut) {
    return (
      <div className="space-y-3">
        <button type="button" disabled className={`${buttonStyles("solid")} w-full`}>
          Sold out
        </button>
        <button
          type="button"
          onClick={() => setMessage({ text: "We'll email you when it's back in stock." })}
          className={`${buttonStyles("outline")} w-full`}
        >
          Email me when it&rsquo;s back
        </button>
        {message && (
          <p role="status" className="text-sm">
            {message.text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {option && (
        <fieldset>
          <legend className="eyebrow flex w-full justify-between">
            <span>{option.name}</span>
            {selected && <span className="text-muted normal-case tracking-normal">{selected}</span>}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {option.values.map((value) => (
              <label key={value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="option"
                  value={value}
                  checked={selected === value}
                  onChange={() => {
                    setSelected(value);
                    setMessage(null);
                  }}
                  className="peer sr-only"
                />
                <span className="grid h-11 min-w-12 place-items-center border border-line px-3 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink">
                  {value}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex gap-3">
        <div className="flex h-12 items-center border border-line">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="grid h-full w-11 place-items-center disabled:text-line"
          >
            −
          </button>
          <span aria-live="polite" className="w-8 text-center text-sm tabular-nums">
            <span className="sr-only">Quantity </span>
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            disabled={quantity >= maxQuantity}
            aria-label="Increase quantity"
            className="grid h-full w-11 place-items-center disabled:text-line"
          >
            +
          </button>
        </div>
        <button type="button" onClick={addToBag} className={`${buttonStyles("solid")} flex-1`}>
          Add to bag
        </button>
      </div>

      {message && (
        <p role={message.error ? "alert" : "status"} className={`text-sm ${message.error ? "text-sale" : ""}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
