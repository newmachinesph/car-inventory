"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CarForm from "@/components/admin/CarForm";
import { loadCars, updateCar } from "@/lib/carStore";
import type { Car } from "@/types/car";

export default function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [car, setCar] = useState<Car | null | undefined>(undefined);

  useEffect(() => {
    const found = loadCars().find((c) => c.id === id);
    setCar(found ?? null);
  }, [id]);

  if (car === undefined) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (car === null) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500 mb-4">Vehicle not found.</p>
        <button
          onClick={() => router.push("/admin/inventory")}
          className="text-orange-500 font-semibold hover:underline"
        >
          ← Back to Inventory
        </button>
      </div>
    );
  }

  return (
    <CarForm
      title={`Edit — ${car.year} ${car.make} ${car.model}`}
      initial={car}
      onSubmit={(updated: Car) => updateCar(id, updated)}
    />
  );
}
