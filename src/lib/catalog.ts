import "server-only";

import { asc, desc, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import type { Collection, Product } from "@/lib/product";

const withCategoryAndStock = { category: true, stock: true } as const;

type ProductRow = NonNullable<Awaited<ReturnType<typeof findProduct>>>;

function findProduct(slug: string) {
  return db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: withCategoryAndStock,
  });
}

// Maps a database row back into the shape the storefront components already use.
function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    collection: row.category.slug,
    category: row.productType,
    sport: row.sport,
    price: row.price,
    compareAtPrice: row.compareAtPrice ?? undefined,
    badge: row.badge ?? undefined,
    stock: row.stock?.quantity ?? 0,
    images: row.images,
    description: row.description,
    highlights: row.highlights,
    specs: row.specs,
    option: row.option ?? undefined,
  };
}

function toCollection(row: typeof categories.$inferSelect): Collection {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    image: row.imageUrl,
    imageAlt: row.imageAlt,
  };
}

export async function getCategories(): Promise<Collection[]> {
  const rows = await db.query.categories.findMany({ orderBy: asc(categories.sortOrder) });
  return rows.map(toCollection);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const rows = await db.query.products.findMany({
    with: withCategoryAndStock,
    orderBy: asc(products.sortOrder),
  });
  return rows.map(toProduct);
}

/** A category and its products in display order. Cached per request so `generateMetadata` and the page share one lookup. */
export const getCategoryWithProducts = cache(
  async (slug: string): Promise<{ category: Collection; products: Product[] } | undefined> => {
    const category = await db.query.categories.findFirst({ where: eq(categories.slug, slug) });
    if (!category) return undefined;
    const rows = await db.query.products.findMany({
      where: eq(products.categoryId, category.id),
      with: withCategoryAndStock,
      orderBy: asc(products.sortOrder),
    });
    return { category: toCollection(category), products: rows.map(toProduct) };
  },
);

/** Most recently added products first; `sort_order` breaks ties between rows created together (e.g. by the seed). */
export async function getNewArrivals(limit = 12): Promise<Product[]> {
  const rows = await db.query.products.findMany({
    with: withCategoryAndStock,
    orderBy: [desc(products.createdAt), asc(products.sortOrder)],
    limit,
  });
  return rows.map(toProduct);
}

export async function getProductSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}

/** The product with its category. Cached per request so `generateMetadata` and the page share one query. */
export const getProductBySlug = cache(
  async (slug: string): Promise<{ product: Product; category: Collection } | undefined> => {
    const row = await findProduct(slug);
    return row ? { product: toProduct(row), category: toCollection(row.category) } : undefined;
  },
);

/** Other products, same sport first. */
export async function getRelatedProducts(product: Product, limit = 8): Promise<Product[]> {
  const others = (await getFeaturedProducts()).filter((p) => p.slug !== product.slug);
  return [
    ...others.filter((p) => p.sport === product.sport),
    ...others.filter((p) => p.sport !== product.sport),
  ].slice(0, limit);
}
