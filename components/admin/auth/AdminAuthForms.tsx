"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, User } from "lucide-react";

function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f0eaf7] to-[#e6f4f8] px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-[#320056]/10 lg:grid-cols-2">
        {/* Brand Panel */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-[#320056] p-8 text-white sm:p-10">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#005768]/30" />

          <div className="relative">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <ShieldCheck size={28} />
            </div>
            <h1 className="mt-8 text-3xl font-black tracking-tight sm:text-4xl">
              Admin Console
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
              Secure access portal for the College of Nursing Science,
              Ekinrin-Adde. Authorised personnel only.
            </p>
          </div>

          <div className="relative mt-10 space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck size={15} />
              </div>
              <p className="text-xs leading-5 text-white/70">
                All sessions are encrypted and automatically expire after 7 days
                of inactivity.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <LockKeyhole size={15} />
              </div>
              <p className="text-xs leading-5 text-white/70">
                Contact your Super Admin if you&apos;ve lost access to your
                account.
              </p>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <h2 className="text-2xl font-black text-[#320056]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}

/* ── Login Form ── */
export function LoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = (await res.json()) as { error?: string };
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Login failed. Please check your credentials.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <AuthShell
      title="Sign in to Admin"
      subtitle="Enter your username or email address and password to access the admin panel."
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#320056]">
            Username or Email
          </label>
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your username or email"
              autoComplete="username"
              className="w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#320056]/30 focus:bg-white focus:ring-2 focus:ring-[#320056]/15"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#320056]">
            Password
          </label>
          <div className="relative">
            <LockKeyhole
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-[#320056]/30 focus:bg-white focus:ring-2 focus:ring-[#320056]/15"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/admin/forgot-password"
            className="text-sm font-bold text-[#005768] hover:text-[#320056] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
            <span className="mt-0.5 shrink-0">⚠</span>
            <span className="font-medium">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#320056] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#320056]/20 transition hover:bg-[#4b0082] active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Signing in…
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </AuthShell>
  );
}

/* ── Forgot Password Form ── */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [devLink, setDevLink] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setDevLink("");

    const res = await fetch("/api/admin/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = (await res.json()) as {
      message?: string;
      error?: string;
      devResetLink?: string;
    };
    setLoading(false);
    setStatus(data.message ?? data.error ?? "Request completed.");
    if (data.devResetLink) setDevLink(data.devResetLink);
  }

  return (
    <AuthShell
      title="Forgot Password"
      subtitle="Enter your admin email address and we'll send you a secure reset link."
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#320056]">
            Admin Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@ekinrin-ng.com"
            className="w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 py-3.5 text-sm outline-none transition focus:border-[#320056]/30 focus:bg-white focus:ring-2 focus:ring-[#320056]/15"
            required
          />
        </div>

        {status && (
          <p className="rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-semibold text-slate-600">
            {status}
          </p>
        )}
        {devLink && (
          <a
            href={devLink}
            className="block break-all rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700"
          >
            [Dev] Reset link: {devLink}
          </a>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#320056] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#320056]/20 transition hover:bg-[#4b0082] disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send Reset Link"}
        </button>

        <Link
          href="/admin/login"
          className="block text-center text-sm font-bold text-[#005768] hover:text-[#320056]"
        >
          ← Back to sign in
        </Link>
      </form>
    </AuthShell>
  );
}

/* ── Reset Password Form ── */
function ResetPasswordInner() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirm) {
      setStatus("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = (await res.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!res.ok) {
      setStatus(data.error ?? "Could not reset password.");
      return;
    }

    setStatus(data.message ?? "Password reset successfully.");
    setTimeout(() => router.push("/admin/login"), 900);
  }

  return (
    <AuthShell
      title="Reset Password"
      subtitle="Create a new secure password for your admin account."
    >
      <form onSubmit={submit} className="space-y-5">
        {!token && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Missing reset token. Please request a new reset link.
          </p>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#320056]">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 py-3.5 text-sm outline-none transition focus:ring-2 focus:ring-[#320056]/15"
            required
            minLength={8}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#320056]">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 py-3.5 text-sm outline-none transition focus:ring-2 focus:ring-[#320056]/15"
            required
            minLength={8}
          />
        </div>

        {status && (
          <p className="rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-semibold text-slate-600">
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full rounded-full bg-[#320056] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#320056]/20 transition hover:bg-[#4b0082] disabled:opacity-60"
        >
          {loading ? "Resetting…" : "Reset Password"}
        </button>
      </form>
    </AuthShell>
  );
}

export function ResetPasswordForm() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Reset Password" subtitle="Loading reset form…">
          <p className="text-sm text-slate-500">Loading…</p>
        </AuthShell>
      }
    >
      <ResetPasswordInner />
    </Suspense>
  );
}
