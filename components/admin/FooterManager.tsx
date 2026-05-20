"use client";

import {useEffect, useState} from "react";
import {RefreshCw, Save} from "lucide-react";

type FooterResponse = {
  id?: string;
  key?: string;
  content?: unknown;
};

export default function FooterManager() {
  const [text, setText] = useState("{}");
  const [status, setStatus] = useState("Loading footer...");

  async function load() {
    const response = await fetch("/api/site/footer", {cache: "no-store"});
    const data = (await response.json()) as FooterResponse;
    setText(JSON.stringify(data.content ?? {}, null, 2));
    setStatus("Footer loaded.");
  }

  useEffect(() => {
    void load();
  }, []);

  async function save() {
    try {
      const parsed = JSON.parse(text || "{}");
      const response = await fetch("/api/site/footer", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(parsed),
      });

      if (!response.ok) {
        setStatus("Could not save footer.");
        return;
      }

      setStatus("Footer saved.");
    } catch {
      setStatus("Footer JSON is invalid.");
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 mt-15 sm:mt-0 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#320056]">Footer manager</h2>
          <p className="text-sm text-slate-500">
            Edit footer contact details, descriptions, and quick-link groups as
            JSON.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700">
            <RefreshCw size={16} /> Reload
          </button>
          <button
            onClick={save}
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#005768] px-4 py-3 text-sm font-bold text-white">
            <Save size={16} /> Save
          </button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="mt-6 min-h-[540px] w-full rounded-2xl border border-slate-200 bg-slate-950 px-4 py-4 font-mono text-sm text-green-200 outline-none focus:border-[#005768]"
      />
      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        {status}
      </div>
    </div>
  );
}
