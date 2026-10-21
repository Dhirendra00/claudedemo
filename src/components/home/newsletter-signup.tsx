"use client";

import { useState, type FormEvent } from "react";

// UI only — no subscription backend yet.
export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section aria-labelledby="newsletter-heading" className="bg-stone">
      <div className="shell py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-muted">Newsletter</p>
          <h2 id="newsletter-heading" className="mt-4 font-display text-4xl sm:text-5xl">
            Stay in the rally
          </h2>
          <p className="mt-4 text-sm text-muted">
            New arrivals, tournament dates and restock alerts. No more than twice a month.
          </p>
          {submitted ? (
            <p role="status" className="mt-10 text-sm">
              Thank you — you&rsquo;re on the list.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
              <label className="flex-1 text-left">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email address"
                  className="h-12 w-full border-b border-ink bg-transparent text-sm placeholder:text-muted focus:outline-none focus-visible:border-b-2"
                />
              </label>
              <button
                type="submit"
                className="eyebrow h-12 bg-ink px-8 text-paper transition-colors hover:bg-ink/85"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
