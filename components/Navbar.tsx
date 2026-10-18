"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "About",     href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full z-50 sticky top-0 shadow-sm">
      {/* Utility bar */}
      <div className="bg-navy-900 text-gray-400 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gold-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>18975 S State Street, Sandy, UT 84010</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gold-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <a href="tel:3855550100" className="hover:text-gold-400 transition-colors">385-555-0100</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 bg-navy-900 rounded-lg flex items-center justify-center">
                <span className="text-gold-500 font-black text-sm tracking-tight">AO</span>
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-navy-900 font-black text-base tracking-tight" style={{ fontFamily: "var(--font-raleway)" }}>ALPINE</div>
                <div className="text-gold-500 text-[10px] tracking-[0.25em] font-semibold uppercase">OVERLAND</div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    pathname === href
                      ? "text-gold-600 bg-gold-50"
                      : "text-navy-800 hover:text-gold-600 hover:bg-gold-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Contact
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 rounded-lg text-navy-700 hover:bg-navy-50 transition-colors"
                aria-label="Toggle menu"
              >
                {open ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === href
                    ? "text-gold-600 bg-gold-50"
                    : "text-navy-800 hover:text-gold-600 hover:bg-gold-50"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 bg-gold-500 text-navy-900 font-bold px-4 py-2.5 rounded-lg text-sm text-center hover:bg-gold-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
