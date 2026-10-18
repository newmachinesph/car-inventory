# Car Inventory

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)

A used-car dealership website built with Next.js, using the fictional "Alpine Overland" dealership as sample content. It has a public inventory with filtering and vehicle detail pages, about and contact pages, and a simple admin area for adding, editing and deleting vehicles. Inventory is seeded from `data/cars.json` and edits are kept in the browser's `localStorage`.

## Getting started

```bash
npm install
cp .env.example .env.local   # set admin email and password for the demo admin login
npm run dev
```

Open http://localhost:3000. The admin area is at `/admin/login`. Admin auth is a client-side demo only and is not secure; do not use it in production.

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Structure

```
app/(site)/   public pages: home, inventory, vehicle detail, about, contact
app/admin/    admin login, dashboard, inventory CRUD
components/   shared UI (Navbar, Footer, CarCard, admin forms)
lib/          inventory store (localStorage) and helpers
data/         seed inventory (cars.json)
```

## License

MIT, see [LICENSE](LICENSE).
