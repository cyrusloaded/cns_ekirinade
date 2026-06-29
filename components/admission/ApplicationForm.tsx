"use client";

import {type FormEvent, useState} from "react";
import {BriefcaseMedical, ShieldCheck} from "lucide-react";
import type {AdmissionPageContent} from "@/types/cms";

export default function ApplicationForm({
  content,
}: {
  content: AdmissionPageContent["applicationForm"];
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
      programmeOfInterest: String(formData.get("programmeOfInterest") || ""),
      previousQualifications: String(
        formData.get("previousQualifications") || "",
      ),
      statement: String(formData.get("statement") || ""),
      agreedToTerms: formData.get("agreedToTerms") === "on",
    };

    try {
      const response = await fetch("/api/admission-applications", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      event.currentTarget.reset();
      setStatus("Application submitted successfully.");
    } catch {
      setStatus("Unable to submit your application right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="bg-gray-200/30 rounded-3xl p-6 md:p-12 relative overflow-hidden"
      id="apply">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <span className="material-symbols-outlined text-[120px] text-primary">
          <BriefcaseMedical size={170} />
        </span>
      </div>

      <div className="max-w-2xl relative z-10">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-2">
          {content.title}
        </h2>
        <p className=" mb-8 md:mb-10">{content.description}</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              name="fullName"
              label="Full Name"
              placeholder="As it appears on WAEC"
            />
            <InputField
              name="email"
              label="Email Address"
              placeholder="name@example.com"
              type="email"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              name="phoneNumber"
              label="Phone Number"
              placeholder="+234..."
              type="tel"
            />

            {/* <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">
                Programme of Interest
              </label>
              <select
                name="programmeOfInterest"
                className="w-full bg-white/70 border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary text-sm">
                {content.programmeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div> */}

            <div className="group">
              <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">
                Programme of Interest
              </label>
              <div className="relative">
                <select
                  name="programmeOfInterest"
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
      ">
                  <option value="" disabled className="text-gray-400">
                    Select a programme…
                  </option>
                  {content.programmeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
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
          </div>

          <InputField
            name="previousQualifications"
            label="Previous Qualifications"
            placeholder="e.g. SSCE 2022, ND Science Tech"
          />

          <div>
            <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">
              Additional Message (Optional)
            </label>
            <textarea
              name="statement"
              className="w-full bg-white/70 border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary text-sm"
              placeholder="Any additional information you'd like to share..."
              rows={4}
            />
          </div>

          <div className="flex items-start gap-2 sm:gap-3 py-3 sm:py-4">
            <input
              name="agreedToTerms"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 sm:h-5 sm:w-5 rounded text-secondary focus:ring-secondary"
            />
            <p className="text-sm sm:text-md leading-relaxed">
              {content.checkboxLabel}
            </p>
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-gradient-to-br from-[#2e0052] to-[#4b0082] text-white py-5 rounded-xl font-headline font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-3 disabled:opacity-70"
            type="submit">
            <ShieldCheck />
            {isSubmitting ? "Submitting..." : content.submitLabel}
          </button>

          {status ? <p className="text-sm text-primary">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}

function InputField({
  label,
  placeholder,
  type = "text",
  name,
}: {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        name={name}
        required
        className="w-full bg-white/70 border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary text-sm outline-none"
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
