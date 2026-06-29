"use client";

import {useEffect, useState} from "react";
import {Save, Timer} from "lucide-react";

type PortalSetting = {
  title: string;
  description: string;
  launchAt?: string | null;
  isEnabled: boolean;
};

function toDatetimeLocal(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);

  return local.toISOString().slice(0, 16);
}

export default function StudentPortalManager() {
  const [form, setForm] = useState<PortalSetting>({
    title: "Student Portal Coming Soon",
    description: "",
    launchAt: "",
    isEnabled: true,
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/site/student-portal", {
        cache: "no-store",
      });

      const data = (await response.json()) as PortalSetting;

      setForm({...data, launchAt: toDatetimeLocal(data.launchAt)});
    }

    void load();
  }, []);

  async function save() {
    setStatus("Saving portal timer...");

    const response = await fetch("/api/site/student-portal", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        ...form,
        launchAt: form.launchAt ? new Date(form.launchAt).toISOString() : null,
      }),
    });

    if (!response.ok) {
      setStatus("Could not save student portal settings.");
      return;
    }

    setStatus("Student portal coming soon timer saved.");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fc] mt-15 sm:mt-0 px-3 py-4 sm:px-6 sm:py-6 lg:px-10">
      <header className="mb-5 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-[#320056] to-[#005768] px-4 py-6 text-white shadow-xl sm:mb-8 sm:rounded-[2rem] sm:px-8 sm:py-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 sm:h-14 sm:w-14">
          <Timer size={26} />
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
            Student Portal Timer
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:leading-7">
            Set the public student portal coming-soon title, message, and
            countdown time from the admin dashboard.
          </p>
        </div>
      </header>

      <section className="w-full max-w-3xl rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:rounded-[1.75rem] sm:p-8">
        <div className="grid gap-5">
          <label className="space-y-2 text-sm font-bold text-[#320056]">
            <span>Coming Soon Title</span>

            <input
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              className="w-full rounded-2xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20 sm:py-4"
            />
          </label>

          <label className="space-y-2 text-sm font-bold text-[#320056]">
            <span>Description</span>

            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="min-h-32 w-full resize-y rounded-2xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20 sm:py-4"
            />
          </label>

          <label className="space-y-2 text-sm font-bold text-[#320056]">
            <span>Launch Date & Time</span>

            <input
              type="datetime-local"
              value={form.launchAt || ""}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  launchAt: event.target.value,
                }))
              }
              className="w-full rounded-2xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20 sm:py-4"
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7f9fc] px-4 py-4 text-sm font-bold text-[#320056] sm:px-5">
            <span>Show coming-soon page</span>

            <input
              type="checkbox"
              checked={form.isEnabled}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  isEnabled: event.target.checked,
                }))
              }
              className="h-5 w-5 shrink-0 rounded border-slate-300 text-[#320056]"
            />
          </label>

          {status && (
            <p className="rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-semibold leading-6 text-slate-600">
              {status}
            </p>
          )}

          <button
            type="button"
            onClick={() => void save()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#320056] px-7 py-3 text-sm font-black text-white shadow-lg shadow-[#320056]/20 sm:w-fit">
            <Save size={16} /> Save Timer
          </button>
        </div>
      </section>
    </div>
  );
}
