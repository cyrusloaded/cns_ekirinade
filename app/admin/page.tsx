import Link from "next/link";
import {prisma} from "@/lib/prisma";

async function getStats() {
  try {
    const [pages, navItems, contacts, admissions, portalSettings] =
      await Promise.all([
        prisma.sitePage.count(),
        prisma.siteNavigationItem.count(),
        prisma.contactSubmission.count(),
        prisma.admissionApplication.count(),
        prisma.portalSetting.count(),
      ]);

    return {pages, navItems, contacts, admissions, portalSettings};
  } catch {
    return {
      pages: 0,
      navItems: 0,
      contacts: 0,
      admissions: 0,
      portalSettings: 0,
    };
  }
}

const cards = [
  {key: "pages", label: "Pages", href: "/admin/pages"},
  {key: "navItems", label: "Navigation Items", href: "/admin/navigation"},
  {key: "contacts", label: "Contact Submissions", href: "/admin/submissions"},
  {
    key: "admissions",
    label: "Admission Applications",
    href: "/admin/submissions",
  },
  {
    key: "portalSettings",
    label: "Student Portal Timer",
    href: "/admin/student-portal",
  },
] as const;

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="w-full space-y-5 px-3 py-4 mt-15 sm:mt-0 sm:space-y-6 sm:px-5 lg:space-y-8 lg:p-5">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#320056] to-[#005768] px-4 py-6 text-white shadow-xl sm:rounded-[2rem] sm:px-6 sm:py-8 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-sm sm:tracking-[0.2em]">
          Overview
        </p>

        <h1 className="mt-3 max-w-4xl text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
          Manage the entire website from one place.
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
          This admin area lets your team create, update, read, and delete page
          content, manage the public navigation and footer, and review incoming
          contact or admission entries without editing code.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:rounded-[1.75rem] sm:p-5 lg:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#005768] sm:text-sm sm:tracking-[0.2em]">
              {card.label}
            </p>

            <p className="mt-3 text-3xl font-extrabold text-[#320056] sm:mt-4 sm:text-4xl">
              {stats[card.key]}
            </p>

            <p className="mt-2 text-sm font-medium text-slate-500 transition group-hover:text-[#005768] sm:mt-3">
              Open manager
            </p>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.75rem] sm:p-6">
          <h3 className="text-lg font-bold text-[#320056] sm:text-xl">
            What the admin can do
          </h3>

          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Create new page records and publish content through editable form
              fields.
            </li>
            <li>
              Update SEO fields, hero sections, card lists, and CTA blocks for
              every page.
            </li>
            <li>
              Delete unused page records and remove outdated navigation links.
            </li>
            <li>
              Review and delete contact or admission submissions stored in the
              database.
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.75rem] sm:p-6">
          <h3 className="text-lg font-bold text-[#320056] sm:text-xl">
            Recommended workflow
          </h3>

          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Start in Pages to edit each page section through the visual form
              editor.
            </li>
            <li>Use Navigation to control what appears in the header.</li>
            <li>Use Footer to update contact info and quick links.</li>
            <li>
              Monitor Submissions for inquiries and applications from site
              visitors.
            </li>
            <li>
              Set the student portal coming-soon countdown from Student Portal.
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
