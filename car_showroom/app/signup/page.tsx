"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

    if (!apiUrl) {
      setMessage(
        "API URL is missing. Please configure NEXT_PUBLIC_API_URL in .env.local and restart Next.js.",
      );
      console.error("NEXT_PUBLIC_API_URL is undefined.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${apiUrl.replace(/\/+$/, "")}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        },
      );

      const responseText = await response.text();

      let data: { message?: string; user?: unknown };

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error(
          "Invalid signup response:",
          response.status,
          responseText,
        );

        setMessage(
          `Invalid server response (HTTP ${response.status}). Check your backend.`,
        );
        return;
      }

      if (!response.ok) {
        setMessage(data.message || `Signup failed (${response.status}).`);
        return;
      }

      setMessage(data.message || "Account created successfully.");

      setName("");
      setEmail("");
      setPassword("");

      router.push("/login");
    } catch (error) {
      console.error("Signup fetch error:", error);

      setMessage(
        "Unable to connect to the backend. Check the API URL, backend status, and CORS configuration.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

        <p className="mt-2 text-gray-500">Sign up to continue</p>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            aria-live="polite"
            className="mt-4 text-center text-sm text-gray-600"
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-gray-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
