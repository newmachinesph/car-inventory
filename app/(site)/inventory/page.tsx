"use client";

import { useState, useMemo } from "react";
import CarCard from "@/components/CarCard";
import type { Car } from "@/types/car";
import carsData from "@/data/cars.json";

const cars = carsData as Car[];

const allYears = [...new Set(cars.map((c) => c.year))].sort((a, b) => b - a);
const allMakes = [...new Set(cars.map((c) => c.make))].sort();
const allModels = [...new Set(cars.map((c) => c.model))].sort();
const allBodyStyles = [...new Set(cars.map((c) => c.bodyStyle))].sort();
const allDrivetrains = [...new Set(cars.map((c) => c.drivetrain))].sort();
const allTransmissions = [...new Set(cars.map((c) => c.transmission))].sort();
const allExtColors = [...new Set(cars.map((c) => c.exteriorColor))].sort();
const allIntColors = [...new Set(cars.map((c) => c.interiorColor))].sort();
const allEquipment = [...new Set(cars.flatMap((c) => c.features))].sort();

const minPrice = Math.min(...cars.map((c) => c.price));
const maxPrice = Math.max(...cars.map((c) => c.price));
const minMileage = Math.min(...cars.map((c) => c.mileage));
const maxMileage = Math.max(...cars.map((c) => c.mileage));

type SortOption = "price-asc" | "price-desc" | "year-desc" | "mileage-asc";

// ── Filter accordion section ──────────────────────────────────────────────────

interface FilterSectionProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  count?: number;
}

function FilterSection({ label, icon, open, onToggle, children, count }: FilterSectionProps) {
  return (
    <div className="border-b border-gray-100 last:border-none">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="text-gold-500 shrink-0">{icon}</span>
        <span className="flex-1 text-sm font-medium text-gray-800">{label}</span>
        {count ? (
          <span className="text-xs bg-gold-500 text-navy-900 font-bold rounded-full w-5 h-5 flex items-center justify-center mr-1 shrink-0">
            {count}
          </span>
        ) : null}
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-3 max-h-52 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
}

function CheckList({
  items,
  selected,
  onToggle,
}: {
  items: (string | number)[];
  selected: (string | number)[];
  onToggle: (v: string | number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 pt-1">
      {items.map((item) => (
        <label key={item} className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(item)}
            onChange={() => onToggle(item)}
            className="w-3.5 h-3.5"
          />
          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-none">
            {item}
          </span>
        </label>
      ))}
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const icons: Record<string, React.ReactNode> = {
  year: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  make: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  model: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h1l3-3h10l3 3h1a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  ),
  bodyType: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M19 17H5M3 17l2-6h14l2 6M7 11l2-4h6l2 4" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
    </svg>
  ),
  price: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  drivetrain: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <polyline points="8.59 13.51 15.42 17.49" />
      <polyline points="15.41 6.51 8.59 10.49" />
    </svg>
  ),
  transmission: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <line x1="4" y1="5" x2="4" y2="19" />
      <line x1="20" y1="5" x2="20" y2="19" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="4" cy="5" r="2" />
      <circle cx="4" cy="19" r="2" />
      <circle cx="20" cy="5" r="2" />
      <circle cx="20" cy="12" r="2" />
      <circle cx="20" cy="19" r="2" />
    </svg>
  ),
  mileage: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
      <path d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  exteriorColor: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.836-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      <circle cx="6.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  interiorColor: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-3.12 3.12-1.41-1.42-1.42 1.42 1.41 1.41-6.6 6.6A2 2 0 005 16v3h3a2 2 0 001.42-.59l6.6-6.6 1.41 1.42 1.42-1.42-1.42-1.41 3.12-3.12a1 1 0 000-1.65z" />
    </svg>
  ),
  equipment: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

// ── Main page ─────────────────────────────────────────────────────────────────

