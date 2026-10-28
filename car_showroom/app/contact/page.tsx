"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cars } from "@/data/cars";

export default function ContactPage() {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedCar, setSelectedCar] = useState(searchParams.get("car") || "");

  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [carError, setCarError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    setNameError("");
    setEmailError("");
    setPhoneError("");
    setCarError("");
    setDateError("");

    let hasError = false;

    if (!name.trim()) {
      setNameError("Name is required.");
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      hasError = true;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        setEmailError("Please enter a valid email address.");
        hasError = true;
      }
    }

    if (!phone.trim()) {
      setPhoneError("Phone number is required.");
      hasError = true;
    } else {
      const phonePattern = /^[6-9]\d{9}$/;

      if (!phonePattern.test(phone)) {
        setPhoneError("Please enter a valid 10-digit phone number.");
        hasError = true;
      }
    }

    if (!selectedCar) {
      setCarError("Please select a car.");
      hasError = true;
    }

    if (!date) {
      setDateError("Please select a date.");
      hasError = true;
    } else {
      const today = new Date().toISOString().split("T")[0];

      if (date < today) {
        setDateError("Please select today or a future date.");
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/test-drive`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            selectedCar,
            date,
            message,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess(true);

      setName("");
      setEmail("");
      setPhone("");
      setSelectedCar("");
      setDate("");
      setMessage("");
    } catch {
      setError("Unable to submit your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Test Drive
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Book Your Test Drive
          </h1>

          <p className="mt-4 text-gray-600">
            Choose your favorite car and schedule a test drive with AutoDrive.
          </p>
        </div>

        <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />

              {nameError && (
                <p className="mt-1 text-sm text-red-600">{nameError}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />

              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter your 10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />

              {phoneError && (
                <p className="mt-1 text-sm text-red-600">{phoneError}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Select Car
              </label>

              <select
                value={selectedCar}
                onChange={(e) => {
                  setSelectedCar(e.target.value);
                  setCarError("");
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
              >
                <option value="">Choose a car</option>

                {cars.map((car) => (
                  <option key={car.id} value={car.name}>
                    {car.brand} {car.name}
                  </option>
                ))}
              </select>

              {carError && (
                <p className="mt-1 text-sm text-red-600">{carError}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Preferred Date
              </label>

              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setDate(e.target.value);
                  setDateError("");
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />

              {dateError && (
                <p className="mt-1 text-sm text-red-600">{dateError}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Message
              </label>

              <textarea
                rows={5}
                placeholder="Any additional information..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Book Test Drive"}
            </button>
          </form>

          {success && (
            <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
              Your test drive request has been submitted successfully!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
