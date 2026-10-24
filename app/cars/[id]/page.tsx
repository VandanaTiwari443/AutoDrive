import { cars } from "@/data/cars";
import { notFound } from "next/navigation";
import OwnershipCostButton from "@/components/OwnershipCostButton";

interface CarDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params;

  const carId = Number(id);
  const car = cars.find((car) => car.id === carId);

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-4xl font-bold text-gray-900">{car.name}</h1>

        <p className="mt-2 text-lg text-gray-500">{car.brand}</p>

        <p className="mt-6 text-3xl font-bold text-gray-900">
          ₹{car.price.toLocaleString("en-IN")}
        </p>

        <p className="mt-6 text-gray-600">{car.description}</p>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Year</p>
            <p className="font-semibold">{car.year}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Fuel</p>
            <p className="font-semibold">{car.fuel}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Transmission</p>
            <p className="font-semibold">{car.transmission}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mileage</p>
            <p className="font-semibold">{car.mileage}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Seats</p>
            <p className="font-semibold">{car.seats}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Color</p>
            <p className="font-semibold">{car.color}</p>
          </div>
        </div>

        <OwnershipCostButton
          carId={car.id}
          mileage={Number.parseFloat(car.mileage)}
        />
      </div>
    </main>
  );
}
