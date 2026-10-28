import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold">AutoDrive</h2>

            <p className="mt-4 max-w-xs leading-7 text-gray-400">
              Find your perfect car and enjoy a simple, transparent, and
              convenient car-buying experience.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-gray-400">
              <Link href="/" className="hover:text-white">
                Home
              </Link>

              <Link href="/cars" className="hover:text-white">
                Cars
              </Link>

              <Link href="/about" className="hover:text-white">
                About
              </Link>

              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Services</h3>

            <div className="mt-4 flex flex-col gap-3 text-gray-400">
              <p>Car Sales</p>
              <p>Test Drive</p>
              <p>Car Financing</p>
              <p>Car Service</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>

            <div className="mt-4 space-y-3 text-gray-400">
              <p>Udaipur, Rajasthan</p>
              <p>+91 98765 43210</p>
              <p>hello@autodrive.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © 2026 AutoDrive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
