import { useId, type InputHTMLAttributes } from "react";

// Labelled text input used by the account and checkout forms.
type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; hint?: string };

export function Field({ label, hint, ...input }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-[0.625rem]">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={hintId}
        className="mt-2 h-12 w-full border border-line bg-paper px-4 text-sm transition-colors placeholder:text-muted hover:border-muted focus:border-ink focus:outline-none"
        {...input}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
