import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content/content-page";
import { guides, guideMenu, findPage } from "@/lib/content-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const page = findPage(guides, (await params).slug);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const page = findPage(guides, slug);
  if (!page) notFound();

  return (
    <ContentPage
      page={page}
      trail={[{ label: "Home", href: "/" }, { label: "Buying guides", href: "/guides" }]}
      related={{ title: "Buying guides", links: guideMenu }}
      currentHref={`/guides/${slug}`}
    />
  );
}
