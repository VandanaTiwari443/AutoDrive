"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  setUser,
  clearUser,
  setAuthLoading,
} from "@/lib/features/auth/authSlice";

import type { RootState } from "@/lib/store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const loading = useSelector((state: RootState) => state.auth.loading);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [checkedPath, setCheckedPath] = useState<string | null>(null);

  useEffect(() => {
    const isPublicRoute = pathname === "/login" || pathname === "/signup";

    const controller = new AbortController();

    async function checkAuthentication() {
      setCheckedPath(null);

      if (isPublicRoute) {
        dispatch(setAuthLoading(false));
        setCheckedPath(pathname);
        return;
      }

      dispatch(setAuthLoading(true));

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is missing.");
        }

        const response = await fetch(
          `${apiUrl.replace(/\/+$/, "")}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          const errorText = await response.text();

          console.error(
            "Authentication check failed:",
            response.status,
            errorText,
          );

          dispatch(clearUser());
          return;
        }

        const data = await response.json();

        if (data.user?.id && data.user?.email && data.user?.role) {
          dispatch(setUser(data.user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Authentication check error:", error);
        dispatch(clearUser());
      } finally {
        if (!controller.signal.aborted) {
          dispatch(setAuthLoading(false));
          setCheckedPath(pathname);
        }
      }
    }

    void checkAuthentication();

    return () => controller.abort();
  }, [dispatch, pathname]);

  useEffect(() => {
    const isPublicRoute = pathname === "/login" || pathname === "/signup";

    if (checkedPath !== pathname || loading) {
      return;
    }

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
    }
  }, [checkedPath, loading, isAuthenticated, pathname, router]);

  if (loading || checkedPath !== pathname) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
