// Delivery and payment rules shared by the bag and checkout. Pure data and helpers, safe on client and server.
// Promises here must match the copy in the header bar, ServiceHighlights and the delivery FAQ.

/** Orders at or above this subtotal (whole NPR) get free delivery inside Kathmandu Valley. */
export const FREE_DELIVERY_THRESHOLD = 5000;

export type DeliveryRegion = "valley" | "outside";

export const deliveryRegions: Record<
  DeliveryRegion,
  { label: string; detail: string; fee: number; freeOverThreshold: boolean }
> = {
  // TODO(store): placeholder fees. Replace with the real courier rates before launch.
  valley: { label: "Kathmandu Valley", detail: "1–2 working days", fee: 150, freeOverThreshold: true },
  outside: { label: "Outside the valley", detail: "3–5 working days by courier", fee: 350, freeOverThreshold: false },
};

export function deliveryFee(region: DeliveryRegion, subtotal: number) {
  const option = deliveryRegions[region];
  return option.freeOverThreshold && subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : option.fee;
}

export type PaymentMethod = "esewa" | "khalti" | "fonepay" | "card" | "cod";

export const paymentMethods: { id: PaymentMethod; label: string; detail: string; valleyOnly?: boolean }[] = [
  { id: "esewa", label: "eSewa", detail: "Pay from your eSewa wallet." },
  { id: "khalti", label: "Khalti", detail: "Pay from your Khalti wallet." },
  { id: "fonepay", label: "Fonepay QR", detail: "Scan with any mobile banking app." },
  { id: "card", label: "Visa or Mastercard", detail: "Debit or credit card." },
  { id: "cod", label: "Cash on delivery", detail: "Pay the rider in cash.", valleyOnly: true },
];

/** Nepali mobile numbers: 10 digits starting 97 or 98, optional +977 prefix. */
export const NEPAL_MOBILE_PATTERN = "(\\+977[\\- ]?)?9[78][0-9]{8}";
