// Loads the sample catalog into the database: `npm run db:seed`. Safe to re-run; rows are upserted by slug.
import { config } from "dotenv";
import { sql } from "drizzle-orm";

config({ path: ".env.local" });
config({ path: ".env" });

async function main() {
  // Imported after dotenv so `DATABASE_URL` is set when the client is created.
  const { db } = await import("@/db");
  const { categories, productStock, products } = await import("@/db/schema");
  const seed = await import("@/db/seed-data");

  // neon-http has no interactive transactions, so each stage is one atomic batch.
  const [first, ...rest] = seed.categories.map((category, index) => {
    const values = {
      slug: category.slug,
      title: category.title,
      description: category.description,
      imageUrl: category.image,
      imageAlt: category.imageAlt,
      sortOrder: index,
    };
    return db
      .insert(categories)
      .values(values)
      .onConflictDoUpdate({ target: categories.slug, set: values })
      .returning({ id: categories.id, slug: categories.slug });
  });
  const categoryIds = new Map((await db.batch([first, ...rest])).flat().map((row) => [row.slug, row.id]));

  const [firstProduct, ...restProducts] = seed.products.map((product, index) => {
    const categoryId = categoryIds.get(product.collection);
    if (!categoryId) throw new Error(`Unknown category "${product.collection}" for ${product.slug}`);
    const values = {
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      categoryId,
      productType: product.category,
      sport: product.sport,
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? null,
      badge: product.badge ?? null,
      images: product.images,
      description: product.description,
      highlights: product.highlights,
      specs: product.specs,
      option: product.option ?? null,
      sortOrder: index,
    };
    return db
      .insert(products)
      .values(values)
      .onConflictDoUpdate({ target: products.slug, set: values })
      .returning({ id: products.id, slug: products.slug });
  });
  const productRows = (await db.batch([firstProduct, ...restProducts])).flat();
  const productIds = new Map(productRows.map((row) => [row.slug, row.id]));

  await db
    .insert(productStock)
    .values(seed.products.map((product) => ({ productId: productIds.get(product.slug)!, quantity: product.stock })))
    .onConflictDoUpdate({ target: productStock.productId, set: { quantity: sql`excluded.quantity`, updatedAt: new Date() } });

  console.log(`Seeded ${categoryIds.size} categories, ${productIds.size} products and their stock.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
