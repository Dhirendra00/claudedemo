import type { Metadata } from "next";
import { headers } from "next/headers";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter your delivery details and choose how to pay.",
  robots: { index: false, follow: false },
};

// Reads the session to prefill a signed-in shopper's details, so this page renders on every request.
export default async function CheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const customer = session ? { name: session.user.name, email: session.user.email } : undefined;

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Bag", href: "/cart" }, { label: "Checkout" }]} />
        <header className="mt-8 lg:mt-12">
          <p className="eyebrow text-muted">Secure checkout</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Checkout</h1>
        </header>
        <CheckoutView customer={customer} />
      </div>
    </main>
  );
}
