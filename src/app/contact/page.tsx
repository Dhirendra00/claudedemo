import type { Metadata } from "next";
import { ContentPage } from "@/components/content/content-page";
import { contactPage, helpMenu } from "@/lib/content-pages";

export const metadata: Metadata = { title: contactPage.title, description: contactPage.intro };

export default function ContactPage() {
  return (
    <ContentPage
      page={contactPage}
      trail={[{ label: "Home", href: "/" }]}
      related={{ title: "Help", links: helpMenu }}
      currentHref="/contact"
    />
  );
}
