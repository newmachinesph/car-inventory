"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/carStore";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: "View Website",
    href: "/",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    external: true,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-60 bg-navy-900 flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-navy-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-navy-900 font-black text-sm">AO</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">Alpine Overland</div>
            <div className="text-gray-500 text-xs">Admin Portal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Menu</p>
        {navItems.map(({ label, href, icon, external }) => (
          <Link
            key={href}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              !external && isActive(href)
                ? "bg-gold-500 text-navy-900"
                : "text-gray-400 hover:bg-navy-800 hover:text-white"
            }`}
          >
            {icon}
            {label}
            {external && (
              <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </Link>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="px-3 py-4 border-t border-navy-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center shrink-0">
            <span className="text-gray-300 text-xs font-bold">AD</span>
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-medium truncate">Admin</div>
            <div className="text-gray-500 text-xs truncate">Administrator</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-navy-800 hover:text-red-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
