"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { cars } from "@/data/cars";
import { ownershipCosts } from "@/data/ownershipCosts";
export default function OwnershipCostPage() {
  const searchParams = useSearchParams();

  const carId = searchParams.get("carId");
  const carMileageFromURL = searchParams.get("mileage");
  const selectedCar = cars.find((car) => String(car.id) === carId);
  const carEstimate = carId ? ownershipCosts[Number(carId)] : undefined;
  const [distance, setDistance] = useState("1000");

  const [mileage, setMileage] = useState(() => {
    const urlMileage = carMileageFromURL ? Number(carMileageFromURL) : NaN;

    if (Number.isFinite(urlMileage) && urlMileage > 0) {
      return String(urlMileage);
    }

    const carMileage = Number.parseFloat(selectedCar?.mileage ?? "");

    return carMileage > 0 ? String(carMileage) : "12";
  });

  const [fuelPrice, setFuelPrice] = useState("105");

  const [insurance, setInsurance] = useState(() =>
    String(carEstimate?.insurance ?? 12000),
  );

  const [maintenance, setMaintenance] = useState(() =>
    String(carEstimate?.maintenance ?? 6000),
  );

  const [calculated, setCalculated] = useState(false);
  const monthlyDistance = Number(distance);
  const carMileage = Number(mileage);
  const pricePerLitre = Number(fuelPrice);
  const yearlyInsurance = Number(insurance);
  const yearlyMaintenance = Number(maintenance);

  const validInputs =
    distance.trim() !== "" &&
    mileage.trim() !== "" &&
    fuelPrice.trim() !== "" &&
    insurance.trim() !== "" &&
    maintenance.trim() !== "" &&
    Number.isFinite(monthlyDistance) &&
    Number.isFinite(carMileage) &&
    Number.isFinite(pricePerLitre) &&
    Number.isFinite(yearlyInsurance) &&
    Number.isFinite(yearlyMaintenance) &&
    monthlyDistance > 0 &&
    carMileage > 0 &&
    pricePerLitre > 0 &&
    yearlyInsurance >= 0 &&
    yearlyMaintenance >= 0;

  const monthlyFuel = validInputs
    ? (monthlyDistance / carMileage) * pricePerLitre
    : 0;

  const monthlyInsurance = validInputs ? yearlyInsurance / 12 : 0;
  const monthlyMaintenance = validInputs ? yearlyMaintenance / 12 : 0;

  const monthlyTotal = monthlyFuel + monthlyInsurance + monthlyMaintenance;

  const yearlyTotal = monthlyTotal * 12;

  const formatRupees = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  function calculateCost() {
    setCalculated(true);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Car Ownership Cost Calculator</h1>

        {selectedCar && (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2 sm:items-center">
              <div className="relative h-48 overflow-hidden rounded-xl">
                <Image
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">{selectedCar.name}</h2>

                <p className="mt-2 text-gray-600">
                  {selectedCar.brand} · {selectedCar.year}
                </p>

                <p className="mt-3 text-xl font-semibold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(selectedCar.price)}
                </p>

                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p>Fuel: {selectedCar.fuel}</p>
                  <p>Transmission: {selectedCar.transmission}</p>
                  <p>Mileage: {selectedCar.mileage}</p>
                  <p>Seats: {selectedCar.seats}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {carId && (
          <p className="mt-2 text-sm text-gray-500">Selected car ID: {carId}</p>
        )}

        <p className="mt-2 text-gray-600">
          Estimate how much your car may cost to run.
        </p>

        <div className="mt-8 grid gap-6 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Monthly driving distance (km)
            </label>
            <input
              type="number"
              min="1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Car mileage (km/litre)
            </label>
            <input
              type="number"
              min="0.1"
              step="any"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Fuel price (₹/litre)
            </label>
            <input
              type="number"
              min="0.1"
              step="any"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Yearly insurance (₹)
            </label>
            <input
              type="number"
              min="0"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Yearly maintenance (₹)
            </label>
            <input
              type="number"
              min="0"
              value={maintenance}
              onChange={(e) => setMaintenance(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            onClick={calculateCost}
            className="rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800 md:col-span-2"
          >
            Calculate Ownership Cost
          </button>

          {calculated && (
            <div className="rounded-xl bg-blue-50 p-5 md:col-span-2">
              {validInputs ? (
                <>
                  <p className="text-sm text-gray-600">
                    Estimated monthly ownership cost
                  </p>

                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {formatRupees(monthlyTotal)}
                  </p>

                  <p className="mt-2 text-gray-600">
                    Estimated yearly cost: {formatRupees(yearlyTotal)}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-blue-100 pt-4">
                    <div className="flex justify-between gap-4">
                      <span>Monthly fuel</span>
                      <strong>{formatRupees(monthlyFuel)}</strong>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>Monthly insurance</span>
                      <strong>{formatRupees(monthlyInsurance)}</strong>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>Monthly maintenance</span>
                      <strong>{formatRupees(monthlyMaintenance)}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-red-700">
                  Please enter valid values. Distance, mileage and fuel price
                  must be greater than zero; expenses cannot be negative.
                </p>
              )}

              <p className="mt-4 text-xs text-gray-500">
                These are estimates based on your inputs, not guaranteed actual
                costs. EMI, depreciation, tolls and parking are not included.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
