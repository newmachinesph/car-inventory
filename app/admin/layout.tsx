"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { isAuthenticated } from "@/lib/carStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoginPage) {
      setReady(true);
      return;
    }
    if (!isAuthenticated()) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [isLoginPage, router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-navy-900">Admin</span>
            {pathname !== "/admin" && (
              <>
                <span className="mx-1.5 text-gray-300">/</span>
                <span className="capitalize">{pathname.split("/").pop()?.replace(/-/g, " ")}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Live — static mode
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
