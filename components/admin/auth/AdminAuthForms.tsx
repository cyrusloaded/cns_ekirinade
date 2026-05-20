"use client";

import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {FormEvent, Suspense, useState} from "react";
import {LockKeyhole, Mail, ShieldCheck} from "lucide-react";

function AuthShell({title, subtitle, children}: {title: string; subtitle: string; children: React.ReactNode}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f9fc] px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-[#320056]/10 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-[#320056] to-[#005768] p-8 text-white sm:p-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <ShieldCheck size={28} />
          </div>
          <h1 className="mt-8 text-3xl font-black tracking-tight sm:text-4xl">Admin Console</h1>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">Secure access for College of Nursing Science, Ekinrin-Adde website administrators.</p>
          <div className="mt-10 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Default Super Admin</p>
            <p className="mt-3 text-sm font-semibold">Email: admin@ekinrin-ng.com</p>
            <p className="text-sm font-semibold">Password: admin</p>
            <p className="mt-3 text-xs leading-5 text-white/60">Change this password immediately after first login.</p>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-black text-[#320056]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@ekinrin-ng.com");
  const [password, setPassword] = useState("admin");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    });

    const data = (await response.json()) as {error?: string};
    setLoading(false);

    if (!response.ok) {
      setStatus(data.error || "Login failed.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <AuthShell title="Login to Admin" subtitle="Enter your admin credentials to manage website pages, images, submissions, and portal settings.">
      <form onSubmit={submit} className="space-y-5">
        <label className="block space-y-2 text-sm font-bold text-[#320056]">
          <span>Email Address</span>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border-none bg-[#f2f4f7] py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20" required />
          </div>
        </label>
        <label className="block space-y-2 text-sm font-bold text-[#320056]">
          <span>Password</span>
          <div className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border-none bg-[#f2f4f7] py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20" required />
          </div>
        </label>
        <div className="flex items-center justify-between gap-4">
          <Link href="/admin/forgot-password" className="text-sm font-bold text-[#005768] hover:text-[#320056]">Forgot password?</Link>
          <Link href="/student-portal" className="text-sm font-bold text-slate-400 hover:text-[#320056]">Student portal</Link>
        </div>
        {status && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{status}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-full bg-[#320056] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#320056]/20 transition hover:bg-[#4b0082] disabled:opacity-60">{loading ? "Logging in..." : "Login"}</button>
      </form>
    </AuthShell>
  );
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("admin@ekinrin-ng.com");
  const [status, setStatus] = useState("");
  const [devLink, setDevLink] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    setDevLink("");

    const response = await fetch("/api/admin/auth/forgot-password", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email}),
    });

    const data = (await response.json()) as {message?: string; error?: string; devResetLink?: string};
    setLoading(false);
    setStatus(data.message || data.error || "Request completed.");
    if (data.devResetLink) setDevLink(data.devResetLink);
  }

  return (
    <AuthShell title="Forgot Password" subtitle="Enter your admin email. A secure reset link will be sent to the email if it exists.">
      <form onSubmit={submit} className="space-y-5">
        <label className="block space-y-2 text-sm font-bold text-[#320056]">
          <span>Admin Email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border-none bg-[#f2f4f7] px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20" required />
        </label>
        {status && <p className="rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-semibold text-slate-600">{status}</p>}
        {devLink && <a href={devLink} className="block break-all rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700">Development reset link: {devLink}</a>}
        <button type="submit" disabled={loading} className="w-full rounded-full bg-[#320056] px-6 py-4 text-sm font-black text-white disabled:opacity-60">{loading ? "Sending..." : "Send Reset Link"}</button>
        <Link href="/admin/login" className="block text-center text-sm font-bold text-[#005768]">Back to login</Link>
      </form>
    </AuthShell>
  );
}

function ResetPasswordInner() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/admin/auth/reset-password", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token, password}),
    });

    const data = (await response.json()) as {message?: string; error?: string};
    setLoading(false);

    if (!response.ok) {
      setStatus(data.error || "Could not reset password.");
      return;
    }

    setStatus(data.message || "Password reset successfully.");
    setTimeout(() => router.push("/admin/login"), 900);
  }

  return (
    <AuthShell title="Reset Password" subtitle="Create a new secure password for your admin account.">
      <form onSubmit={submit} className="space-y-5">
        {!token && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">Missing reset token. Please request a new reset link.</p>}
        <label className="block space-y-2 text-sm font-bold text-[#320056]">
          <span>New Password</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border-none bg-[#f2f4f7] px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20" required minLength={6} />
        </label>
        <label className="block space-y-2 text-sm font-bold text-[#320056]">
          <span>Confirm Password</span>
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-2xl border-none bg-[#f2f4f7] px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20" required minLength={6} />
        </label>
        {status && <p className="rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-semibold text-slate-600">{status}</p>}
        <button type="submit" disabled={loading || !token} className="w-full rounded-full bg-[#320056] px-6 py-4 text-sm font-black text-white disabled:opacity-60">{loading ? "Resetting..." : "Reset Password"}</button>
      </form>
    </AuthShell>
  );
}

export function ResetPasswordForm() {
  return (
    <Suspense fallback={<AuthShell title="Reset Password" subtitle="Loading reset form..."><p className="text-sm text-slate-500">Loading...</p></AuthShell>}>
      <ResetPasswordInner />
    </Suspense>
  );
}
