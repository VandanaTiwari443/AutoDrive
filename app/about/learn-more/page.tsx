import Link from "next/link";

export default function LearnMorePage() {
return (
<main className="min-h-screen bg-gray-50 px-6 py-16">
<div className="mx-auto max-w-5xl">
<Link href="/about" className="text-sm font-medium text-gray-600 hover:text-black" >
← Back to About Us
</Link>

    <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm md:p-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
        Discover AutoDrive
      </p>

      <h1 className="mt-3 text-4xl font-bold text-gray-900">
        More Than Just a Car Showroom
      </h1>

      <p className="mt-6 leading-8 text-gray-600">
        At AutoDrive, we aim to make finding your next car simple,
        convenient, and enjoyable. Explore different models, compare
        features, and discover a vehicle that suits your needs and budget.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-gray-900">
        Our Mission
      </h2>

      <p className="mt-3 leading-7 text-gray-600">
        Our mission is to help customers make informed car-buying
        decisions by presenting vehicle information in a clear and
        accessible way.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-gray-900">
        Why Choose AutoDrive?
      </h2>

      <ul className="mt-4 space-y-3 text-gray-600">
        <li>• Explore a range of cars in one place.</li>
        <li>• Compare vehicle details and features.</li>
        <li>• Save your favorite cars for later.</li>
        <li>• Request a test drive online.</li>
      </ul>

      <Link
        href="/cars"
        className="mt-10 inline-block rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
      >
        Explore Cars
      </Link>
    </section>
  </div>
</main>

);
}