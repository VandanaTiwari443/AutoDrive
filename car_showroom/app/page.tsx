import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import CustomerReviews from "@/components/CustomerReviews";
import TestDrive from "@/components/TestDrive";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <About />
      <CustomerReviews />
      <TestDrive />
    </main>
  );
}
