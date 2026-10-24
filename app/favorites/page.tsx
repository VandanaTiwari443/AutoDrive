"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Trash2, CalendarDays, X } from "lucide-react";

import type { RootState } from "@/lib/store";
import { removeFavorite } from "@/lib/features/favorites/favoriteSlice";

export default function FavoritesPage() {
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.favorites.items);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success",
  );

  async function handleBookAll(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (favorites.length === 0) {
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const results = await Promise.allSettled(
        favorites.map(async (car) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/test-drive`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                selectedCar: car.name,
                date,
                message: message.trim(),
              }),
            },
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || `Booking failed for ${car.name}.`);
          }

          return car.name;
        }),
      );

      const successful = results.filter(
        (result) => result.status === "fulfilled",
      ).length;

      const failed = results.length - successful;

      if (failed === 0) {
        setFeedback(
          `Success! Test-drive bookings created for all ${successful} favorite cars.`,
        );
        setFeedbackType("success");
        setShowBookingForm(false);
        setName("");
        setEmail("");
        setPhone("");
        setDate("");
        setMessage("");
      } else {
        const failedCars = results
          .map((result, index) =>
            result.status === "rejected" ? favorites[index].name : null,
          )
          .filter(Boolean);

        setFeedback(
          `${successful} booking(s) created successfully. ${failed} booking(s) failed for: ${failedCars.join(", ")}. Please check before retrying to avoid duplicate bookings.`,
        );
        setFeedbackType("error");
      }
    } catch (error) {
      console.error("Book all favorites error:", error);
      setFeedback("Something went wrong. Please try again.");
      setFeedbackType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Favorites</h1>

            <p className="mt-3 text-gray-600">
              Cars you have added to your favorites.
            </p>
          </div>

          {favorites.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setFeedback("");
                setShowBookingForm(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              <CalendarDays size={19} />
              Book All Favorites ({favorites.length})
            </button>
          )}
        </div>

        {feedback && (
          <div
            role="status"
            className={`mb-6 rounded-lg p-4 ${
              feedbackType === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-700"
            }`}
          >
            {feedback}
          </div>
        )}

        {favorites.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow">
            <Heart size={50} />

            <h2 className="mt-5 text-2xl font-semibold text-gray-900">
              No Favorites Yet
            </h2>

            <p className="mt-2 text-gray-500">
              You have not added any cars to your favorites.
            </p>

            <Link
              href="/cars"
              className="mt-6 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              Explore Cars
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <div className="relative h-52 w-full bg-gray-100">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <p className="text-sm font-medium text-gray-500">
                    {car.brand}
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    {car.name}
                  </h2>

                  <p className="mt-2 text-gray-500">Year: {car.year}</p>

                  <p className="mt-4 text-lg font-bold text-gray-900">
                    ₹{car.price.toLocaleString("en-IN")}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/cars/${car.id}`}
                      className="flex-1 rounded-lg bg-gray-900 px-4 py-3 text-center font-medium text-white transition hover:bg-gray-700"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => dispatch(removeFavorite(car.id))}
                      className="rounded-lg bg-gray-100 px-4 py-3 transition hover:bg-gray-200"
                      aria-label={`Remove ${car.name} from favorites`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <Link
                    href={`/contact?car=${encodeURIComponent(car.name)}`}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-900 px-4 py-3 font-medium text-gray-900 transition hover:bg-gray-100"
                  >
                    <CalendarDays size={18} />
                    Book Test Drive
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Book All Favorite Cars
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Your details will be used for each of the {favorites.length}{" "}
                  test-drive bookings.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                disabled={loading}
                aria-label="Close booking form"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-5 rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-700">
                Cars to book
              </p>

              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {favorites.map((car) => (
                  <li key={car.id}>• {car.name}</li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleBookAll} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="booking-name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="booking-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  maxLength={100}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="booking-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  maxLength={254}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-phone"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  pattern="[6-9][0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number."
                  placeholder="10-digit mobile number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-date"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Preferred Test Drive Date
                </label>

                <input
                  id="booking-date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  min={new Date().toLocaleDateString("en-CA")}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-message"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="booking-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={1000}
                  rows={3}
                  placeholder="Any additional information..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading || favorites.length === 0}
                className="w-full rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Submitting Bookings..."
                  : `Book All ${favorites.length} Cars`}
              </button>

              <p className="text-xs leading-5 text-gray-500">
                Each favorite car creates a separate booking request. Please
                avoid retrying if some bookings succeed and others fail.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
