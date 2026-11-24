import type { Metadata } from "next";
import { headers } from "next/headers";
import { AccountOverview } from "@/components/account/account-overview";
import { AuthForms } from "@/components/account/auth-forms";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { auth, googleEnabled } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in or create your Racket Point Nepal account.",
  robots: { index: false, follow: true },
};

// Reading the session uses request headers, so this page renders on every request.
export default async function AccountPage({ searchParams }: PageProps<"/account">) {
  const [session, params] = await Promise.all([auth.api.getSession({ headers: await headers() }), searchParams]);
  const user = session?.user;
  const firstName = user?.name.split(" ")[0];

  return (
    <main className="flex-1">
      <div className="shell pt-4 pb-16 lg:pt-6 lg:pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Account" }]} />

        <header className="mt-8 max-w-2xl lg:mt-12">
          <p className="eyebrow text-muted">{user ? "Your account" : "Account"}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {user ? `Hello, ${firstName}` : "Sign in or join"}
          </h1>
          {!user && (
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              One account for checkout, order updates and your saved details.
            </p>
          )}
        </header>

        {user ? (
          <AccountOverview
            user={{ name: user.name, email: user.email, createdAt: new Date(user.createdAt).toISOString() }}
          />
        ) : (
          <AuthForms googleEnabled={googleEnabled} googleError={params.error === "google"} />
        )}
      </div>
    </main>
  );
}
