import Image from "next/image";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import type { Car } from "@/types/car";
import carsData from "@/data/cars.json";

const cars = carsData as Car[];
const featured = cars.filter((c) => c.isFeatured);
const newArrivals = cars.slice(0, 8);

const stats = [
  { label: "Vehicles in Stock", value: "200+" },
  { label: "Happy Customers", value: "5,000+" },
  { label: "Years in Business", value: "15+" },
  { label: "5-Star Reviews", value: "500+" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[520px] md:h-[600px] bg-navy-900 overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Alpine Overland hero"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-7xl mx-auto">
          <p className="text-gold-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Sandy, Utah&apos;s Premier Dealer
          </p>
          <h1 className="text-white font-black text-4xl md:text-6xl leading-tight mb-4 max-w-2xl">
            FIND YOUR<br />
            <span className="text-gold-500">DREAM CAR</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-lg mb-8">
            Specializing in premium trucks, SUVs, and overland-ready vehicles. Built for those who refuse to stay on the road.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-8 py-3.5 rounded text-sm transition-colors"
            >
              Browse Inventory
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded text-sm transition-colors backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map(({ label, value }) => (
            <div key={label} className="border-r border-navy-700 last:border-none">
              <div className="text-gold-500 font-black text-2xl">{value}</div>
              <div className="text-gray-400 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-1">
              Welcome to Alpine Overland
            </p>
            <h2 className="text-navy-900 font-black text-3xl">Featured Vehicles</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xl">
              Hand-picked by our team — the finest overland-ready trucks and SUVs in stock.
            </p>
          </div>
          <Link
            href="/inventory"
            className="text-gold-600 hover:text-gold-500 font-semibold text-sm whitespace-nowrap flex items-center gap-1"
          >
            View All Inventory →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-white font-black text-2xl md:text-3xl mb-2">
              Ready to Hit the Trail?
            </h2>
            <p className="text-navy-300 text-sm max-w-lg">
              Our experts will help you find the perfect overland vehicle for your next adventure. Apply online for financing or call us today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gold-500 text-navy-900 font-bold px-6 py-3 rounded hover:bg-gold-400 transition-colors text-sm"
            >
              Contact Us
            </Link>
            <a
              href="tel:3855550100"
              className="inline-flex items-center justify-center border-2 border-gold-500 text-gold-400 font-bold px-6 py-3 rounded hover:bg-gold-500/10 transition-colors text-sm"
            >
              Call 385-555-0100
            </a>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-1">
              Just In
            </p>
            <h2 className="text-navy-900 font-black text-3xl">New Arrivals</h2>
          </div>
          <Link href="/inventory" className="text-gold-600 hover:text-gold-500 font-semibold text-sm whitespace-nowrap">
            See All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivals.map((car) => (
            <CarCard key={car.id} car={car} compact />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-1">
              Why Alpine Overland
            </p>
            <h2 className="text-navy-900 font-black text-3xl">We Are Happy to Assist You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Quality Guarantee",
                desc: "Every vehicle undergoes a rigorous multi-point inspection before it reaches our lot.",
              },
              {
                iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Financing Options",
                desc: "Competitive rates and flexible terms. Apply online in minutes and get pre-qualified today.",
              },
              {
                iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                title: "Expert Team",
                desc: "Our staff are passionate overlanders who know these vehicles inside and out.",
              },
            ].map(({ iconPath, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-gold-200 transition-colors">
                <div className="w-12 h-12 bg-gold-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                  </svg>
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
