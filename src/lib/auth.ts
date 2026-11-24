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

// Google sign-in turns on only when both credentials are set, so the site still runs without them.
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const google =
  googleClientId && googleClientSecret ? { clientId: googleClientId, clientSecret: googleClientSecret } : undefined;
/** Lets the account page hide the Google button when it can't work. */
export const googleEnabled = Boolean(google);
if (!google) {
  console.warn("Google sign-in is off: set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable it.");
}

export const auth = betterAuth({
  secret,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: google ? { google } : {},
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  // nextCookies must be the last plugin
  plugins: [nextCookies()],
});
