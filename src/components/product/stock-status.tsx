import { stockState, type Product } from "@/lib/sample-catalog";

export function StockStatus({ product }: { product: Product }) {
  const state = stockState(product);
  const status = {
    in_stock: { label: "In stock", detail: "Ready to ship from Kathmandu", dot: "bg-court" },
    low_stock: { label: `Only ${product.stock} left`, detail: "Order soon", dot: "bg-sale" },
    out_of_stock: { label: "Out of stock", detail: "Most items are restocked within 2–3 weeks", dot: "bg-muted" },
  }[state];

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <span aria-hidden="true" className={`size-2 shrink-0 ${status.dot}`} />
      <span className={`font-medium ${state === "low_stock" ? "text-sale" : ""}`}>{status.label}</span>
      <span className="text-muted">· {status.detail}</span>
    </p>
  );
}
