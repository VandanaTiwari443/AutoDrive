import CarSearch from "@/components/CarSearch";

export default function CarsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-4xl font-bold text-gray-900">Our Cars</h1>

        <p className="mt-4 text-gray-600">
          Explore our collection of premium and reliable cars.
        </p>

        <CarSearch />
      </div>
    </main>
  );
}
