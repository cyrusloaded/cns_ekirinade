"use client";

import {CircleQuestionMark, Minus, Phone, Plus} from "lucide-react";
import {useState} from "react";
import type {AdmissionPageContent} from "@/types/cms";

export default function FAQSidebar({
  content,
}: {
  content: AdmissionPageContent["faq"];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <aside className="lg:col-span-4 space-y-8">
      <div className="bg-surface-container-high rounded-2xl p-6 md:p-8 lg:sticky lg:top-28">
        <h3 className="font-headline text-xl font-bold text-primary mb-8 flex items-center gap-2">
          <CircleQuestionMark className="text-secondary" />
          {content.title}
        </h3>

        <div className="space-y-4">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="border-b border-outline-variant/20 pb-4 last:border-b-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left">
                  <h4 className="font-bold text-sm text-primary transition-colors hover:text-secondary">
                    {item.question}
                  </h4>
                  {isOpen ? (
                    <Minus size={15} className="shrink-0 text-secondary" />
                  ) : (
                    <Plus size={15} className="shrink-0 text-primary" />
                  )}
                </button>
                {isOpen ? (
                  <p className="pt-3 text-xs leading-relaxed text-on-surface-variant">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-primary p-6 text-white mt-8 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-secondary-fixed-dim">
            <Phone size={20} />
            <p className="font-headline text-lg font-bold text-white">
              {content.contactCard.title}
            </p>
          </div>
          <p className="mb-2 text-xl font-extrabold">
            {content.contactCard.phone}
          </p>
          <p className="text-sm leading-relaxed text-white/70">
            {content.contactCard.note}
          </p>
        </div>
      </div>
    </aside>
  );
}
