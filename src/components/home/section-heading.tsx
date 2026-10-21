import { TextLink } from "@/components/ui/button-link";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  link?: { label: string; href: string };
};

export function SectionHeading({ id, eyebrow, title, link }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 lg:mb-12">
      <div>
        <p className="eyebrow text-muted">{eyebrow}</p>
        <h2 id={id} className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>
      {link && (
        <TextLink href={link.href} className="shrink-0">
          {link.label}
        </TextLink>
      )}
    </div>
  );
}
