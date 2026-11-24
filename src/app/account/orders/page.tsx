import type { Metadata } from "next";
import { headers } from "next/headers";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Your orders",
  description: "Track your Racket Point Nepal orders.",
  robots: { index: false, follow: true },
};

// Reading the session uses request headers, so this page renders on every request.
// Orders aren't stored yet, so a signed-in customer always sees the empty state.
export default async function OrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Orders" }]} />

        <header className="mt-8 max-w-2xl lg:mt-12">
          <p className="eyebrow text-muted">Your account</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Orders</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {user ? "Track deliveries and see what you've bought." : "Sign in to see and track your orders."}
          </p>
        </header>

        <div className="mt-10 border border-dashed border-line px-6 py-16 text-center lg:mt-14">
          {user ? (
            <>
              <p className="font-display text-2xl sm:text-3xl">No orders yet</p>
              <p className="mt-3 text-sm text-muted">When you place an order, it will appear here with its delivery status.</p>
              <ButtonLink href="/new-arrivals" variant="outline" className="mt-6">
                Shop new arrivals
              </ButtonLink>
            </>
          ) : (
            <>
              <p className="font-display text-2xl sm:text-3xl">Sign in to continue</p>
              <p className="mt-3 text-sm text-muted">Your order history is saved to your account.</p>
              <ButtonLink href="/account" className="mt-6">
                Sign in or join
              </ButtonLink>
            </>
          )}
        </div>

        <p className="mt-8 text-sm text-muted">
          Ordered as a guest or have a question about delivery?{" "}
          <TextLink href="/contact" className="ml-2">
            Contact us
          </TextLink>
        </p>
      </div>
    </main>
  );
}
