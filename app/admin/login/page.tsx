"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid login details.");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5ef] px-5">
      <div className="w-full max-w-[600px] rounded-2xl border border-[#e5e1d7] bg-white p-10 shadow-xl sm:p-12">
        <div className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#b48728]">
            Sri Balaji
          </p>

          <h1 className="mt-1 text-[26px] font-bold tracking-[0.08em] text-[#123f32]">
            PRIDE HOMES
          </h1>

          <p className="mt-6 text-[24px] font-semibold text-[#123f32]">
            Admin Login
          </p>

          <p className="mt-2 text-sm text-[#71817b]">
            Manage Evergreen Homes enquiries
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#34534a]">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-lg border border-[#d9d5ca] px-4 py-3.5 text-base outline-none transition focus:border-[#b48728]"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#34534a]">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-[#d9d5ca] px-4 py-3.5 text-base outline-none transition focus:border-[#b48728]"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#123f32] px-4 py-3.5 text-base font-semibold text-white transition hover:bg-[#1b5545] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-7 text-center text-xs text-[#8a9690]">
          Evergreen Homes Admin Portal
        </p>
      </div>
    </main>
  );
}