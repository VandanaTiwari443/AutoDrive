import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-20">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-600">
            Premium Car Showroom
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Find Your
            <span className="block">Perfect Car.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover premium cars, explore amazing deals, and drive home with
            the car you will always wanted.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/cars"
              className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              Explore Cars
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 hover:bg-gray-50"
            >
              Book Test Drive
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[280px] w-full overflow-hidden rounded-2xl bg-gray-300 sm:min-h-[360px] lg:h-[500px] lg:min-h-0 lg:w-[700px] lg:shrink-0">
          <Image
            src="/cars/showroom.jpg"
            alt="AutoDrive Showroom"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
