import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  solid: "bg-ink text-paper hover:bg-ink/85",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink hover:bg-paper/85",
  "outline-light": "border border-paper text-paper hover:bg-paper hover:text-ink",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
};

// Shared with <button> elements so links and buttons look identical.
export function buttonStyles(variant: keyof typeof variants = "solid") {
  return `eyebrow inline-flex h-12 min-w-40 items-center justify-center px-8 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]}`;
}

export function ButtonLink({ variant = "solid", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${buttonStyles(variant)} ${className}`} {...props} />;
}

export function TextLink({ className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`eyebrow inline-block border-b border-current pb-1 transition-opacity hover:opacity-60 ${className}`}
      {...props}
    />
  );
}
