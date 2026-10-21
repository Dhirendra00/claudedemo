const services = [
  {
    title: "Racket stringing",
    description: "Restrung to your tension, usually within 24 hours.",
  },
  {
    title: "Valley delivery",
    description: "Free across Kathmandu Valley on orders over Rs. 5,000.",
  },
  {
    title: "Easy exchanges",
    description: "Swap unused gear within 14 days of delivery.",
  },
  {
    title: "Expert fitting",
    description: "Advice on weight, balance and grip size in store.",
  },
];

export function ServiceHighlights() {
  return (
    <section aria-label="Services" className="border-y border-line">
      <ul className="shell grid grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <li
            key={service.title}
            className={`py-8 pr-4 sm:py-10 lg:border-line lg:px-8 lg:first:pl-0 ${index > 0 ? "lg:border-l" : ""}`}
          >
            <h3 className="eyebrow">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
