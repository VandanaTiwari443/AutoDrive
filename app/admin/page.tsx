import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminBookings from "./AdminBookings";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let response: Response;

  try {
    response = await fetch(
      `${apiUrl.replace(/\/+$/, "")}/api/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      }
    );
  } catch (error) {
    console.error("Admin authentication request failed:", error);
    throw new Error("Unable to connect to the authentication server.");
  }

  if (!response.ok) {
    redirect("/login");
  }

  const data = await response.json();
  const user = data.user;

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome, {user.name}
        </p>

        <AdminBookings />
      </div>
    </main>
  );
}