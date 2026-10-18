export const toSlug = (str: string) =>
  str.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "");

export const toStockSlug = (stock: string) =>
  stock.toLowerCase().replace(/[^a-z0-9]/g, "");

export function carPath(car: { make: string; model: string; stock: string }) {
  return `/inventory/${toSlug(car.make)}/${toSlug(car.model)}/${toStockSlug(car.stock)}`;
}
