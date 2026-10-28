import { Car, CreditCard, Headphones, Wrench } from "lucide-react";
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Our Services
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Services We Provide
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We provide a simple and reliable car-buying experience with services
            designed to make your journey easier.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Car className="h-7 w-7 text-gray-900" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Test Drive
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Book a test drive and experience your favorite car before making
              your decision.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <CreditCard className="h-7 w-7 text-gray-900" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Car Financing
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Explore financing options that can help make your car purchase
              easier.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Car className="h-7 w-7 text-gray-900" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Car Sales
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Explore our wide range of cars and find the perfect vehicle for
              your needs and budget.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Wrench className="h-7 w-7 text-gray-900" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Car Service
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Keep your vehicle in excellent condition with reliable maintenance
              and servicing support.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Headphones className="h-7 w-7 text-gray-900" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Car Support
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Get assistance from our team throughout your car-buying journey.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
