"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  FileText,
  GalleryHorizontal,
  GraduationCap,
  HelpCircle,
  Home,
  Inbox,
  LogOut,
  Menu,
  PanelBottom,
  Settings,
  Shield,
  Timer,
  UsersRound,
  X,
} from "lucide-react";

const baseItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/settings", label: "Website Settings", icon: Settings },
  { href: "/admin/pages", label: "Pages Manager", icon: FileText },
  { href: "/admin/programmes", label: "Programmes", icon: GraduationCap },
  { href: "/admin/news", label: "News & Events", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontal },
  { href: "/admin/faculty", label: "Faculty", icon: UsersRound },
  { href: "/admin/admissions", label: "Admissions", icon: Inbox },
  { href: "/admin/navigation", label: "Navigation", icon: PanelBottom },
  { href: "/admin/footer", label: "Footer", icon: PanelBottom },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/student-portal", label: "Student Portal", icon: Timer },
];

const superAdminItems = [
  { href: "/admin/manage-admins", label: "Manage Admins", icon: Shield },
];

interface SessionUser {
  name?: string;
  email?: string;
  role?: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  // Fetch current session user info
  useEffect(() => {
    fetch("/api/admin/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user ?? null))
      .catch(() => null);
  }, []);

  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const navItems = isSuperAdmin
    ? [...baseItems, ...superAdminItems]
    : baseItems;

  function isItemActive(href: string) {
    const hrefPath = href.split("?")[0];
    return (
      pathname === hrefPath ||
      (hrefPath !== "/admin" && pathname.startsWith(`${hrefPath}/`))
    );
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function NavItem({
    href,
    label,
    icon: Icon,
    onClick,
  }: {
    href: string;
    label: string;
    icon: React.ElementType;
    onClick?: () => void;
  }) {
    const active = isItemActive(href);
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`mb-0.5 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all duration-150 hover:bg-slate-100 ${
          active
            ? "bg-[#320056]/8 font-bold text-[#320056]"
            : "font-medium text-slate-500"
        }`}
      >
        <Icon size={16} className={active ? "text-[#320056]" : "text-slate-400"} />
        <span>{label}</span>
      </Link>
    );
  }

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      <div className="mb-6 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#320056] text-white">
            <Shield size={17} />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-[#320056]">
              Admin Console
            </h1>
            <p className="text-[11px] font-medium text-slate-400">
              Ekinrin-Adde Nursing
            </p>
          </div>
        </div>

        {user && (
          <div className="mt-4 rounded-xl bg-[#320056]/5 px-3 py-2.5">
            <p className="text-xs font-black text-[#320056]">{user.name}</p>
            <p className="text-[11px] text-slate-400">{user.email}</p>
            {isSuperAdmin && (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#320056] px-2 py-0.5 text-[10px] font-black text-white">
                <Shield size={9} />
                Super Admin
              </span>
            )}
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        {navItems.map(({ href, label, icon }) => (
          <NavItem
            key={href}
            href={href}
            label={label}
            icon={icon}
            onClick={onItemClick}
          />
        ))}
      </nav>

      <div className="border-t border-slate-200/70 px-3 pb-4 pt-3">
        <a
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100"
          href="#"
        >
          <HelpCircle size={16} className="text-slate-400" />
          <span>Support</span>
        </a>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-100"
        >
          <LogOut size={16} className="text-slate-400" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-200/70 bg-white py-6 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <header className="fixed left-0 top-0 z-40 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#320056]">
            <Shield size={15} className="text-white" />
          </div>
          <span className="text-sm font-black text-[#320056]">
            Admin Console
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[#320056]"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[85%] max-w-sm flex-col border-l border-slate-200 bg-white py-5 text-sm shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-2 flex items-center justify-between px-5">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Navigation
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
          >
            <X size={17} />
          </button>
        </div>
        <SidebarContent onItemClick={() => setOpen(false)} />
      </aside>
    </>
  );
}
