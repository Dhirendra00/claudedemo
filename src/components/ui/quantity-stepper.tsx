type QuantityStepperProps = {
  value: number;
  max: number;
  onChange: (value: number) => void;
  /** Names the item for screen readers when several steppers share a page, e.g. in the bag. */
  label?: string;
  size?: "md" | "sm";
};

export function QuantityStepper({ value, max, onChange, label, size = "md" }: QuantityStepperProps) {
  const height = size === "sm" ? "h-10" : "h-12";
  const suffix = label ? ` of ${label}` : "";

  return (
    <div className={`flex ${height} w-fit items-center border border-line`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label={`Decrease quantity${suffix}`}
        className="grid h-full w-11 place-items-center disabled:text-line"
      >
        −
      </button>
      <span aria-live="polite" className="w-8 text-center text-sm tabular-nums">
        <span className="sr-only">Quantity </span>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase quantity${suffix}`}
        className="grid h-full w-11 place-items-center disabled:text-line"
      >
        +
      </button>
    </div>
  );
}
