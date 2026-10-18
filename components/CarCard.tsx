import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/types/car";
import { carPath } from "@/lib/carUtils";

interface CarCardProps {
  car: Car;
  compact?: boolean;
}

export default function CarCard({ car, compact = false }: CarCardProps) {
  const formatPrice = (p: number) =>
    p.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <Link
      href={carPath(car)}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 hover:border-gold-300 flex flex-col transition-all duration-300"
    >
      {/* Image */}
      <div className="relative img-zoom aspect-[4/3] bg-navy-50">
        <Image
          src={car.images[0]}
          alt={`${car.year} ${car.make} ${car.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            car.condition === "new"
              ? "bg-navy-700 text-gold-400"
              : "bg-black/60 text-white backdrop-blur-sm"
          }`}>
            {car.condition}
          </span>
        </div>
        {car.isFeatured && (
          <div className="absolute top-2 right-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-gold-500 text-navy-900">
              Featured
            </span>
          </div>
        )}
        {/* Gold bottom gradient on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] text-gold-600 font-semibold uppercase tracking-widest mb-0.5">
          {car.make} · {car.bodyStyle}
        </p>
        <h3 className="font-black text-navy-900 text-sm leading-snug group-hover:text-gold-600 transition-colors mb-0.5">
          {car.year} {car.make} {car.model}
        </h3>
        <p className="text-xs text-gray-400 mb-3">{car.trim}</p>

        {!compact && (
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 border-t border-gray-100 pt-3">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {car.fuelType}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {car.drivetrain}
            </span>
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="text-lg font-black text-navy-900">{formatPrice(car.price)}</div>
            {compact && (
              <div className="text-xs text-gray-400">{car.mileage.toLocaleString()} mi</div>
            )}
          </div>
          <span className="text-xs font-bold text-gold-600 group-hover:text-gold-500 flex items-center gap-0.5 transition-colors">
            Details
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
