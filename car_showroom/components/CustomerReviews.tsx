interface CustomerReview {
  name: string;
  car: string;
  review: string;
}

const reviews: CustomerReview[] = [
  {
    name: "Rahul Sharma",
    car: "BMW X5",
    review:
      "The entire car-buying experience was smooth and simple. The team was very helpful.",
  },
  {
    name: "Priya Mehta",
    car: "Audi Q7",
    review:
      "I found the perfect car for my family. Everything was explained clearly.",
  },
  {
    name: "Arjun Patel",
    car: "Mercedes-Benz GLC",
    review:
      "Great selection of cars and excellent service. Booking a test drive was easy.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Customer Reviews
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-600">
            See what our customers think about their experience with AutoDrive.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="text-xl">★★★★★</div>

              <p className="mt-4 leading-7 text-gray-600">{review.review}</p>

              <div className="mt-6 border-t pt-5">
                <h3 className="font-semibold text-gray-900">{review.name}</h3>

                <p className="mt-1 text-sm text-gray-500">Car: {review.car}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
