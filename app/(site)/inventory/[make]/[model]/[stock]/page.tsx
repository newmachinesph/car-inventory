"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import type { Car } from "@/types/car";
import carsData from "@/data/cars.json";
import { toSlug, toStockSlug, carPath } from "@/lib/carUtils";
import { notFound } from "next/navigation";

const allCars = carsData as Car[];

const formatPrice = (p: number) =>
  p.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const specRows = [
  { key: "mileage" as const,      label: "Mileage",       fmt: (v: number) => `${v.toLocaleString()} mi` },
  { key: "stock" as const,        label: "Stock #",        fmt: (v: string) => v },
  { key: "fuelType" as const,     label: "Fuel Type",      fmt: (v: string) => v },
  { key: "transmission" as const, label: "Transmission",   fmt: (v: string) => v },
  { key: "exteriorColor" as const,label: "Ext. Color",     fmt: (v: string) => v },
  { key: "interiorColor" as const,label: "Int. Color",     fmt: (v: string) => v },
  { key: "drivetrain" as const,   label: "Drivetrain",     fmt: (v: string) => v },
  { key: "engine" as const,       label: "Engine",         fmt: (v: string) => v },
];

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ make: string; model: string; stock: string }>;
}) {
  const { make, model, stock } = use(params);

  const car = allCars.find(
    (c) =>
      toSlug(c.make) === make &&
      toSlug(c.model) === model &&
      toStockSlug(c.stock) === stock
  );

  if (!car) notFound();

  const similar = allCars
    .filter((c) => c.id !== car.id && (c.make === car.make || c.bodyStyle === car.bodyStyle))
    .slice(0, 4);

  const galleryImages = car.images.slice(1);
  const [activeImg, setActiveImg] = useState(0);
  const [featOpen, setFeatOpen] = useState(true);
  const [descOpen, setDescOpen] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const monthly = Math.round(
    (car.price * 0.9 * (0.069 / 12)) / (1 - Math.pow(1 + 0.069 / 12, -72))
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/inventory" className="hover:text-gold-500 transition-colors">Inventory</Link>
          <span>/</span>
          <Link href={`/inventory?make=${car.make}`} className="hover:text-gold-500 transition-colors">{car.make}</Link>
          <span>/</span>
          <span className="text-navy-900 font-medium">{car.year} {car.make} {car.model}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Title row */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-black text-navy-900">
            {car.year} {car.make} {car.model} {car.trim}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${car.condition === "new" ? "bg-navy-700 text-gold-400" : "bg-gray-700 text-white"}`}>
              {car.condition}
            </span>
            <span className="text-xs text-gray-500">Stock: {car.stock}</span>
            <span className="text-xs text-gray-500">VIN: {car.vin}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: images + details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main image */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-gray-200">
              <Image
                src={galleryImages[activeImg]}
                alt={`${car.year} ${car.make} ${car.model} — image ${activeImg + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative flex-none w-20 h-14 rounded overflow-hidden border-2 transition-colors ${activeImg === i ? "border-gold-500" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>

            {/* Key specs */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-navy-900">Key Features</h2>
                <span className="text-xs bg-gold-50 text-gold-700 px-2 py-0.5 rounded font-medium">
                  {car.bodyStyle} · {car.drivetrain}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {specRows.map(({ key, label, fmt }) => (
                  <div key={key} className="text-center border border-gray-100 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">{label}</div>
                    <div className="text-sm font-semibold text-navy-900 leading-snug">
                      {fmt(car[key] as never)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment (collapsible) */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setFeatOpen(!featOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50"
              >
                <h2 className="font-bold text-navy-900">Vehicle Equipment</h2>
                <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${featOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {featOpen && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-4">
                    {car.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Description (collapsible) */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setDescOpen(!descOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50"
              >
                <h2 className="font-bold text-navy-900">Vehicle Description</h2>
                <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${descOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {descOpen && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed mt-4">{car.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: price + actions + form */}
          <div className="flex flex-col gap-4">
            {/* Price */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="text-3xl font-black text-navy-900 mb-1">{formatPrice(car.price)}</div>
              {car.condition === "used" && (
                <p className="text-xs text-gray-500 mb-1">{car.mileage.toLocaleString()} miles · {car.year}</p>
              )}
              <div className="flex flex-col gap-2 mt-4">
                <a
                  href="tel:3855550100"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 rounded text-sm text-center transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  Call 385-555-0100
                </a>
                <Link
                  href="/contact"
                  className="w-full border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-bold py-3 rounded text-sm text-center transition-colors"
                >
                  Schedule Test Drive
                </Link>
              </div>
            </div>

            {/* Finance estimator */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 mb-3 text-sm">Finance Estimator</h3>
              <div className="space-y-2">
                {[
                  ["Vehicle Price", formatPrice(car.price)],
                  ["Est. Down (10%)", formatPrice(car.price * 0.1)],
                  ["Loan Amount", formatPrice(car.price * 0.9)],
                  ["Term", "72 months"],
                  ["Rate (est.)", "6.9% APR"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium text-navy-900">{value}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-2 flex justify-between">
                  <span className="text-sm font-bold text-navy-900">Est. Payment</span>
                  <span className="font-black text-gold-600">{formatPrice(monthly)}/mo</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">Estimate only. Actual rates depend on credit approval.</p>
              <Link href="/contact" className="mt-3 block w-full text-center text-sm text-gold-600 font-semibold border border-gold-200 rounded py-2 hover:bg-gold-50 transition-colors">
                Apply for Financing
              </Link>
            </div>

            {/* Quick contact */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 mb-3 text-sm">Request More Info</h3>
              {submitted ? (
                <div className="py-4 text-center">
                  <svg className="w-10 h-10 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600 font-medium">Message sent! We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-2.5">
                  {[
                    { key: "name" as const, type: "text", placeholder: "Your Name" },
                    { key: "email" as const, type: "email", placeholder: "Email Address" },
                    { key: "phone" as const, type: "tel", placeholder: "Phone Number" },
                  ].map(({ key, type, placeholder }) => (
                    <input
                      key={key}
                      required={key !== "phone"}
                      type={type}
                      placeholder={placeholder}
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  ))}
                  <textarea
                    rows={3}
                    placeholder={`I'm interested in the ${car.year} ${car.make} ${car.model}...`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                  />
                  <button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-2.5 rounded text-sm transition-colors">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Dealer info */}
            <div className="bg-navy-900 rounded-lg p-4 text-sm text-gray-400 space-y-1">
              <div className="text-white font-bold mb-1">Alpine Overland</div>
              <p>18975 S State Street, Sandy, UT 84010</p>
              <p><a href="tel:3855550100" className="text-gold-400 hover:text-gold-300">385-555-0100</a></p>
              <p>Mon–Fri: 9 AM – 6 PM · Sat: 10 AM – 5 PM</p>
            </div>
          </div>
        </div>

        {/* Similar vehicles */}
        {similar.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-navy-900">Similar Vehicles</h2>
              <Link href="/inventory" className="text-gold-600 hover:text-gold-500 font-semibold text-sm">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((c) => (
                <CarCard key={c.id} car={c} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
