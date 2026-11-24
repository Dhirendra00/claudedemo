"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonStyles, ButtonLink } from "@/components/ui/button-link";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/lib/cart";

type AccountOverviewProps = {
  user: { name: string; email: string; createdAt: string };
};

export function AccountOverview({ user }: AccountOverviewProps) {
  const router = useRouter();
  const { count, ready } = useCart();
  const [pending, setPending] = useState(false);
  const memberSince = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
    new Date(user.createdAt),
  );

  async function signOut() {
    setPending(true);
    await authClient.signOut();
    router.refresh();
  }

  return (
    <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-start lg:gap-16">
      <div className="grid gap-10">
        <section aria-labelledby="details-heading" className="border-t border-line pt-6">
          <h2 id="details-heading" className="eyebrow">
            Your details
          </h2>
          <dl className="mt-6 grid gap-x-8 gap-y-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">Name</dt>
              <dd className="mt-1">{user.name}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-xs text-muted">Email</dt>
              <dd className="mt-1 break-words">{user.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Member since</dt>
              <dd className="mt-1">{memberSince}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="orders-heading" className="border-t border-line pt-6">
          <h2 id="orders-heading" className="eyebrow">
            Orders
          </h2>
          <div className="mt-6 border border-dashed border-line px-6 py-10 text-center">
            <p className="text-sm text-muted">You haven&rsquo;t placed any orders yet.</p>
            <ButtonLink href="/new-arrivals" variant="outline" className="mt-6">
              Shop new arrivals
            </ButtonLink>
          </div>
        </section>
      </div>

      <aside aria-label="Account shortcuts" className="bg-stone p-6 sm:p-8">
        <p className="eyebrow">Your bag</p>
        <p className="mt-3 text-sm text-muted">
          {!ready ? " " : count === 0 ? "Your bag is empty." : `${count} ${count === 1 ? "item" : "items"} waiting for checkout.`}
        </p>
        <Link href="/cart" className={`${buttonStyles("solid")} mt-6 w-full`}>
          View bag
        </Link>

        <div className="mt-8 border-t border-line pt-6">
          <p className="text-xs text-muted">Signed in as {user.email}</p>
          <button type="button" onClick={signOut} disabled={pending} className={`${buttonStyles("outline")} mt-4 w-full`}>
            {pending ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>
    </div>
  );
}
