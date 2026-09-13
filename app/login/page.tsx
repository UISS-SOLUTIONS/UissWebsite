"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import UissLogo from "@/public/logoUISS.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/ui/layout";

export default function LoginPage() {
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
        setError(response.error === "CredentialsSignin" ? "Email or password is incorrect." : "We could not sign you in. Try again.");
        return;
      }
      window.location.assign("/admin");
    } catch {
      setError("We could not sign you in. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <PageShell className="grid min-h-dvh lg:grid-cols-2">
      <section className="relative hidden min-h-dvh overflow-hidden bg-ink text-canvas lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Image src="/welcomeBg.avif" alt="UISS students learning together" fill priority className="object-cover opacity-45" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
        <Image src={UissLogo} width={76} height={76} alt="UISS" className="relative z-10" />
        <div className="relative z-10 max-w-xl">
          <p className="uiss-eyebrow text-canvas/70">UISS administration</p>
          <p className="mt-4 font-display text-5xl font-semibold leading-none tracking-[-0.04em]">Maintain the work students rely on.</p>
        </div>
      </section>
      <main className="flex min-h-dvh items-center bg-surface px-5 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="uiss-pressable mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft aria-hidden="true" className="size-4" /> Back to UISS</Link>
          <div className="uiss-admin-panel p-6 sm:p-9">
            <Image src={UissLogo} width={60} height={60} alt="UISS" className="mb-8 lg:hidden" />
            <p className="uiss-eyebrow">Secure access</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em]">Welcome back.</h1>
            <p className="mt-3 text-muted">Sign in to manage UISS content and community information.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5" aria-describedby={error ? "login-error" : undefined}>
              <div className="space-y-2"><label htmlFor="email" className="text-sm font-semibold">Email address</label><Input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(error)} /></div>
              <div className="space-y-2"><label htmlFor="password" className="text-sm font-semibold">Password</label><Input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(error)} /></div>
              {error && <div id="login-error" role="alert" className="rounded-md border border-danger/25 bg-danger/5 px-4 py-3 text-sm font-medium text-danger">{error}</div>}
              <Button type="submit" size="lg" className="w-full" disabled={pending} aria-busy={pending}>{pending && <LoaderCircle aria-hidden="true" className="animate-spin" />}{pending ? "Signing in…" : "Sign in"}</Button>
            </form>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
