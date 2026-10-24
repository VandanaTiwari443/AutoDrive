export interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  year: number;
  description: string;
  fuel: string;
  transmission: string;
  mileage: string;
  seats: number;
  color: string;
  image: string;
}

export const cars: Car[] = [
  {
    id: 1,
    name: "BMW X5",
    brand: "BMW",
    price: 9500000,
    year: 2025,
    description:
      "The BMW X5 combines luxury, performance, comfort, and advanced technology.",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "12 km/l",
    seats: 5,
    color: "Black",
    image: "/cars/bmw-x5.jpg",
  },
  {
    id: 2,
    name: "Audi Q7",
    brand: "Audi",
    price: 8500000,
    year: 2025,
    description:
      "The Audi Q7 offers a premium interior, powerful performance, and comfortable space.",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "11 km/l",
    seats: 7,
    color: "White",
    image: "/cars/audi-q7.jpg",
  },
  {
    id: 3,
    name: "Mercedes-Benz GLC",
    brand: "Mercedes-Benz",
    price: 7500000,
    year: 2024,
    description:
      "The Mercedes-Benz GLC delivers a premium driving experience with modern design and comfort.",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "13 km/l",
    seats: 5,
    color: "Silver",
    image: "/cars/mercedes-glc.jpg",
  },
  {
    id: 4,
    name: "Toyota Fortuner",
    brand: "Toyota",
    price: 4500000,
    year: 2025,
    description:
      "The Toyota Fortuner is a powerful SUV designed for city driving and challenging roads.",
    fuel: "Diesel",
    transmission: "Automatic",
    mileage: "14 km/l",
    seats: 7,
    color: "White",
    image: "/cars/toyota-fortuner.jpg",
  },
  {
    id: 5,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    price: 3200000,
    year: 2024,
    description:
      "The Hyundai Tucson combines modern styling, technology, and comfortable interiors.",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "14 km/l",
    seats: 5,
    color: "Red",
    image: "/cars/hyundai-tucson.jpg",
  },
  {
    id: 6,
    name: "Kia Seltos",
    brand: "Kia",
    price: 2200000,
    year: 2025,
    description:
      "The Kia Seltos offers modern design, practical features, and a comfortable driving experience.",
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "17 km/l",
    seats: 5,
    color: "Blue",
    image: "/cars/kia-seltos.jpg",
  },
];