export default function InventoryPage() {
  // filter state
  const [selYears, setSelYears] = useState<number[]>([]);
  const [selMakes, setSelMakes] = useState<string[]>([]);
  const [selModels, setSelModels] = useState<string[]>([]);
  const [selBodies, setSelBodies] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [selDrivetrains, setSelDrivetrains] = useState<string[]>([]);
  const [selTransmissions, setSelTransmissions] = useState<string[]>([]);
  const [mileageMax, setMileageMax] = useState(maxMileage);
  const [selExtColors, setSelExtColors] = useState<string[]>([]);
  const [selIntColors, setSelIntColors] = useState<string[]>([]);
  const [selEquipment, setSelEquipment] = useState<string[]>([]);

  // accordion open state
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["year", "make", "bodyType", "price"]));
  const toggleSection = (id: string) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // sort + mobile sidebar
  const [sortBy, setSortBy] = useState<SortOption>("year-desc");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // generic multi-toggle helper
  const toggle = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, val: T) =>
    setter((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);

  const filtered = useMemo(() => {
    let result = cars.filter((c) => {
      if (selYears.length && !selYears.includes(c.year)) return false;
      if (selMakes.length && !selMakes.includes(c.make)) return false;
      if (selModels.length && !selModels.includes(c.model)) return false;
      if (selBodies.length && !selBodies.includes(c.bodyStyle)) return false;
      if (c.price < priceRange[0] || c.price > priceRange[1]) return false;
      if (selDrivetrains.length && !selDrivetrains.includes(c.drivetrain)) return false;
      if (selTransmissions.length && !selTransmissions.includes(c.transmission)) return false;
      if (c.mileage > mileageMax) return false;
      if (selExtColors.length && !selExtColors.includes(c.exteriorColor)) return false;
      if (selIntColors.length && !selIntColors.includes(c.interiorColor)) return false;
      if (selEquipment.length && !selEquipment.every((eq) => c.features.includes(eq))) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-desc": result = [...result].sort((a, b) => b.price - a.price); break;
      case "year-desc": result = [...result].sort((a, b) => b.year - a.year); break;
      case "mileage-asc": result = [...result].sort((a, b) => a.mileage - b.mileage); break;
    }
    return result;
  }, [selYears, selMakes, selModels, selBodies, priceRange, selDrivetrains, selTransmissions, mileageMax, selExtColors, selIntColors, selEquipment, sortBy]);

  const activeCount =
    selYears.length + selMakes.length + selModels.length + selBodies.length +
    selDrivetrains.length + selTransmissions.length + selExtColors.length +
    selIntColors.length + selEquipment.length +
    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0) +
    (mileageMax !== maxMileage ? 1 : 0);

  const clearFilters = () => {
    setSelYears([]); setSelMakes([]); setSelModels([]); setSelBodies([]);
    setPriceRange([minPrice, maxPrice]);
    setSelDrivetrains([]); setSelTransmissions([]);
    setMileageMax(maxMileage);
    setSelExtColors([]); setSelIntColors([]); setSelEquipment([]);
  };

  const FilterPanel = () => (
    <div>
      {/* Heading */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="flex flex-col gap-1">
          <span className="block w-5 h-0.5 bg-gold-500 rounded" />
          <span className="block w-3 h-0.5 bg-gold-500 rounded" />
        </div>
        <span className="font-bold text-navy-900 text-base">Filters</span>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="ml-auto text-xs text-red-500 hover:underline">
            Clear all
          </button>
        )}
      </div>

      {/* Accordion card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <FilterSection id="year" label="Year" icon={icons.year}
          open={openSections.has("year")} onToggle={() => toggleSection("year")}
          count={selYears.length}>
          <CheckList items={allYears} selected={selYears} onToggle={(v) => toggle(setSelYears, v as number)} />
        </FilterSection>

        <FilterSection id="make" label="Make" icon={icons.make}
          open={openSections.has("make")} onToggle={() => toggleSection("make")}
          count={selMakes.length}>
          <CheckList items={allMakes} selected={selMakes} onToggle={(v) => toggle(setSelMakes, v as string)} />
        </FilterSection>

        <FilterSection id="model" label="Model" icon={icons.model}
          open={openSections.has("model")} onToggle={() => toggleSection("model")}
          count={selModels.length}>
          <CheckList items={allModels} selected={selModels} onToggle={(v) => toggle(setSelModels, v as string)} />
        </FilterSection>

        <FilterSection id="bodyType" label="Body Type" icon={icons.bodyType}
          open={openSections.has("bodyType")} onToggle={() => toggleSection("bodyType")}
          count={selBodies.length}>
          <CheckList items={allBodyStyles} selected={selBodies} onToggle={(v) => toggle(setSelBodies, v as string)} />
        </FilterSection>

        <FilterSection id="price" label="Price" icon={icons.price}
          open={openSections.has("price")} onToggle={() => toggleSection("price")}
          count={priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0}>
          <div className="pt-2 space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-400 mb-1 block">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  min={minPrice}
                  max={priceRange[1]}
                  step={1000}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-400 mb-1 block">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  min={priceRange[0]}
                  max={maxPrice}
                  step={1000}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
            </div>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>${priceRange[0].toLocaleString()}</span>
              <span className="font-semibold text-gold-600">${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection id="drivetrain" label="Drivetrain" icon={icons.drivetrain}
          open={openSections.has("drivetrain")} onToggle={() => toggleSection("drivetrain")}
          count={selDrivetrains.length}>
          <CheckList items={allDrivetrains} selected={selDrivetrains} onToggle={(v) => toggle(setSelDrivetrains, v as string)} />
        </FilterSection>

        <FilterSection id="transmission" label="Transmission" icon={icons.transmission}
          open={openSections.has("transmission")} onToggle={() => toggleSection("transmission")}
          count={selTransmissions.length}>
          <CheckList items={allTransmissions} selected={selTransmissions} onToggle={(v) => toggle(setSelTransmissions, v as string)} />
        </FilterSection>

        <FilterSection id="mileage" label="Mileage" icon={icons.mileage}
          open={openSections.has("mileage")} onToggle={() => toggleSection("mileage")}
          count={mileageMax !== maxMileage ? 1 : 0}>
          <div className="pt-2 space-y-2">
            <input
              type="range"
              min={minMileage}
              max={maxMileage}
              step={1000}
              value={mileageMax}
              onChange={(e) => setMileageMax(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{minMileage.toLocaleString()} mi</span>
              <span className="font-semibold text-gold-600">Up to {mileageMax.toLocaleString()} mi</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection id="extColor" label="Exterior Color" icon={icons.exteriorColor}
          open={openSections.has("extColor")} onToggle={() => toggleSection("extColor")}
          count={selExtColors.length}>
          <CheckList items={allExtColors} selected={selExtColors} onToggle={(v) => toggle(setSelExtColors, v as string)} />
        </FilterSection>

        <FilterSection id="intColor" label="Interior Color" icon={icons.interiorColor}
          open={openSections.has("intColor")} onToggle={() => toggleSection("intColor")}
          count={selIntColors.length}>
          <CheckList items={allIntColors} selected={selIntColors} onToggle={(v) => toggle(setSelIntColors, v as string)} />
        </FilterSection>

        <FilterSection id="equipment" label="Equipment" icon={icons.equipment}
          open={openSections.has("equipment")} onToggle={() => toggleSection("equipment")}
          count={selEquipment.length}>
          <CheckList items={allEquipment} selected={selEquipment} onToggle={(v) => toggle(setSelEquipment, v as string)} />
        </FilterSection>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-black text-navy-900">Vehicle Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">High quality pre-owned inventory in Sandy, UT</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterPanel />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filters
                {activeCount > 0 && (
                  <span className="bg-gold-500 text-navy-900 font-bold text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </button>
              <span className="text-sm text-gray-500">
                <strong className="text-navy-900">{filtered.length}</strong> vehicles found
              </span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <option value="year-desc">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="mileage-asc">Lowest Mileage</option>
              </select>
            </div>
          </div>

          {/* Mobile filter drawer */}
          {sidebarOpen && (
            <div className="lg:hidden mb-4">
              <FilterPanel />
            </div>
          )}

          {/* Active filter chips */}
          {activeCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selYears.map((y) => (
                <button key={y} onClick={() => toggle(setSelYears, y)} className="text-xs bg-gold-50 text-gold-700 border border-gold-200 px-2.5 py-1 rounded-full hover:bg-gold-100">
                  {y} ×
                </button>
              ))}
              {selMakes.map((m) => (
                <button key={m} onClick={() => toggle(setSelMakes, m)} className="text-xs bg-gold-50 text-gold-700 border border-gold-200 px-2.5 py-1 rounded-full hover:bg-gold-100">
                  {m} ×
                </button>
              ))}
              {selModels.map((m) => (
                <button key={m} onClick={() => toggle(setSelModels, m)} className="text-xs bg-gold-50 text-gold-700 border border-gold-200 px-2.5 py-1 rounded-full hover:bg-gold-100">
                  {m} ×
                </button>
              ))}
              {selBodies.map((b) => (
                <button key={b} onClick={() => toggle(setSelBodies, b)} className="text-xs bg-gold-50 text-gold-700 border border-gold-200 px-2.5 py-1 rounded-full hover:bg-gold-100">
                  {b} ×
                </button>
              ))}
              {selDrivetrains.map((d) => (
                <button key={d} onClick={() => toggle(setSelDrivetrains, d)} className="text-xs bg-gold-50 text-gold-700 border border-gold-200 px-2.5 py-1 rounded-full hover:bg-gold-100">
                  {d} ×
                </button>
              ))}
              {selTransmissions.map((t) => (
                <button key={t} onClick={() => toggle(setSelTransmissions, t)} className="text-xs bg-gold-50 text-gold-700 border border-gold-200 px-2.5 py-1 rounded-full hover:bg-gold-100">
                  {t} ×
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 py-20 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 font-medium">No vehicles match your filters.</p>
              <button onClick={clearFilters} className="mt-3 text-gold-600 text-sm font-semibold hover:underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
