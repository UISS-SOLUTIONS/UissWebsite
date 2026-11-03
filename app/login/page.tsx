"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import UissLogo from "@/public/logoUISS.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/ui/layout";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      const response = await signIn("credentials", { email, password, redirect: false });

      if (response?.error) {
        setError(
          response.error === "CredentialsSignin"
            ? "Email or password is incorrect."
            : "We could not sign you in. Try again.",
        );

        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("We could not sign you in. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <PageShell className="grid min-h-dvh lg:grid-cols-2">
      <section className="hidden min-h-dvh flex-col justify-between gap-10 bg-panel p-12 shadow-border lg:flex">
        <Image src={UissLogo} alt="UISS" sizes="60px" className="h-auto w-15" />
        <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-surface">
          <Image
            src="/welcomeBg.avif"
            alt="UISS students learning together"
            fill
            priority
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="max-w-xl">
          <p className="uiss-eyebrow">UISS administration</p>
          <p className="uiss-section-title mt-4">Maintain the work students rely on.</p>
        </div>
      </section>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-dvh items-center bg-canvas px-6 py-12 sm:px-10"
      >
        <div className="mx-auto w-full max-w-md">
          <Link
            href="/"
            className="uiss-pressable mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="size-4" /> Back to UISS
          </Link>
          <div className="uiss-admin-panel p-6 sm:p-8">
            <Image src={UissLogo} alt="UISS" sizes="60px" className="mb-8 h-auto w-15 lg:hidden" />
            <p className="uiss-eyebrow">Secure access</p>
            <h1 className="uiss-page-title mt-4 font-display">Welcome back.</h1>
            <p className="mt-4 text-muted">
              Sign in to manage UISS content and community information.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              aria-describedby={error ? "login-error" : undefined}
            >
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(error)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-invalid={Boolean(error)}
                />
              </div>
              {error && (
                <div
                  id="login-error"
                  role="alert"
                  className="rounded-md bg-panel shadow-border px-4 py-3 text-sm font-medium text-danger"
                >
                  {error}
                </div>
              )}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={pending}
                aria-busy={pending}
              >
                {pending && <LoaderCircle aria-hidden="true" className="animate-spin" />}
                {pending ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
