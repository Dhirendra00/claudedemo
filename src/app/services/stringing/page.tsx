import type { Metadata } from "next";
import { ContentPage } from "@/components/content/content-page";
import { stringingPage, helpMenu } from "@/lib/content-pages";

export const metadata: Metadata = { title: stringingPage.title, description: stringingPage.intro };

export default function StringingPage() {
  return (
    <ContentPage
      page={stringingPage}
      trail={[{ label: "Home", href: "/" }]}
      related={{ title: "Help", links: helpMenu }}
      currentHref="/services/stringing"
    />
  );
}
