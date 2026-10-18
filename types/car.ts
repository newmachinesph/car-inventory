export interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  vin: string;
  stock: string;
  condition: "new" | "used";
  bodyStyle: string;
  fuelType: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  exteriorColor: string;
  interiorColor: string;
  mpg: { city: number; highway: number };
  images: string[];
  features: string[];
  description: string;
  isFeatured: boolean;
}
