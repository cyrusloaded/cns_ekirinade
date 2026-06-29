// "use client";

// import {useEffect, useMemo, useState} from "react";
// import {Trash2} from "lucide-react";

// type ContactSubmission = {
//   id: string;
//   fullName: string;
//   email: string;
//   phoneNumber?: string | null;
//   inquiryType?: string | null;
//   message: string;
//   createdAt: string;
// };

// type AdmissionApplication = {
//   id: string;
//   fullName: string;
//   email: string;
//   phoneNumber?: string | null;
//   programmeOfInterest?: string | null;
//   previousQualifications?: string | null;
//   statement?: string | null;
//   createdAt: string;
// };

// export default function SubmissionsManager() {
//   const [tab, setTab] = useState<"contacts" | "admissions">("contacts");
//   const [contacts, setContacts] = useState<ContactSubmission[]>([]);
//   const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
//   const [status, setStatus] = useState("Loading submissions...");

//   async function load() {
//     const [contactsResponse, admissionsResponse] = await Promise.all([
//       fetch("/api/contact-submissions", {cache: "no-store"}),
//       fetch("/api/admission-applications", {cache: "no-store"}),
//     ]);

//     const [contactsData, admissionsData] = await Promise.all([
//       contactsResponse.json() as Promise<ContactSubmission[]>,
//       admissionsResponse.json() as Promise<AdmissionApplication[]>,
//     ]);

//     setContacts(contactsData);
//     setAdmissions(admissionsData);
//     setStatus("Submissions loaded.");
//   }

//   useEffect(() => {
//     void load();
//   }, []);

//   const activeCount = useMemo(
//     () => (tab === "contacts" ? contacts.length : admissions.length),
//     [tab, contacts.length, admissions.length],
//   );

//   async function deleteEntry(id: string) {
//     const endpoint =
//       tab === "contacts"
//         ? `/api/contact-submissions/${id}`
//         : `/api/admission-applications/${id}`;

//     const response = await fetch(endpoint, {method: "DELETE"});

//     if (!response.ok) {
//       setStatus("Could not delete the selected entry.");
//       return;
//     }

//     if (tab === "contacts") {
//       setContacts((current) => current.filter((item) => item.id !== id));
//     } else {
//       setAdmissions((current) => current.filter((item) => item.id !== id));
//     }

//     setStatus("Entry deleted.");
//   }

//   return (
//     <div className="w-full space-y-5 mt-15 sm:mt-0 overflow-x-hidden sm:space-y-6">
//       <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.75rem] sm:p-5">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//           <div className="min-w-0">
//             <h2 className="text-lg font-bold text-[#320056] sm:text-xl">
//               Submissions manager
//             </h2>

//             <p className="mt-1 text-sm leading-6 text-slate-500">
//               Read and delete incoming contact messages and admission
//               applications.
//             </p>
//           </div>

//           <div className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
//             {activeCount} records shown
//           </div>
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
//           {[
//             ["contacts", "Contact inquiries"],
//             ["admissions", "Admission applications"],
//           ].map(([key, label]) => (
//             <button
//               key={key}
//               type="button"
//               onClick={() => setTab(key as "contacts" | "admissions")}
//               className={`rounded-full px-5 py-3 text-sm font-bold transition ${
//                 tab === key
//                   ? "bg-[#320056] text-white"
//                   : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//               }`}>
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {tab === "contacts" ? (
//         <div className="grid gap-4">
//           {contacts.map((item) => (
//             <article
//               key={item.id}
//               className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.75rem] sm:p-5">
//               <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//                 <div className="min-w-0">
//                   <h3 className="text-base font-bold text-[#320056] sm:text-lg">
//                     {item.fullName}
//                   </h3>

//                   <p className="mt-1 break-words text-sm leading-6 text-slate-500">
//                     {item.email} · {item.phoneNumber || "No phone"}
//                   </p>

//                   <p className="mt-1 text-sm leading-6 text-slate-500">
//                     {new Date(item.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => deleteEntry(item.id)}
//                   type="button"
//                   className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 sm:w-auto">
//                   <Trash2 size={16} /> Delete
//                 </button>
//               </div>

//               <p className="mt-4 inline-flex max-w-full rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#005768]">
//                 {item.inquiryType || "General"}
//               </p>

//               <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
//                 {item.message}
//               </p>
//             </article>
//           ))}

//           {!contacts.length && (
//             <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-500 sm:rounded-[1.75rem] sm:p-6">
//               No contact submissions yet.
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="grid gap-4">
//           {admissions.map((item) => (
//             <article
//               key={item.id}
//               className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.75rem] sm:p-5">
//               <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//                 <div className="min-w-0">
//                   <h3 className="text-base font-bold text-[#320056] sm:text-lg">
//                     {item.fullName}
//                   </h3>

//                   <p className="mt-1 break-words text-sm leading-6 text-slate-500">
//                     {item.email} · {item.phoneNumber || "No phone"}
//                   </p>

//                   <p className="mt-1 text-sm leading-6 text-slate-500">
//                     {new Date(item.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => deleteEntry(item.id)}
//                   type="button"
//                   className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 sm:w-auto">
//                   <Trash2 size={16} /> Delete
//                 </button>
//               </div>

//               <div className="mt-4 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
//                 <div className="rounded-2xl bg-slate-50 p-4">
//                   <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#005768]">
//                     Programme
//                   </p>

//                   <p className="mt-2 break-words text-sm leading-6 text-slate-600">
//                     {item.programmeOfInterest || "Not provided"}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-slate-50 p-4">
//                   <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#005768]">
//                     Previous qualifications
//                   </p>

//                   <p className="mt-2 break-words text-sm leading-6 text-slate-600">
//                     {item.previousQualifications || "Not provided"}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-4 rounded-2xl bg-slate-50 p-4">
//                 <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#005768]">
//                   Applicant statement
//                 </p>

//                 <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
//                   {item.statement || "No statement provided."}
//                 </p>
//               </div>
//             </article>
//           ))}

//           {!admissions.length && (
//             <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-500 sm:rounded-[1.75rem] sm:p-6">
//               No admission applications yet.
//             </div>
//           )}
//         </div>
//       )}

//       <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
//         {status}
//       </div>
//     </div>
//   );
// }

"use client";

import {useEffect, useMemo, useState} from "react";
import {Loader2, Trash2} from "lucide-react";

type ContactSubmission = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  inquiryType?: string | null;
  message: string;
  createdAt: string;
};

type AdmissionApplication = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  programmeOfInterest?: string | null;
  previousQualifications?: string | null;
  statement?: string | null;
  createdAt: string;
};

