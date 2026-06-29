// "use client";

// import {useEffect, useState} from "react";
// import Link from "next/link";
// import {usePathname} from "next/navigation";
// import {BriefcaseMedical, Menu, X} from "lucide-react";
// import type {NavItem} from "@/types/cms";

// type NavbarProps = {
//   items: NavItem[];
//   brand?: {
//     title: string;
//     subtitle: string;
//     href: string;
//   };
// };

// export default function Navbar({
//   items,
//   brand = {
//     title: "College of Nursing Science",
//     subtitle: "Excellence in Nursing Education",
//     href: "/",
//   },
// }: NavbarProps) {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const isActive = (href: string) => {
//     if (href === "/") return pathname === "/";
//     return pathname.startsWith(href);
//   };

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 12);
//     handleScroll();
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = originalOverflow;
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") setIsOpen(false);
//     };
//     window.addEventListener("keydown", handleEscape);
//     return () => window.removeEventListener("keydown", handleEscape);
//   }, []);

//   return (
//     <>
//       <header
//         className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
//           scrolled
//             ? "border-b border-slate-200/70 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
//             : "bg-white/70 backdrop-blur-md"
//         }`}>
//         <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
//           <Link
//             href={brand.href}
//             className="flex min-w-0 items-center gap-2.5 sm:gap-3"
//             aria-label={`${brand.title} home`}>
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-[#320056]/10 sm:h-11 sm:w-11">
//               <BriefcaseMedical className="h-5 w-5 text-[#320056] sm:h-6 sm:w-6" />
//             </div>
//             <div className="min-w-0">
//               <p className="truncate text-sm font-extrabold leading-tight text-[#320056] sm:text-base">
//                 {brand.title}
//               </p>
//               <p className="hidden text-xs font-medium text-[#005768] sm:block">
//                 {brand.subtitle}
//               </p>
//             </div>
//           </Link>

//           <div className="hidden items-center gap-1 lg:flex">
//             {items.map((page) => {
//               const active = isActive(page.href);
//               return (
//                 <Link
//                   key={page.href}
//                   href={page.href}
//                   className={`px-4 py-2 text-sm font-semibold ${
//                     active
//                       ? "border-b-4 border-[#005768] text-[#320056]"
//                       : "text-slate-700 hover:border-b-4 hover:border-[#005768] hover:text-[#320056]"
//                   }`}>
//                   {page.label}
//                 </Link>
//               );
//             })}
//           </div>

//           <button
//             type="button"
//             onClick={() => setIsOpen(true)}
//             aria-label="Open navigation menu"
//             aria-expanded={isOpen}
//             aria-controls="mobile-menu"
//             className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#320056]/20 hover:text-[#320056] lg:hidden">
//             <Menu className="h-5 w-5" />
//           </button>
//         </nav>
//       </header>

//       <div
//         className={`fixed inset-0 z-[60] lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
//         <button
//           type="button"
//           aria-label="Close menu overlay"
//           onClick={() => setIsOpen(false)}
//           className={`absolute inset-0 bg-slate-950/45 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
//         />

//         <aside
//           id="mobile-menu"
//           className={`absolute right-0 top-0 h-full w-[88vw] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
//             isOpen ? "translate-x-0" : "translate-x-full"
//           }`}>
//           <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
//             <span className="font-semibold text-[#320056]">Menu</span>
//             <button
//               type="button"
//               onClick={() => setIsOpen(false)}
//               className="rounded-xl p-2 text-slate-700 hover:bg-slate-100">
//               <X className="h-5 w-5" />
//             </button>
//           </div>

//           <div className="flex flex-col gap-2 p-4">
//             {items.map((page) => {
//               const active = isActive(page.href);
//               return (
//                 <Link
//                   key={page.href}
//                   href={page.href}
//                   onClick={() => setIsOpen(false)}
//                   className={`rounded-2xl px-4 py-3 text-base font-medium ${
//                     active
//                       ? "bg-[#320056] text-white"
//                       : "text-slate-700 hover:bg-slate-100"
//                   }`}>
//                   {page.label}
//                 </Link>
//               );
//             })}
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// }

"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Menu, X} from "lucide-react";
import Image from "next/image";
import type {NavItem} from "@/types/cms";

type NavbarProps = {
  items: NavItem[];
  brand?: {
    title: string;
    subtitle: string;
    href: string;
  };
  logoSrc?: string; // ← Add this for easy logo customization
};

export default function Navbar({
  items,
  brand = {
    title: "College of Nursing Science",
    subtitle: "Excellence in Nursing Education",
    href: "/",
  },
  logoSrc = "/cns-logo.png", // Default logo path
}: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/70 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "bg-white/70 backdrop-blur-md"
        }`}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo + Brand */}
          <Link
            href={brand.href}
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label={`${brand.title} home`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center ring-[#320056]/10 sm:h-11 sm:w-11 overflow-hidden">
              <Image
                src={logoSrc}
                alt={`${brand.title} Logo`}
                width={48}
                height={48}
                priority
                className="h-9 w-auto sm:h-10 object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold leading-tight text-[#320056] sm:text-base">
                {brand.title}
              </p>
              <p className="hidden text-xs font-medium text-[#005768] sm:block">
                {brand.subtitle}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {items.map((page) => {
              const active = isActive(page.href);
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className={`px-4 py-2 text-sm font-semibold ${
                    active
                      ? "border-b-4 border-[#005768] text-[#320056]"
                      : "text-slate-700 hover:border-b-4 hover:border-[#005768] hover:text-[#320056]"
                  }`}>
                  {page.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#320056]/20 hover:text-[#320056] lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-slate-950/45 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        />

        <aside
          id="mobile-menu"
          className={`absolute right-0 top-0 h-full w-[88vw] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <span className="font-semibold text-[#320056]">Menu</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-2 text-slate-700 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2 p-4">
            {items.map((page) => {
              const active = isActive(page.href);
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-base font-medium ${
                    active
                      ? "bg-[#320056] text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}>
                  {page.label}
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
}
