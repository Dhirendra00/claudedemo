import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review the items in your Racket Point Nepal bag before checkout.",
  robots: { index: false, follow: true },
};

// The bag lives in the browser, so the page itself is static; CartView fills it in on the client.
export default function CartPage() {
  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Bag" }]} />
        <CartView />
      </div>
    </main>
  );
}
