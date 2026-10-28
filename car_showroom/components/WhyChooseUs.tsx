import { Car, ShieldCheck, Wallet, Headphones } from "lucide-react";
interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}
const features: Feature[] = [
  {
    title: "Wide Selection",
    description: "Choose from a wide range of premium and reliable cars.",
    icon: Car,
  },
  {
    title: "Trusted Service",
    description:
      "Our team provides a transparent and reliable car-buying experience.",
    icon: ShieldCheck,
  },
  {
    title: "Fair Pricing",
    description: "Get competitive and transparent pricing on all our cars.",
    icon: Wallet,
  },
  {
    title: "Customer Support",
    description:
      "Our team is available to help you throughout your car-buying journey.",
    icon: Headphones,
  },
];
export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Why AutoDrive
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Why Choose Us
          </h2>
          <p className="mt-4 text-gray-600">
            We make your car-buying experience simple, transparent, and
            reliable.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <Icon className="h-7 w-7 text-gray-900" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
