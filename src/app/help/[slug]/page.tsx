import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content/content-page";
import { helpPages, helpMenu, findPage } from "@/lib/content-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return helpPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/help/[slug]">): Promise<Metadata> {
  const page = findPage(helpPages, (await params).slug);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function HelpTopicPage({ params }: PageProps<"/help/[slug]">) {
  const { slug } = await params;
  const page = findPage(helpPages, slug);
  if (!page) notFound();

  return (
    <ContentPage
      page={page}
      trail={[{ label: "Home", href: "/" }, { label: "Help", href: "/help" }]}
      related={{ title: "Help", links: helpMenu }}
      currentHref={`/help/${slug}`}
    />
  );
}
