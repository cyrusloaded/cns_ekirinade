// "use client";

// import { useEffect, useState } from "react";
// import { Plus, Save, Trash2 } from "lucide-react";

// type NavItem = {
//   id?: string;
//   label: string;
//   href: string;
//   order: number;
//   isVisible: boolean;
// };

// export default function NavigationManager() {
//   const [items, setItems] = useState<NavItem[]>([]);
//   const [status, setStatus] = useState("Loading navigation...");

//   useEffect(() => {
//     void load();
//   }, []);

//   async function load() {
//     const response = await fetch("/api/site/navigation", { cache: "no-store" });
//     const data = (await response.json()) as NavItem[];
//     setItems(data);
//     setStatus("Navigation loaded.");
//   }

//   function updateItem(index: number, patch: Partial<NavItem>) {
//     setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
//   }

//   async function save() {
//     const payload = items.map((item, index) => ({
//       label: item.label,
//       href: item.href,
//       order: Number(item.order ?? index + 1),
//       isVisible: item.isVisible,
//     }));

//     const response = await fetch("/api/site/navigation", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       setStatus("Could not save navigation.");
//       return;
//     }

//     const data = (await response.json()) as NavItem[];
//     setItems(data);
//     setStatus("Navigation saved.");
//   }

//   return (
//     <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="flex flex-wrap items-start justify-between gap-3">
//         <div>
//           <h2 className="text-xl font-bold text-[#320056]">Navigation manager</h2>
//           <p className="text-sm text-slate-500">Control the header links shown on the public website.</p>
//         </div>
//         <div className="flex gap-2">
//           <button onClick={() => setItems((current) => [...current, { label: "", href: "", order: current.length + 1, isVisible: true }])} type="button" className="inline-flex items-center gap-2 rounded-2xl bg-[#320056] px-4 py-3 text-sm font-bold text-white">
//             <Plus size={16} /> Add item
//           </button>
//           <button onClick={save} type="button" className="inline-flex items-center gap-2 rounded-2xl bg-[#005768] px-4 py-3 text-sm font-bold text-white">
//             <Save size={16} /> Save all
//           </button>
//         </div>
//       </div>

//       <div className="mt-6 space-y-4">
//         {items.map((item, index) => (
//           <div key={`${item.href}-${index}`} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1.3fr_1.2fr_110px_120px_60px] md:items-center">
//             <input value={item.label} onChange={(e) => updateItem(index, { label: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#320056]" placeholder="Label" />
//             <input value={item.href} onChange={(e) => updateItem(index, { href: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#320056]" placeholder="/about" />
//             <input type="number" value={item.order} onChange={(e) => updateItem(index, { order: Number(e.target.value) })} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#320056]" placeholder="Order" />
//             <label className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600">
//               <input type="checkbox" checked={item.isVisible} onChange={(e) => updateItem(index, { isVisible: e.target.checked })} /> Visible
//             </label>
//             <button onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} type="button" className="inline-flex items-center justify-center rounded-2xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100">
//               <Trash2 size={16} />
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">{status}</div>
//     </div>
//   );
// }

"use client";

import {useEffect, useState} from "react";
import {Plus, Save, Trash2} from "lucide-react";

type NavItem = {
  id?: string;
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
};

export default function NavigationManager() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [status, setStatus] = useState("Loading navigation...");

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    const response = await fetch("/api/site/navigation", {cache: "no-store"});
    const data = (await response.json()) as NavItem[];

    setItems(data);
    setStatus("Navigation loaded.");
  }

  function updateItem(index: number, patch: Partial<NavItem>) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? {...item, ...patch} : item,
      ),
    );
  }

  async function save() {
    const payload = items.map((item, index) => ({
      label: item.label,
      href: item.href,
      order: Number(item.order ?? index + 1),
      isVisible: item.isVisible,
    }));

    const response = await fetch("/api/site/navigation", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("Could not save navigation.");
      return;
    }

    const data = (await response.json()) as NavItem[];

    setItems(data);
    setStatus("Navigation saved.");
  }

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-4 mt-15 sm:mt-0 shadow-sm sm:rounded-[1.75rem] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-[#320056] sm:text-xl">
            Navigation manager
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Control the header links shown on the public website.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-end">
          <button
            onClick={() =>
              setItems((current) => [
                ...current,
                {
                  label: "",
                  href: "",
                  order: current.length + 1,
                  isVisible: true,
                },
              ])
            }
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#320056] px-4 py-3 text-sm font-bold text-white">
            <Plus size={16} /> Add item
          </button>

          <button
            onClick={save}
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#005768] px-4 py-3 text-sm font-bold text-white">
            <Save size={16} /> Save all
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4 sm:mt-6">
        {items.map((item, index) => (
          <div
            key={`${item.href}-${index}`}
            className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 p-3 sm:p-4 md:grid-cols-[1.3fr_1.2fr_110px_120px_60px] md:items-center">
            <label className="space-y-1 md:space-y-0">
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 md:hidden">
                Label
              </span>

              <input
                value={item.label}
                onChange={(e) => updateItem(index, {label: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#320056]"
                placeholder="Label"
              />
            </label>

            <label className="space-y-1 md:space-y-0">
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 md:hidden">
                Link
              </span>

              <input
                value={item.href}
                onChange={(e) => updateItem(index, {href: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#320056]"
                placeholder="/about"
              />
            </label>

            <label className="space-y-1 md:space-y-0">
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 md:hidden">
                Order
              </span>

              <input
                type="number"
                value={item.order}
                onChange={(e) =>
                  updateItem(index, {order: Number(e.target.value)})
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#320056]"
                placeholder="Order"
              />
            </label>

            <label className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 md:justify-start">
              <span>Visible</span>

              <input
                type="checkbox"
                checked={item.isVisible}
                onChange={(e) =>
                  updateItem(index, {isVisible: e.target.checked})
                }
                className="h-5 w-5 rounded border-slate-300 text-[#320056]"
              />
            </label>

            <button
              onClick={() =>
                setItems((current) =>
                  current.filter((_, itemIndex) => itemIndex !== index),
                )
              }
              type="button"
              className="inline-flex items-center justify-center rounded-2xl bg-red-50 px-4 py-3 text-red-600 transition hover:bg-red-100 md:px-0"
              aria-label="Delete navigation item">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
        {status}
      </div>
    </div>
  );
}
