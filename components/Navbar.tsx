"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/lib/store";
import { clearUser } from "@/lib/features/auth/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.favorites.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  async function handleLogout() {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is missing.");
      }

      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout failed.");
        return;
      }

      dispatch(clearUser());
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-white transition hover:text-gray-300"
        >
          AutoDrive
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/cars"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            Cars
          </Link>
          <Link
            href="/ai-assistant"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            AI Assistant
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            Contact
          </Link>
          <Link
            href="/favorites"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            Favorites ({favorites.length})
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-300">Hi, {user?.name}</span>

              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  Admin
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-300 transition hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Sign Up
              </Link>
            </>
          )}

          <Link
            href="/contact"
            className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
          >
            Book Test Drive
          </Link>
        </div>
      </div>
    </nav>
  );
}
