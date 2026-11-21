import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";

// Fail fast in every environment. Without this, Better Auth falls back to a public default secret
// outside production, so any session cookie signed in dev could be forged.
const secret = process.env.BETTER_AUTH_SECRET;
if (!secret || secret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must be set to at least 32 characters (openssl rand -base64 32)");
}

export const auth = betterAuth({
  secret,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  // nextCookies must be the last plugin
  plugins: [nextCookies()],
});
