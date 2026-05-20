"use client";

import {usePathname} from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

const authRoutes = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];

export default function AdminShell({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />
      <main className="min-h-screen lg:ml-64">{children}</main>
    </div>
  );
}
