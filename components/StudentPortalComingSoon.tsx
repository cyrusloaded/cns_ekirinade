"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {Clock, GraduationCap} from "lucide-react";

type Props = {
  title: string;
  description: string;
  launchAt?: string | null;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(launchAt?: string | null): TimeLeft {
  if (!launchAt) return {days: 0, hours: 0, minutes: 0, seconds: 0};
  const diff = Math.max(0, new Date(launchAt).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function StudentPortalComingSoon({title, description, launchAt}: Props) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(launchAt));
  const launchText = useMemo(() => (launchAt ? new Intl.DateTimeFormat("en", {dateStyle: "medium", timeStyle: "short"}).format(new Date(launchAt)) : "Date to be announced"), [launchAt]);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(launchAt)), 1000);
    return () => window.clearInterval(timer);
  }, [launchAt]);

  const boxes = [
    {label: "Days", value: timeLeft.days},
    {label: "Hours", value: timeLeft.hours},
    {label: "Minutes", value: timeLeft.minutes},
    {label: "Seconds", value: timeLeft.seconds},
  ];

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-12 text-[#191c1e] sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-[#320056]/10">
          <div className="bg-gradient-to-br from-[#320056] to-[#005768] px-6 py-12 text-center text-white sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/20">
              <GraduationCap size={42} />
            </div>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.25em] text-white/60">College of Nursing Science, Ekinrin-Adde</p>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">{description}</p>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <div className="mb-6 flex flex-col items-center justify-center gap-2 text-center text-[#320056]">
              <Clock size={22} />
              <p className="text-sm font-black uppercase tracking-[0.18em]">Launch Time</p>
              <p className="text-sm font-semibold text-slate-500">{launchText}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {boxes.map((box) => (
                <div key={box.label} className="rounded-[1.5rem] bg-[#f2f4f7] px-4 py-6 text-center ring-1 ring-slate-100">
                  <p className="text-4xl font-black text-[#320056]">{String(box.value).padStart(2, "0")}</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#005768]">{box.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/" className="rounded-full bg-[#320056] px-7 py-3 text-sm font-black text-white shadow-lg shadow-[#320056]/20">Back to Website</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
