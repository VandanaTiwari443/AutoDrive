"use client";

import { useCallback, useEffect, useState } from "react";

type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  selectedCar: string;
  date: string;
  message?: string;
  status: BookingStatus;
  createdAt?: string;
}

const statuses: BookingStatus[] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

function getApiUrl() {
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  return url.replace(/\/+$/, "");
}

async function readResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Expected JSON from the API, but received HTTP ${response.status}. Check the backend URL and route.`,
    );
  }

  return response.json();
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [success, setSuccess] = useState("");

  const loadBookings = useCallback(async (signal?: AbortSignal) => {
    const response = await fetch(`${getApiUrl()}/api/test-drive`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      signal,
    });

    const data = await readResponse(response);

    if (!response.ok) {
      throw new Error(data.message || "Failed to load bookings.");
    }

    if (!Array.isArray(data.bookings)) {
      throw new Error("The API response must contain a bookings array.");
    }

    setBookings(data.bookings);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      try {
        setError("");
        await loadBookings(controller.signal);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setError(
          err instanceof Error ? err.message : "Failed to load bookings.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void run();

    return () => controller.abort();
  }, [loadBookings]);

  async function updateBookingStatus(bookingId: string, status: BookingStatus) {
    const previousBookings = bookings;

    setUpdatingId(bookingId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${getApiUrl()}/api/test-drive/${bookingId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update booking status.");
      }

      const updatedBooking: Booking = data.booking;

      if (!updatedBooking?._id) {
        throw new Error("The server did not return the updated booking.");
      }

      setBookings((current) =>
        current.map((booking) =>
          booking._id === bookingId ? updatedBooking : booking,
        ),
      );

      setSuccess(`Booking status changed to ${updatedBooking.status}.`);
    } catch (err) {
      setBookings(previousBookings);
      setError(
        err instanceof Error ? err.message : "Failed to update booking status.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function refreshBookings() {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await loadBookings();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh bookings.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <p className="text-gray-600">Loading test drive bookings...</p>
      </div>
    );
  }

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Test Drive Bookings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer test drive requests and their status.
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
          {bookings.length} Booking{bookings.length !== 1 ? "s" : ""}
        </span>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700"
        >
          {success}
        </p>
      )}

      <button
        type="button"
        onClick={() => void refreshBookings()}
        className="mb-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Refresh Bookings
      </button>

      {bookings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">No test drive bookings yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead>
              <tr className="border-b border-gray-200">
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Car",
                  "Date",
                  "Status",
                  "Action",
                  "Message",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-sm font-semibold text-gray-700"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-100">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {booking.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {booking.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {booking.phone}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {booking.selectedCar}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {booking.date}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {booking.status}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      aria-label={`Update status for ${booking.name}`}
                      value={booking.status}
                      disabled={updatingId === booking._id}
                      onChange={(event) =>
                        void updateBookingStatus(
                          booking._id,
                          event.target.value as BookingStatus,
                        )
                      }
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 disabled:opacity-50"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {updatingId === booking._id && (
                      <p className="mt-1 text-xs text-gray-500">Saving...</p>
                    )}
                  </td>
                  <td className="max-w-xs px-4 py-4 text-sm text-gray-600">
                    {booking.message || "No message"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
