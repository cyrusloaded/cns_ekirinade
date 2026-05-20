// "use client";

// import Link from "next/link";
// import {usePathname, useRouter} from "next/navigation";
// import {
//   CalendarDays,
//   FileText,
//   GalleryHorizontal,
//   GraduationCap,
//   HelpCircle,
//   Home,
//   Inbox,
//   LogOut,
//   PanelBottom,
//   Settings,
//   Timer,
//   UsersRound,
// } from "lucide-react";

// const items = [
//   {href: "/admin", label: "Dashboard", icon: Home},
//   {href: "/admin/settings", label: "Website Settings", icon: Settings},
//   {href: "/admin/pages", label: "Pages Manager", icon: FileText},
//   {href: "/admin/programmes", label: "Programmes Manager", icon: GraduationCap},
//   {href: "/admin/news", label: "News & Events", icon: CalendarDays},
//   {href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontal},
//   {href: "/admin/faculty", label: "Faculty Manager", icon: UsersRound},
//   {href: "/admin/admissions", label: "Admissions", icon: Inbox},
//   {href: "/admin/navigation", label: "Navigation", icon: PanelBottom},
//   {href: "/admin/footer", label: "Footer", icon: PanelBottom},
//   {href: "/admin/submissions", label: "Submissions", icon: Inbox},
//   {href: "/admin/student-portal", label: "Student Portal", icon: Timer},
// ];

// export default function AdminSidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   async function logout() {
//     await fetch("/api/admin/auth/logout", {method: "POST"});
//     router.push("/admin/login");
//     router.refresh();
//   }

//   return (
//     <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-[#f2f4f7] py-6 text-sm font-medium text-slate-500 lg:flex">
//       <div className="mb-8 px-6">
//         <h1 className="text-xl font-black tracking-tight text-[#320056]">
//           Admin Console
//         </h1>
//         <p className="text-xs text-slate-500">Ekinrin-Adde Nursing</p>
//       </div>

//       <nav className="flex-1 px-2">
//         {items.map(({href, label, icon: Icon}) => {
//           const hrefPath = href.split("?")[0];
//           const isActive =
//             pathname === hrefPath ||
//             (hrefPath !== "/admin" && pathname.startsWith(`${hrefPath}/`));
//           return (
//             <Link
//               key={`${label}-${href}`}
//               href={href}
//               className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 hover:translate-x-1 hover:bg-slate-100 ${
//                 isActive
//                   ? "bg-indigo-50 font-bold text-indigo-700"
//                   : "text-slate-500"
//               }`}>
//               <Icon
//                 size={17}
//                 className={isActive ? "text-indigo-700" : "text-[#320056]"}
//               />
//               <span>{label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="border-t border-slate-200/70 px-2 pt-6 pb-4">
//         <a
//           className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-500 transition hover:bg-slate-100"
//           href="#">
//           <HelpCircle size={17} />
//           <span>Support</span>
//         </a>
//         <button
//           type="button"
//           onClick={logout}
//           className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-500 transition hover:bg-slate-100">
//           <LogOut size={17} />
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }
"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";
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
  Timer,
  UsersRound,
  X,
} from "lucide-react";

const items = [
  {href: "/admin", label: "Dashboard", icon: Home},
  {href: "/admin/settings", label: "Website Settings", icon: Settings},
  {href: "/admin/pages", label: "Pages Manager", icon: FileText},
  {href: "/admin/programmes", label: "Programmes Manager", icon: GraduationCap},
  {href: "/admin/news", label: "News & Events", icon: CalendarDays},
  {href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontal},
  {href: "/admin/faculty", label: "Faculty Manager", icon: UsersRound},
  {href: "/admin/admissions", label: "Admissions", icon: Inbox},
  {href: "/admin/navigation", label: "Navigation", icon: PanelBottom},
  {href: "/admin/footer", label: "Footer", icon: PanelBottom},
  {href: "/admin/submissions", label: "Submissions", icon: Inbox},
  {href: "/admin/student-portal", label: "Student Portal", icon: Timer},
];

const mobilePrimaryItems = items.slice(0, 4);

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function isItemActive(href: string) {
    const hrefPath = href.split("?")[0];

    return (
      pathname === hrefPath ||
      (hrefPath !== "/admin" && pathname.startsWith(`${hrefPath}/`))
    );
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", {method: "POST"});
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-[#f2f4f7] py-6 text-sm font-medium text-slate-500 lg:flex">
        <div className="mb-8 px-6">
          <h1 className="text-xl font-black tracking-tight text-[#320056]">
            Admin Console
          </h1>
          <p className="text-xs text-slate-500">Ekinrin-Adde Nursing</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-2">
          {items.map(({href, label, icon: Icon}) => {
            const isActive = isItemActive(href);

            return (
              <Link
                key={`${label}-${href}`}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 hover:translate-x-1 hover:bg-slate-100 ${
                  isActive
                    ? "bg-indigo-50 font-bold text-indigo-700"
                    : "text-slate-500"
                }`}>
                <Icon
                  size={17}
                  className={isActive ? "text-indigo-700" : "text-[#320056]"}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200/70 px-2 pb-4 pt-4">
          <a
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-500 transition hover:bg-slate-100"
            href="#">
            <HelpCircle size={17} />
            <span>Support</span>
          </a>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-500 transition hover:bg-slate-100">
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-[#f2f4f7]/95 px-4 backdrop-blur lg:hidden">
        <div>
          <h1 className="text-base font-black tracking-tight text-[#320056]">
            Admin Console
          </h1>
          <p className="text-[11px] font-medium text-slate-500">
            Ekinrin-Adde Nursing
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#320056] shadow-sm transition hover:bg-slate-100"
          aria-label="Open admin menu">
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[85%] max-w-sm flex-col bg-[#f2f4f7] py-5 text-sm font-medium text-slate-500 shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="mb-5 flex items-center justify-between px-5">
          <div>
            <h2 className="text-lg font-black tracking-tight text-[#320056]">
              Admin Menu
            </h2>
            <p className="text-xs text-slate-500">Manage website content</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#320056] shadow-sm transition hover:bg-slate-100"
            aria-label="Close admin menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {items.map(({href, label, icon: Icon}) => {
            const isActive = isItemActive(href);

            return (
              <Link
                key={`${label}-${href}`}
                href={href}
                onClick={() => setOpen(false)}
                className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white ${
                  isActive
                    ? "bg-indigo-50 font-bold text-indigo-700 shadow-sm"
                    : "text-slate-500"
                }`}>
                <Icon
                  size={18}
                  className={isActive ? "text-indigo-700" : "text-[#320056]"}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200/70 px-3 pb-4 pt-4">
          <a
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-500 transition hover:bg-white"
            href="#">
            <HelpCircle size={18} />
            <span>Support</span>
          </a>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-500 transition hover:bg-white">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      {/* <nav className="fixed bottom-0 left-0 z-40 grid h-16 w-full grid-cols-5 border-t border-slate-200 bg-white/95 px-2 backdrop-blur lg:hidden">
        {mobilePrimaryItems.map(({href, label, icon: Icon}) => {
          const isActive = isItemActive(href);

          return (
            <Link
              key={`mobile-${label}-${href}`}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold transition ${
                isActive ? "text-indigo-700" : "text-slate-500"
              }`}>
              <Icon
                size={18}
                className={isActive ? "text-indigo-700" : "text-[#320056]"}
              />
              <span className="max-w-[60px] truncate">{label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold text-slate-500 transition">
          <Menu size={18} className="text-[#320056]" />
          <span>More</span>
        </button>
      </nav> */}
    </>
  );
}
