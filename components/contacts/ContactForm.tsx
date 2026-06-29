"use client";

import {type FormEvent, useState} from "react";
import {Send} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import type {ContactPageContent} from "@/types/cms";

export default function ContactForm({
  content,
}: {
  content: ContactPageContent["form"];
}) {
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      phoneNumber: String(formData.get("phoneNumber") || ""),
      inquiryType: String(formData.get("inquiryType") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      event.currentTarget.reset();
      setStatus("Inquiry submitted successfully.");
    } catch {
      setStatus("Unable to submit your inquiry right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-8 lg:p-10 xl:p-12">
      <div className="mb-8 sm:mb-10">
        <h3 className="mb-2 font-headline text-2xl font-bold text-primary sm:text-3xl">
          {content.title}
        </h3>
        <p className="text-sm leading-6 text-on-surface-variant sm:text-base">
          {content.description}
        </p>
      </div>

      <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="pl-1 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Florence Nightingale"
              className="rounded-xl border-transparent bg-gray-100 px-4 py-3 text-sm placeholder:text-on-surface-variant/40 focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/20 sm:h-12 sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="pl-1 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="florence@medical.edu"
              className="rounded-xl border-transparent bg-gray-100 px-4 py-3 text-sm placeholder:text-on-surface-variant/40 focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/20 sm:h-12 sm:text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-2">
            <Label
              htmlFor="inquiryType"
              className="pl-1 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm">
              Inquiry Type
            </Label>
            {/* <select
              id="inquiryType"
              name="inquiryType"
              defaultValue=""
              className="w-full rounded-xl border-transparent bg-gray-100 px-4 py-3 text-sm text-on-surface-variant focus:ring-2 focus:ring-secondary/20 sm:h-12 sm:text-base outline-none">
              <option value="" disabled>
                Select inquiry type
              </option>
              {content.inquiryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select> */}
            <div className="group relative">
              <select
                id="inquiryType"
                name="inquiryType"
                defaultValue=""
                className="
      w-full appearance-none
      bg-white/80 backdrop-blur-sm
      border border-white/40
      shadow-sm
      rounded-xl px-4 py-3.5
      text-sm text-gray-800
      cursor-pointer
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:border-secondary/40 focus:bg-white
      hover:bg-white/90 hover:shadow-md
      sm:h-12 sm:text-base
    ">
                <option value="" disabled className="text-gray-400">
                  Select inquiry type…
                </option>
                {content.inquiryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-secondary">
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-focus-within:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phoneNumber"
              className="pl-1 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              placeholder="+234 ..."
              className="rounded-xl border-transparent bg-gray-100 px-4 py-3 text-sm placeholder:text-on-surface-variant/40 focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/20 sm:h-12 sm:text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="message"
            className="pl-1 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm">
            Message Detail
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            placeholder="How can our clinical team assist you today?"
            className="min-h-[140px] rounded-xl border-transparent bg-gray-100 px-4 py-3 text-sm placeholder:text-on-surface-variant/40 focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/20 sm:text-base"
          />
        </div>

        <div className="pt-2 sm:flex sm:justify-end sm:pt-4">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="editorial-gradient inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-6 sm:text-base lg:px-10 disabled:opacity-70">
            <span>{isSubmitting ? "Submitting..." : content.submitLabel}</span>
            <Send size={18} />
          </Button>
        </div>

        {status ? <p className="text-sm text-primary">{status}</p> : null}
      </form>
    </section>
  );
}
