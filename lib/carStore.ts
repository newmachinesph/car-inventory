import type { Car } from "@/types/car";
import seedData from "@/data/cars.json";

const CARS_KEY = "ao_cars_v1";
const AUTH_KEY = "ao_admin_auth";

// ── Car CRUD ──────────────────────────────────────────────────────────────────

export function loadCars(): Car[] {
  if (typeof window === "undefined") return seedData as Car[];
  try {
    const stored = localStorage.getItem(CARS_KEY);
    return stored ? (JSON.parse(stored) as Car[]) : (seedData as Car[]);
  } catch {
    return seedData as Car[];
  }
}

export function saveCars(cars: Car[]): void {
  localStorage.setItem(CARS_KEY, JSON.stringify(cars));
}

export function addCar(car: Car): void {
  const cars = loadCars();
  saveCars([...cars, car]);
}

export function updateCar(id: string, updated: Car): void {
  const cars = loadCars();
  saveCars(cars.map((c) => (c.id === id ? updated : c)));
}

export function deleteCar(id: string): void {
  saveCars(loadCars().filter((c) => c.id !== id));
}

export function resetCars(): void {
  localStorage.removeItem(CARS_KEY);
}

// ── Auth ──────────────────────────────────────────────────────────────────────

// Demo-only client-side auth: set in .env.local (never commit real credentials).
const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function login(email: string, password: string): boolean {
  if (ADMIN_USER && ADMIN_PASS && email === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
