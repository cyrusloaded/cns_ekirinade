"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { FooterContent, NavItem } from "@/types/cms";

export default function AppShell({
  children,
  navigation,
  footer,
}: {
  children: React.ReactNode;
  navigation: NavItem[];
  footer: FooterContent;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="min-h-screen bg-[#f6f7fb]">{children}</main>;
  }

  return (
    <>
      <Nav items={navigation} />
      <main className="min-h-full flex flex-col">{children}</main>
      <Footer content={footer} />
    </>
  );
}
