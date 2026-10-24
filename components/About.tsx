import Link from "next/link";
import Image from "next/image";
export default function About() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="relative h-96 overflow-hidden rounded-2xl bg-gray-200">
          <Image
            src="/cars/about.jpg"
            alt="About AutoDrive"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            About AutoDrive
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            Your Journey to the Perfect Car Starts Here
          </h2>
          <p className="mt-6 leading-7 text-gray-600">
            AutoDrive is a modern car showroom focused on helping customers
            discover reliable, stylish, and high-quality vehicles.
          </p>
          <p className="mt-4 leading-7 text-gray-600">
            From exploring different models to booking a test drive, we aim to
            make the car-buying journey simple and convenient.
          </p>
          <Link
            href="/about/learn-more"
            className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-700"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