export default function SubmissionsManager() {
  const [tab, setTab] = useState<"contacts" | "admissions">("contacts");
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [status, setStatus] = useState("Loading submissions...");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    const [contactsResponse, admissionsResponse] = await Promise.all([
      fetch("/api/contact-submissions", {cache: "no-store"}),
      fetch("/api/admission-applications", {cache: "no-store"}),
    ]);

    const [contactsData, admissionsData] = await Promise.all([
      contactsResponse.json() as Promise<ContactSubmission[]>,
      admissionsResponse.json() as Promise<AdmissionApplication[]>,
    ]);

    setContacts(contactsData);
    setAdmissions(admissionsData);
    setStatus("Submissions loaded.");
  }

  useEffect(() => {
    void load();
  }, []);

  const activeCount = useMemo(
    () => (tab === "contacts" ? contacts.length : admissions.length),
    [tab, contacts.length, admissions.length],
  );

  async function deleteEntry(id: string) {
    setDeletingId(id);

    const endpoint =
      tab === "contacts"
        ? `/api/contact-submissions/${id}`
        : `/api/admission-applications/${id}`;

    const response = await fetch(endpoint, {method: "DELETE"});

    if (!response.ok) {
      setStatus("Could not delete the selected entry.");
      setDeletingId(null);
      return;
    }

    if (tab === "contacts") {
      setContacts((current) => current.filter((item) => item.id !== id));
    } else {
      setAdmissions((current) => current.filter((item) => item.id !== id));
    }

    setStatus("Entry deleted.");
    setDeletingId(null);
  }

  return (
    <div className="w-full space-y-5 mt-15 sm:mt-0 overflow-x-hidden sm:space-y-6">
      <div className="rounded-3xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-[#320056] sm:text-xl">
              Submissions manager
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Read and delete incoming contact messages and admission
              applications.
            </p>
          </div>

          <div className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            {activeCount} records shown
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
          {[
            ["contacts", "Contact inquiries"],
            ["admissions", "Admission applications"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key as "contacts" | "admissions")}
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                tab === key
                  ? "bg-[#320056] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "contacts" ? (
        <div className="grid gap-4 sm:p-5">
          {contacts.map((item) => {
            const isDeleting = deletingId === item.id;
            return (
              <article
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.75rem] sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#320056] sm:text-lg">
                      {item.fullName}
                    </h3>

                    <p className="mt-1 break-words text-sm leading-6 text-slate-500">
                      {item.email} · {item.phoneNumber || "No phone"}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteEntry(item.id)}
                    disabled={isDeleting}
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-70 sm:w-auto">
                    {isDeleting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={16} /> Delete
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 inline-flex max-w-full rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#005768]">
                  {item.inquiryType || "General"}
                </p>

                <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
                  {item.message}
                </p>
              </article>
            );
          })}

          {!contacts.length && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-500 sm:rounded-[1.75rem] sm:p-6">
              No contact submissions yet.
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:p-5">
          {admissions.map((item) => {
            const isDeleting = deletingId === item.id;
            return (
              <article
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.75rem] sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#320056] sm:text-lg">
                      {item.fullName}
                    </h3>

                    <p className="mt-1 break-words text-sm leading-6 text-slate-500">
                      {item.email} · {item.phoneNumber || "No phone"}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteEntry(item.id)}
                    disabled={isDeleting}
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-70 sm:w-auto">
                    {isDeleting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={16} /> Delete
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#005768]">
                      Programme
                    </p>

                    <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                      {item.programmeOfInterest || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#005768]">
                      Previous qualifications
                    </p>

                    <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                      {item.previousQualifications || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#005768]">
                    Applicant statement
                  </p>

                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
                    {item.statement || "No statement provided."}
                  </p>
                </div>
              </article>
            );
          })}

          {!admissions.length && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-500 sm:rounded-[1.75rem] sm:p-6">
              No admission applications yet.
            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl bg-slate-50 px-5 py-3 text-sm leading-6 text-slate-600">
        {status}
      </div>
    </div>
  );
}
