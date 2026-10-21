import { TextLink } from "@/components/ui/button-link";
import { PlusIcon } from "@/components/ui/icons";
import { faqs } from "@/lib/sample-catalog";

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="shell grid gap-10 py-16 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:py-24">
      <div>
        <p className="eyebrow text-muted">Help</p>
        <h2 id="faq-heading" className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
          Questions, answered
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          Can&rsquo;t find what you need? Our team in Kathmandu replies within one working day.
        </p>
        <TextLink href="/contact" className="mt-6">
          Contact us
        </TextLink>
      </div>
      <div className="border-t border-line">
        {faqs.map((faq) => (
          <details key={faq.question} name="faq" className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-sm font-medium sm:text-base [&::-webkit-details-marker]:hidden">
              {faq.question}
              <PlusIcon className="shrink-0 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
