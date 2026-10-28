import Link from "next/link";
export default function TestDrive() {
  return (
    <section className="bg-gray-200 py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          Ready to Drive?
        </p>
        <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Book Your Test Drive Today
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-500">
          Experience your favorite car in person and take it for a test drive
          with our team.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-lg  bg-gray-900 px-7 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Book a Test Drive
        </Link>
      </div>
    </section>
  );
}
