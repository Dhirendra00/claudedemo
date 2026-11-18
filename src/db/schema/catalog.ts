import { relations, sql } from "drizzle-orm";
import { check, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { ProductImage, ProductOption, ProductSpec } from "@/lib/product";

export const sportEnum = pgEnum("sport", ["badminton", "tennis", "padel", "squash"]);
export const productBadgeEnum = pgEnum("product_badge", ["New", "Bestseller"]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  imageAlt: text("image_alt").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    brand: text("brand").notNull(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    /** Short type label shown under the name, e.g. "Badminton racket". */
    productType: text("product_type").notNull(),
    sport: sportEnum("sport").notNull(),
    /** Whole Nepali rupees. */
    price: integer("price").notNull(),
    compareAtPrice: integer("compare_at_price"),
    badge: productBadgeEnum("badge"),
    images: jsonb("images").$type<ProductImage[]>().notNull(),
    description: text("description").notNull(),
    highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
    specs: jsonb("specs").$type<ProductSpec[]>().notNull().default([]),
    /** Display-only choice (grip or shoe size); stock is tracked per product, not per value. */
    option: jsonb("option").$type<ProductOption>(),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    check("products_price_positive", sql`${table.price} > 0`),
    check(
      "products_compare_at_above_price",
      sql`${table.compareAtPrice} is null or ${table.compareAtPrice} > ${table.price}`,
    ),
  ],
);

export const productStock = pgTable(
  "product_stock",
  {
    productId: uuid("product_id")
      .primaryKey()
      .references(() => products.id, { onDelete: "cascade" }),
    /** Units available. 0 means sold out. */
    quantity: integer("quantity").notNull().default(0),
    updatedAt: timestamps.updatedAt,
  },
  (table) => [check("product_stock_quantity_non_negative", sql`${table.quantity} >= 0`)],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  stock: one(productStock),
}));

export const productStockRelations = relations(productStock, ({ one }) => ({
  product: one(products, { fields: [productStock.productId], references: [products.id] }),
}));
