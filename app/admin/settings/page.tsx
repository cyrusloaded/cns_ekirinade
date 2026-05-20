import Link from "next/link";
import {PanelBottom, Settings, Timer, Waypoints} from "lucide-react";

const cards = [
  {
    href: "/admin/pages",
    title: "Pages Content",
    description: "Edit all website page sections with the visual form editor.",
    icon: Settings,
  },
  {
    href: "/admin/navigation",
    title: "Navigation",
    description:
      "Create, update, reorder, show, hide, or delete header menu links.",
    icon: Waypoints,
  },
  {
    href: "/admin/footer",
    title: "Footer",
    description: "Update brand text, contact details, and footer quick links.",
    icon: PanelBottom,
  },
  {
    href: "/admin/student-portal",
    title: "Student Portal Timer",
    description: "Set the coming-soon countdown date for the student portal.",
    icon: Timer,
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] px-4 py-7 mt-15 sm:mt-0 sm:px-6 lg:px-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#320056]">
          Website Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Choose the exact website area you want to manage.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({href, title, description, icon: Icon}) => (
          <Link
            key={href}
            href={href}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#320056]/5 text-[#320056]">
              <Icon size={22} />
            </div>
            <h2 className="text-lg font-extrabold text-[#320056]">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
