"use client";

import { useRouter } from "next/navigation";
interface OwnershipCostButtonProps {
  carId: number;
  mileage: number;
}

export default function OwnershipCostButton({
  carId,
  mileage,
}: OwnershipCostButtonProps) {
  const router = useRouter();

  function handleClick() {
    router.push(`/ownership-cost?carId=${carId}&mileage=${mileage}`);
  }

  return (
    <button
      onClick={handleClick}
      className="mt-8 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
    >
      Calculate Ownership Cost
    </button>
  );
}
