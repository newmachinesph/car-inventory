"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loadCars, deleteCar } from "@/lib/carStore";
import { carPath } from "@/lib/carUtils";
import type { Car } from "@/types/car";

const formatPrice = (p: number) =>
  p.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function AdminInventoryPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [condFilter, setCondFilter] = useState<"all" | "new" | "used">("all");
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);

  useEffect(() => { setCars(loadCars()); }, []);

  const filtered = cars.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.make.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q) ||
      c.trim.toLowerCase().includes(q) ||
      c.stock.toLowerCase().includes(q) ||
      String(c.year).includes(q);
    const matchCond = condFilter === "all" || c.condition === condFilter;
    return matchSearch && matchCond;
  });

  const confirmDelete = (car: Car) => setDeleteTarget(car);
  const executeDelete = () => {
    if (!deleteTarget) return;
    deleteCar(deleteTarget.id);
    setCars(loadCars());
    setDeleteTarget(null);
  };

  const stats = {
    total: cars.length,
    newCount: cars.filter((c) => c.condition === "new").length,
    usedCount: cars.filter((c) => c.condition === "used").length,
    featured: cars.filter((c) => c.isFeatured).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Vehicles", value: stats.total, color: "text-navy-700", bg: "bg-navy-50" },
          { label: "New", value: stats.newCount, color: "text-green-600", bg: "bg-green-50" },
          { label: "Used", value: stats.usedCount, color: "text-gray-600", bg: "bg-gray-100" },
          { label: "Featured", value: stats.featured, color: "text-gold-700", bg: "bg-gold-50" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-4 border border-white/50`}>
            <div className={`text-3xl font-black ${color}`}>{value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search make, model, stock…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          {/* Condition filter */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
            {(["all", "new", "used"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCondFilter(c)}
                className={`px-3 py-2 font-medium transition-colors capitalize ${condFilter === c ? "bg-gold-500 text-navy-900" : "text-gray-600 hover:bg-gray-50"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <Link
          href="/admin/inventory/new"
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Vehicle
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Vehicle</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Stock / VIN</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Condition</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Price</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Mileage</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Featured</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-400 text-sm">
                    No vehicles found.{" "}
                    <Link href="/admin/inventory/new" className="text-gold-600 hover:underline">Add one?</Link>
                  </td>
                </tr>
              ) : (
                filtered.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                    {/* Vehicle */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-10 rounded-md overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={car.images[0]}
                            alt={car.model}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-navy-900">
                            {car.year} {car.make} {car.model}
                          </div>
                          <div className="text-xs text-gray-500">{car.trim}</div>
                        </div>
                      </div>
                    </td>
                    {/* Stock */}
                    <td className="px-4 py-3">
                      <div className="font-mono text-xs text-gray-700">{car.stock}</div>
                      <div className="font-mono text-xs text-gray-400 truncate max-w-[120px]">{car.vin}</div>
                    </td>
                    {/* Condition */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded uppercase ${car.condition === "new" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {car.condition}
                      </span>
                    </td>
                    {/* Price */}
                    <td className="px-4 py-3 text-right font-semibold text-navy-900">
                      {formatPrice(car.price)}
                    </td>
                    {/* Mileage */}
                    <td className="px-4 py-3 text-right text-gray-600">
                      {car.mileage.toLocaleString()} mi
                    </td>
                    {/* Featured */}
                    <td className="px-4 py-3 text-center">
                      {car.isFeatured ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-gold-100 rounded-full">
                          <svg className="w-3 h-3 text-gold-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={carPath(car)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on site"
                          className="p-1.5 text-gray-400 hover:text-navy-600 hover:bg-navy-50 rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <Link
                          href={`/admin/inventory/${car.id}/edit`}
                          title="Edit"
                          className="p-1.5 text-gray-400 hover:text-gold-600 hover:bg-gold-50 rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => confirmDelete(car)}
                          title="Delete"
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {cars.length} vehicles
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-navy-900 text-center mb-1">Delete Vehicle?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              <strong>{deleteTarget.year} {deleteTarget.make} {deleteTarget.model}</strong> ({deleteTarget.stock}) will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
