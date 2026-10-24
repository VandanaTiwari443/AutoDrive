import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";
export default function FeaturedCars() {
  const featuredCars = cars.slice(0, 3);
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Featured Cars
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Explore Our Featured Cars
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover some of our most popular cars available at AutoDrive.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
