import type { Metadata } from "next";
import { ContentPage } from "@/components/content/content-page";
import { storePage, helpMenu } from "@/lib/content-pages";

export const metadata: Metadata = { title: storePage.title, description: storePage.intro };

export default function StorePage() {
  return (
    <ContentPage
      page={storePage}
      trail={[{ label: "Home", href: "/" }]}
      related={{ title: "Help", links: helpMenu }}
      currentHref="/store"
    />
  );
}
