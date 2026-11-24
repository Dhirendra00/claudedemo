"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { buttonStyles } from "@/components/ui/button-link";
import { Field } from "@/components/ui/field";
import { GoogleIcon } from "@/components/ui/icons";
import { authClient } from "@/lib/auth-client";

const MIN_PASSWORD_LENGTH = 8; // Keep in step with emailAndPassword.minPasswordLength in src/lib/auth.ts.

// Better Auth error codes → messages a shopper can act on.
const errorMessages: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "That email and password don't match. Check them and try again.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "An account with this email already exists. Sign in instead.",
  PASSWORD_TOO_SHORT: `Use at least ${MIN_PASSWORD_LENGTH} characters for your password.`,
  INVALID_EMAIL: "Enter a valid email address.",
};

function toMessage(error: { code?: string; message?: string } | null | undefined) {
  return (error?.code && errorMessages[error.code]) || error?.message || "Something went wrong. Please try again.";
}

type AuthFormsProps = {
  googleEnabled: boolean;
  /** Set when Google sends the shopper back after a failed or cancelled sign-in. */
  googleError?: boolean;
};

export function AuthForms({ googleEnabled, googleError }: AuthFormsProps) {
  return (
    <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-0">
      <section aria-labelledby="sign-in-heading" className="lg:border-r lg:border-line lg:pr-16">
        <h2 id="sign-in-heading" className="eyebrow">
          Sign in
        </h2>
        <p className="mt-3 text-sm text-muted">Welcome back. Sign in to see your account.</p>
        {googleEnabled && (
          <>
            <GoogleButton label="Continue with Google" />
            {googleError && (
              <p role="alert" className="mt-3 text-sm text-sale">
                Google sign-in didn&rsquo;t finish. Try again, or use your email instead.
              </p>
            )}
            <Divider />
          </>
        )}
        <SignInForm />
      </section>

      <section
        aria-labelledby="create-heading"
        className="border-t border-line pt-12 lg:border-t-0 lg:pt-0 lg:pl-16"
      >
        <h2 id="create-heading" className="eyebrow">
          Create an account
        </h2>
        <p className="mt-3 text-sm text-muted">New to Racket Point Nepal? It takes less than a minute.</p>
        {googleEnabled && (
          <>
            <GoogleButton label="Sign up with Google" />
            <Divider />
          </>
        )}
        <CreateAccountForm />
      </section>
    </div>
  );
}

function SignInForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError(null);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (error) {
      setError(toMessage(error));
      setPending(false);
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <Field label="Email address" name="email" type="email" autoComplete="email" required />
      <Field label="Password" name="password" type="password" autoComplete="current-password" required />
      {error && (
        <p role="alert" className="text-sm text-sale">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${buttonStyles("solid")} w-full`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

function CreateAccountForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError(null);
    const { error } = await authClient.signUp.email({
      name: String(form.get("name")).trim(),
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (error) {
      setError(toMessage(error));
      setPending(false);
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <Field label="Full name" name="name" type="text" autoComplete="name" required />
      <Field label="Email address" name="email" type="email" autoComplete="email" required />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={MIN_PASSWORD_LENGTH}
        hint={`At least ${MIN_PASSWORD_LENGTH} characters.`}
        required
      />
      {error && (
        <p role="alert" className="text-sm text-sale">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${buttonStyles("outline")} w-full`}>
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

function GoogleButton({ label }: { label: string }) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    // Redirects the whole page to Google; Better Auth brings the shopper back to callbackURL.
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/account",
      errorCallbackURL: "/account?error=google",
    });
    if (error) setPending(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="mt-6 flex h-12 w-full items-center justify-center gap-3 border border-line text-sm font-medium transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
    >
      <GoogleIcon />
      {pending ? "Redirecting to Google…" : label}
    </button>
  );
}

function Divider() {
  return (
    <div className="mt-6 flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <span className="eyebrow text-[0.625rem] text-muted">or</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
