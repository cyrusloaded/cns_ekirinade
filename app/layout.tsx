import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { getFooter, getNavigation } from "@/lib/cms";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "College of Nursing Science, Ekinrin-Adde",
  description:
    "Production-ready CMS-driven website for the College of Nursing Science, Ekinrin-Adde.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [navigation, footer] = await Promise.all([getNavigation(), getFooter()]);

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="font-sans">
        <AppShell navigation={navigation} footer={footer}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
