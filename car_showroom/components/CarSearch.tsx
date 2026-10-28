"use client";

import { useState } from "react";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";

export default function CarSearch() {
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [maxBudget, setMaxBudget] = useState("All");
  const [familySize, setFamilySize] = useState("All");
  const [drivingType, setDrivingType] = useState("All");

  const clearFilters = () => {
    setSearch("");
    setFuel("All");
    setTransmission("All");
    setPriceRange("All");
    setSortBy("default");
    setMaxBudget("All");
    setFamilySize("All");
    setDrivingType("All");
  };

  const recommendationActive =
    maxBudget !== "All" ||
    familySize !== "All" ||
    drivingType !== "All" ||
    fuel !== "All" ||
    transmission !== "All" ||
    priceRange !== "All";

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.brand.toLowerCase().includes(search.toLowerCase());

    const matchesFuel = fuel === "All" || car.fuel === fuel;

    const matchesTransmission =
      transmission === "All" || car.transmission === transmission;

    const matchesPrice =
      priceRange === "All" ||
      (priceRange === "under30" && car.price < 3000000) ||
      (priceRange === "30to60" &&
        car.price >= 3000000 &&
        car.price <= 6000000) ||
      (priceRange === "above60" && car.price > 6000000);

    const matchesBudget = maxBudget === "All" || car.price <= Number(maxBudget);

    const matchesFamily =
      familySize === "All" || car.seats >= Number(familySize);

    const mileage = Number.parseFloat(car.mileage);

    const matchesDriving =
      drivingType === "All" ||
      (drivingType === "City" && mileage >= 14) ||
      (drivingType === "Highway" && mileage >= 12) ||
      drivingType === "Both";

    return (
      matchesSearch &&
      matchesFuel &&
      matchesTransmission &&
      matchesPrice &&
      matchesBudget &&
      matchesFamily &&
      matchesDriving
    );
  });

  const recommendedCars = filteredCars.map((car) => {
    const mileage = Number.parseFloat(car.mileage);
    const scores: number[] = [];
    const reasons: string[] = [];

    if (maxBudget !== "All") {
      const budget = Number(maxBudget);
      const budgetUsage = car.price / budget;
      const budgetScore = Math.round(Math.max(70, 100 - budgetUsage * 30));

      scores.push(budgetScore);
      reasons.push(`Within your ₹${(budget / 100000).toFixed(0)} lakh budget`);
    }

    if (familySize !== "All") {
      const requiredSeats = Number(familySize);

      scores.push(car.seats === requiredSeats ? 100 : 90);

      reasons.push(
        `${car.seats} seats for your ${requiredSeats}-seat requirement`,
      );
    }

    if (drivingType === "City") {
      const drivingScore = mileage >= 14 ? 100 : mileage >= 12 ? 85 : 65;

      scores.push(drivingScore);
      reasons.push(`${car.mileage} mileage for city driving`);
    } else if (drivingType === "Highway") {
      const drivingScore = mileage >= 12 ? 100 : mileage >= 10 ? 80 : 60;

      scores.push(drivingScore);
      reasons.push(`${car.mileage} mileage for highway driving`);
    } else if (drivingType === "Both") {
      const drivingScore = mileage >= 14 ? 100 : mileage >= 12 ? 90 : 70;

      scores.push(drivingScore);
      reasons.push(`${car.mileage} mileage for mixed driving`);
    }

    if (fuel !== "All") {
      scores.push(car.fuel === fuel ? 100 : 0);
      reasons.push(`${car.fuel} fuel matches your choice`);
    }

    if (transmission !== "All") {
      scores.push(car.transmission === transmission ? 100 : 0);
      reasons.push(`${car.transmission} transmission matches your choice`);
    }

    if (priceRange !== "All") {
      scores.push(100);
      reasons.push("Fits your selected price range");
    }

    const matchScore =
      scores.length > 0
        ? Math.round(
            scores.reduce((total, score) => total + score, 0) / scores.length,
          )
        : undefined;

    return {
      car,
      matchScore,
      recommendationReason: reasons.join(" • "),
    };
  });

  const sortedCars = [...recommendedCars].sort((a, b) => {
    if (sortBy === "priceLow") {
      return a.car.price - b.car.price;
    }

    if (sortBy === "priceHigh") {
      return b.car.price - a.car.price;
    }

    if (sortBy === "newest") {
      return b.car.year - a.car.year;
    }

    if (recommendationActive) {
      return (b.matchScore ?? 0) - (a.matchScore ?? 0);
    }

    return 0;
  });

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          placeholder="Search by car name or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
        />

        <select
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
        >
          <option value="All">Any Budget</option>
          <option value="2000000">Up to ₹20 Lakh</option>
          <option value="5000000">Up to ₹50 Lakh</option>
          <option value="10000000">Up to ₹1 Crore</option>
        </select>

        <select
          value={familySize}
          onChange={(e) => setFamilySize(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
        >
          <option value="All">Any Family Size</option>
          <option value="5">At least 5 seats</option>
          <option value="7">At least 7 seats</option>
        </select>

        <select
          value={drivingType}
          onChange={(e) => setDrivingType(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
        >
          <option value="All">Any Driving Type</option>
          <option value="City">City — prioritize mileage</option>
          <option value="Highway">Highway — mileage of 12+ km/l</option>
          <option value="Both">City and Highway</option>
        </select>

        <select
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
        >
          <option value="All">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>

        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
        >
          <option value="All">All Transmissions</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
        >
          <option value="All">All Prices</option>
          <option value="under30">Under ₹30 Lakh</option>
          <option value="30to60">₹30–60 Lakh</option>
          <option value="above60">Above ₹60 Lakh</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
        >
          <option value="default">Recommended / Default</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>

        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-700 sm:col-span-2 lg:col-span-4"
        >
          Clear All Filters
        </button>
      </div>

      <p className="mt-4 text-gray-600">
        {sortedCars.length} cars found
        {recommendationActive && sortedCars.length > 0
          ? " • Ranked by match score unless another sort is selected"
          : ""}
      </p>

      {sortedCars.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedCars.map(({ car, matchScore, recommendationReason }) => (
            <CarCard
              key={car.id}
              car={car}
              matchScore={recommendationActive ? matchScore : undefined}
              recommendationReason={
                recommendationActive ? recommendationReason : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">No Cars Found</h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
