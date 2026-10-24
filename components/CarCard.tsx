"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { Car } from "@/data/cars";
import type { RootState } from "@/lib/store";

import {
  addFavorite,
  removeFavorite,
} from "@/lib/features/favorites/favoriteSlice";

interface CarCardProps {
  car: Car;
  matchScore?: number;
  recommendationReason?: string;
}

export default function CarCard({
  car,
  matchScore,
  recommendationReason,
}: CarCardProps) {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some((item) => item.id === car.id),
  );

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-52 w-full bg-gray-100">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        {matchScore !== undefined && (
          <div className="mb-3">
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
              {matchScore}% Match
            </span>

            {recommendationReason && (
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {recommendationReason}
              </p>
            )}
          </div>
        )}

        <p className="text-sm font-medium text-gray-500">{car.brand}</p>

        <h3 className="mt-1 text-xl font-semibold text-gray-900">{car.name}</h3>

        <p className="mt-2 text-gray-500">Year: {car.year}</p>

        <p className="mt-4 text-lg font-bold text-gray-900">
          ₹{car.price.toLocaleString("en-IN")}
        </p>

        <button
          type="button"
          onClick={() =>
            isFavorite
              ? dispatch(removeFavorite(car.id))
              : dispatch(addFavorite(car))
          }
          className="mt-4 rounded-full bg-white p-3 shadow transition hover:scale-110"
          aria-label={
            isFavorite
              ? `Remove ${car.name} from favorites`
              : `Add ${car.name} to favorites`
          }
        >
          <Heart size={22} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <Link
          href={`/cars/${car.id}`}
          className="mt-5 block w-full rounded-lg bg-gray-900 px-4 py-3 text-center font-medium text-white transition hover:bg-gray-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
