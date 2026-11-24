import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content/content-page";
import { legalPages, legalMenu, findPage } from "@/lib/content-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const page = findPage(legalPages, (await params).slug);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = findPage(legalPages, slug);
  if (!page) notFound();

  return (
    <ContentPage
      page={page}
      trail={[{ label: "Home", href: "/" }, { label: "Legal" }]}
      related={{ title: "Legal", links: legalMenu }}
      currentHref={`/legal/${slug}`}
    />
  );
}
