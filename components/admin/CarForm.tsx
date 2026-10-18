"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Car } from "@/types/car";

interface CarFormProps {
  initial?: Car;
  onSubmit: (car: Car) => void;
  title: string;
}

const emptyForm: Omit<Car, "id"> = {
  year: new Date().getFullYear(),
  make: "",
  model: "",
  trim: "",
  price: 0,
  mileage: 0,
  vin: "",
  stock: "",
  condition: "used",
  bodyStyle: "SUV",
  fuelType: "Gasoline",
  engine: "",
  transmission: "Automatic",
  drivetrain: "4WD",
  exteriorColor: "",
  interiorColor: "",
  mpg: { city: 0, highway: 0 },
  images: [],
  features: [],
  description: "",
  isFeatured: false,
};

type FieldKey = keyof Omit<Car, "id" | "mpg" | "images" | "features">;

const input =
  "w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white";
const label = "block text-xs font-semibold text-gray-600 mb-1";
const section = "bg-white rounded-xl border border-gray-200 p-5";

export default function CarForm({ initial, onSubmit, title }: CarFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Car, "id">>(
    initial ? { ...initial } : { ...emptyForm }
  );
  const [imagesText, setImagesText] = useState(
    (initial?.images ?? []).join("\n")
  );
  const [featuresText, setFeaturesText] = useState(
    (initial?.features ?? []).join("\n")
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const set = <K extends FieldKey>(k: K, v: Car[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.make.trim()) e.make = "Required";
    if (!form.model.trim()) e.model = "Required";
    if (!form.stock.trim()) e.stock = "Required";
    if (!form.vin.trim()) e.vin = "Required";
    if (form.price <= 0) e.price = "Must be > 0";
    if (!imagesText.trim()) e.images = "At least one image URL required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    const images = imagesText.split("\n").map((s) => s.trim()).filter(Boolean);
    const features = featuresText.split("\n").map((s) => s.trim()).filter(Boolean);
    const id = initial?.id ?? `ao-${Date.now()}`;
    onSubmit({ id, ...form, images, features });
    router.push("/admin/inventory");
  };

  const err = (k: string) =>
    errors[k] ? <p className="text-xs text-red-500 mt-0.5">{errors[k]}</p> : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-navy-900">{title}</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/inventory")}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-navy-900 font-bold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            Save Vehicle
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className={section}>
        <h2 className="font-bold text-gray-800 mb-4">Basic Information</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={label}>Year *</label>
            <input type="number" min={1900} max={2030} value={form.year}
              onChange={(e) => set("year", Number(e.target.value))}
              className={input} />
          </div>
          <div>
            <label className={label}>Make *</label>
            <input type="text" value={form.make}
              onChange={(e) => set("make", e.target.value)}
              placeholder="Toyota" className={input} />
            {err("make")}
          </div>
          <div>
            <label className={label}>Model *</label>
            <input type="text" value={form.model}
              onChange={(e) => set("model", e.target.value)}
              placeholder="Land Cruiser" className={input} />
            {err("model")}
          </div>
          <div>
            <label className={label}>Trim</label>
            <input type="text" value={form.trim}
              onChange={(e) => set("trim", e.target.value)}
              placeholder="TRD Pro" className={input} />
          </div>
          <div>
            <label className={label}>Condition *</label>
            <select value={form.condition}
              onChange={(e) => set("condition", e.target.value as "new" | "used")}
              className={input}>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div>
            <label className={label}>Body Style *</label>
            <select value={form.bodyStyle}
              onChange={(e) => set("bodyStyle", e.target.value)}
              className={input}>
              {["SUV", "Pickup", "Wagon", "Sedan", "Coupe", "Van"].map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Powertrain */}
      <div className={section}>
        <h2 className="font-bold text-gray-800 mb-4">Powertrain</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className={label}>Engine</label>
            <input type="text" value={form.engine}
              onChange={(e) => set("engine", e.target.value)}
              placeholder="3.4L Twin-Turbo V6" className={input} />
          </div>
          <div>
            <label className={label}>Fuel Type</label>
            <select value={form.fuelType}
              onChange={(e) => set("fuelType", e.target.value)}
              className={input}>
              {["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"].map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Transmission</label>
            <select value={form.transmission}
              onChange={(e) => set("transmission", e.target.value)}
              className={input}>
              {["Automatic", "Manual", "CVT", "DCT", "Single-Speed Direct Drive"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Drivetrain</label>
            <select value={form.drivetrain}
              onChange={(e) => set("drivetrain", e.target.value)}
              className={input}>
              {["4WD", "AWD", "RWD", "FWD"].map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={label}>MPG City</label>
              <input type="number" min={0} value={form.mpg.city}
                onChange={(e) => setForm((p) => ({ ...p, mpg: { ...p.mpg, city: Number(e.target.value) } }))}
                className={input} />
            </div>
            <div>
              <label className={label}>MPG Hwy</label>
              <input type="number" min={0} value={form.mpg.highway}
                onChange={(e) => setForm((p) => ({ ...p, mpg: { ...p.mpg, highway: Number(e.target.value) } }))}
                className={input} />
            </div>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className={section}>
        <h2 className="font-bold text-gray-800 mb-4">Appearance</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Exterior Color</label>
            <input type="text" value={form.exteriorColor}
              onChange={(e) => set("exteriorColor", e.target.value)}
              placeholder="Nori Green Pearl" className={input} />
          </div>
          <div>
            <label className={label}>Interior Color</label>
            <input type="text" value={form.interiorColor}
              onChange={(e) => set("interiorColor", e.target.value)}
              placeholder="Black" className={input} />
          </div>
        </div>
      </div>

      {/* Pricing & IDs */}
      <div className={section}>
        <h2 className="font-bold text-gray-800 mb-4">Pricing &amp; Identification</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className={label}>Price ($) *</label>
            <input type="number" min={0} value={form.price}
              onChange={(e) => set("price", Number(e.target.value))}
              className={input} />
            {err("price")}
          </div>
          <div>
            <label className={label}>Mileage</label>
            <input type="number" min={0} value={form.mileage}
              onChange={(e) => set("mileage", Number(e.target.value))}
              className={input} />
          </div>
          <div>
            <label className={label}>Stock # *</label>
            <input type="text" value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              placeholder="AO-5823" className={input} />
            {err("stock")}
          </div>
          <div>
            <label className={label}>VIN *</label>
            <input type="text" value={form.vin}
              onChange={(e) => set("vin", e.target.value)}
              placeholder="JTJAM7BX9P5012345" className={input} />
            {err("vin")}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className={section}>
        <h2 className="font-bold text-gray-800 mb-1">Images *</h2>
        <p className="text-xs text-gray-400 mb-3">One image URL per line. First image is the main photo.</p>
        <textarea
          rows={5}
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
          placeholder={"https://picsum.photos/seed/car1/900/600\nhttps://picsum.photos/seed/car2/900/600"}
          className={`${input} font-mono resize-none`}
        />
        {err("images")}
      </div>

      {/* Features */}
      <div className={section}>
        <h2 className="font-bold text-gray-800 mb-1">Equipment / Features</h2>
        <p className="text-xs text-gray-400 mb-3">One feature per line.</p>
        <textarea
          rows={6}
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder={"Apple CarPlay / Android Auto\nHeated Front Seats\nPanoramic Sunroof"}
          className={`${input} resize-none`}
        />
      </div>

      {/* Description */}
      <div className={section}>
        <h2 className="font-bold text-gray-800 mb-3">Vehicle Description</h2>
        <textarea
          rows={5}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Write a detailed description of the vehicle…"
          className={`${input} resize-none`}
        />
      </div>

      {/* Settings */}
      <div className={section}>
        <h2 className="font-bold text-gray-800 mb-3">Settings</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => set("isFeatured", e.target.checked)}
            className="w-4 h-4"
          />
          <div>
            <div className="text-sm font-medium text-gray-800">Featured Vehicle</div>
            <div className="text-xs text-gray-400">Show on homepage featured section</div>
          </div>
        </label>
      </div>

      {/* Bottom save */}
      <div className="flex justify-end gap-3 pb-6">
        <button
          type="button"
          onClick={() => router.push("/admin/inventory")}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-navy-900 font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
        >
          {saving ? "Saving…" : "Save Vehicle"}
        </button>
      </div>
    </form>
  );
}
