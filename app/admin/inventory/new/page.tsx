"use client";

import CarForm from "@/components/admin/CarForm";
import { addCar } from "@/lib/carStore";
import type { Car } from "@/types/car";

export default function NewCarPage() {
  return (
    <CarForm
      title="Add New Vehicle"
      onSubmit={(car: Car) => addCar(car)}
    />
  );
}
