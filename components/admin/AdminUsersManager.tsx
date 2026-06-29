// "use client";

// import { useEffect, useState, FormEvent } from "react";
// import {
//   CheckCircle,
//   Edit2,
//   Eye,
//   EyeOff,
//   Loader2,
//   Plus,
//   Shield,
//   ShieldAlert,
//   Trash2,
//   UserCheck,
//   UserX,
//   X,
// } from "lucide-react";

// /* ────────── Types ────────── */
// interface AdminUser {
//   id: string;
//   name: string;
//   username: string;
//   email: string;
//   role: "SUPER_ADMIN" | "SUB_ADMIN";
//   isActive: boolean;
//   lastLogin: string | null;
//   createdAt: string;
//   creator?: { name: string } | null;
// }

// type ModalMode = "create" | "edit" | "delete" | null;

// /* ────────── Helpers ────────── */
// function formatDate(iso: string | null) {
//   if (!iso) return "Never";
//   return new Date(iso).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// /* ────────── Badge ────────── */
// function RoleBadge({ role }: { role: AdminUser["role"] }) {
//   if (role === "SUPER_ADMIN") {
//     return (
//       <span className="inline-flex items-center gap-1.5 rounded-full bg-[#320056]/10 px-3 py-1 text-xs font-black text-[#320056]">
//         <ShieldAlert size={12} />
//         Super Admin
//       </span>
//     );
//   }
//   return (
//     <span className="inline-flex items-center gap-1.5 rounded-full bg-[#005768]/10 px-3 py-1 text-xs font-black text-[#005768]">
//       <Shield size={12} />
//       Sub Admin
//     </span>
//   );
// }

// function StatusBadge({ active }: { active: boolean }) {
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
//         active
//           ? "bg-emerald-100 text-emerald-700"
//           : "bg-slate-100 text-slate-500"
//       }`}
//     >
//       {active ? <UserCheck size={12} /> : <UserX size={12} />}
//       {active ? "Active" : "Inactive"}
//     </span>
//   );
// }

// /* ────────── Toast ────────── */
// function Toast({
//   message,
//   type,
//   onClose,
// }: {
//   message: string;
//   type: "success" | "error";
//   onClose: () => void;
// }) {
//   useEffect(() => {
//     const t = setTimeout(onClose, 3500);
//     return () => clearTimeout(t);
//   }, [onClose]);

//   return (
//     <div
//       className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl ${
//         type === "success"
//           ? "bg-emerald-600 text-white"
//           : "bg-red-600 text-white"
//       }`}
//     >
//       {type === "success" ? <CheckCircle size={18} /> : <X size={18} />}
//       <span className="text-sm font-bold">{message}</span>
//       <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
//         <X size={16} />
//       </button>
//     </div>
//   );
// }

// /* ────────── Modal ────────── */
// function Modal({
//   title,
//   onClose,
//   children,
// }: {
//   title: string;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">
//       <div className="w-full max-w-lg rounded-[2rem] bg-white shadow-2xl">
//         <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
//           <h3 className="text-lg font-black text-[#320056]">{title}</h3>
//           <button
//             onClick={onClose}
//             className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
//           >
//             <X size={18} />
//           </button>
//         </div>
//         <div className="p-7">{children}</div>
//       </div>
//     </div>
//   );
// }

// /* ────────── Create / Edit Form ────────── */
// function AdminForm({
//   mode,
//   initial,
//   onSuccess,
//   onClose,
// }: {
//   mode: "create" | "edit";
//   initial?: AdminUser | null;
//   onSuccess: (msg: string) => void;
//   onClose: () => void;
// }) {
//   const [name, setName] = useState(initial?.name ?? "");
//   const [username, setUsername] = useState(initial?.username ?? "");
//   const [email, setEmail] = useState(initial?.email ?? "");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [isActive, setIsActive] = useState(initial?.isActive ?? true);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function submit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const url =
//       mode === "create"
//         ? "/api/admin/users"
//         : `/api/admin/users/${initial!.id}`;
//     const method = mode === "create" ? "POST" : "PATCH";

//     const payload: Record<string, unknown> =
//       mode === "create"
//         ? { name, username, email, password }
//         : { name, username, email, isActive, ...(password ? { password } : {}) };

//     const res = await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = (await res.json()) as { error?: string };
//     setLoading(false);

//     if (!res.ok) {
//       setError(data.error ?? "Something went wrong.");
//       return;
//     }

//     onSuccess(
//       mode === "create"
//         ? `Sub-admin "${name}" created successfully.`
//         : `Admin "${name}" updated successfully.`
//     );
//   }

//   return (
//     <form onSubmit={submit} className="space-y-4">
//       <div className="grid gap-4 sm:grid-cols-2">
//         <div className="space-y-1.5">
//           <label className="block text-xs font-black uppercase tracking-wide text-slate-500">
//             Full Name
//           </label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Jane Doe"
//             className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/15"
//             required
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="block text-xs font-black uppercase tracking-wide text-slate-500">
//             Username
//           </label>
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="jane.doe"
//             className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/15"
//             required
//           />
//         </div>
//       </div>

//       <div className="space-y-1.5">
//         <label className="block text-xs font-black uppercase tracking-wide text-slate-500">
//           Email Address
//         </label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="jane@ekinrin-ng.com"
//           className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/15"
//           required
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="block text-xs font-black uppercase tracking-wide text-slate-500">
//           {mode === "edit" ? "New Password (leave blank to keep current)" : "Password"}
//         </label>
//         <div className="relative">
//           <input
//             type={showPass ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder={mode === "edit" ? "••••••••" : "Min. 8 characters"}
//             className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] py-3 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#320056]/15"
//             required={mode === "create"}
//             minLength={mode === "create" ? 8 : undefined}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPass((v) => !v)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//           >
//             {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
//           </button>
//         </div>
//       </div>

//       {mode === "edit" && (
//         <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
//           <input
//             type="checkbox"
//             id="isActive"
//             checked={isActive}
//             onChange={(e) => setIsActive(e.target.checked)}
//             className="h-4 w-4 rounded accent-[#320056]"
//           />
//           <label htmlFor="isActive" className="text-sm font-bold text-slate-700">
//             Account is Active
//           </label>
//         </div>
//       )}

//       {error && (
//         <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
//           ⚠ {error}
//         </p>
//       )}

//       <div className="flex gap-3 pt-2">
//         <button
//           type="button"
//           onClick={onClose}
//           className="flex-1 rounded-full border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex-1 rounded-full bg-[#320056] py-3 text-sm font-black text-white shadow-md shadow-[#320056]/20 hover:bg-[#4b0082] disabled:opacity-60"
//         >
//           {loading ? (
//             <span className="flex items-center justify-center gap-2">
//               <Loader2 size={15} className="animate-spin" />
//               {mode === "create" ? "Creating…" : "Saving…"}
//             </span>
//           ) : mode === "create" ? (
//             "Create Sub-Admin"
//           ) : (
//             "Save Changes"
//           )}
//         </button>
//       </div>
//     </form>
//   );
// }

// /* ────────── Main Component ────────── */
// export default function AdminUsersManager() {
//   const [admins, setAdmins] = useState<AdminUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [fetchError, setFetchError] = useState("");
//   const [modal, setModal] = useState<ModalMode>(null);
//   const [selected, setSelected] = useState<AdminUser | null>(null);
//   const [deleting, setDeleting] = useState(false);
//   const [toast, setToast] = useState<{
//     msg: string;
//     type: "success" | "error";
//   } | null>(null);

//   async function loadAdmins() {
//     setLoading(true);
//     const res = await fetch("/api/admin/users");
//     if (!res.ok) {
//       setFetchError("Could not load admin users. You may not have permission.");
//       setLoading(false);
//       return;
//     }
//     const data = (await res.json()) as { users: AdminUser[] };
//     setAdmins(data.users);
//     setLoading(false);
//   }

//   useEffect(() => {
//     loadAdmins();
//   }, []);

//   function openCreate() {
//     setSelected(null);
//     setModal("create");
//   }

//   function openEdit(admin: AdminUser) {
//     setSelected(admin);
//     setModal("edit");
//   }

//   function openDelete(admin: AdminUser) {
//     setSelected(admin);
//     setModal("delete");
//   }

//   function closeModal() {
//     setModal(null);
//     setSelected(null);
//   }

//   function handleSuccess(msg: string) {
//     closeModal();
//     setToast({ msg, type: "success" });
//     loadAdmins();
//   }

//   async function confirmDelete() {
//     if (!selected) return;
//     setDeleting(true);
//     const res = await fetch(`/api/admin/users/${selected.id}`, {
//       method: "DELETE",
//     });
//     setDeleting(false);
//     if (!res.ok) {
//       const data = (await res.json()) as { error?: string };
//       setToast({ msg: data.error ?? "Delete failed.", type: "error" });
//       closeModal();
//       return;
//     }
//     closeModal();
//     setToast({ msg: `Admin "${selected.name}" removed.`, type: "success" });
//     loadAdmins();
//   }

//   const superAdmins = admins.filter((a) => a.role === "SUPER_ADMIN");
//   const subAdmins = admins.filter((a) => a.role === "SUB_ADMIN");

//   return (
//     <div className="min-h-screen pt-16 lg:pt-0">
//       <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-black text-[#320056]">
//               Admin Management
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Create and manage sub-admins for the admin console.
//             </p>
//           </div>
//           <button
//             onClick={openCreate}
//             className="inline-flex items-center gap-2 rounded-full bg-[#320056] px-5 py-3 text-sm font-black text-white shadow-md shadow-[#320056]/20 transition hover:bg-[#4b0082] active:scale-[0.98]"
//           >
//             <Plus size={17} />
//             Create Sub-Admin
//           </button>
//         </div>

//         {/* Stats row */}
//         <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
//           {[
//             { label: "Total Admins", value: admins.length },
//             { label: "Super Admins", value: superAdmins.length },
//             {
//               label: "Active Sub-Admins",
//               value: subAdmins.filter((a) => a.isActive).length,
//             },
//           ].map(({ label, value }) => (
//             <div
//               key={label}
//               className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200/60"
//             >
//               <p className="text-2xl font-black text-[#320056]">{value}</p>
//               <p className="mt-0.5 text-xs font-semibold text-slate-500">
//                 {label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Content */}
//         {loading ? (
//           <div className="flex items-center justify-center py-24">
//             <Loader2 className="animate-spin text-[#320056]" size={32} />
//           </div>
//         ) : fetchError ? (
//           <div className="rounded-2xl bg-red-50 px-6 py-8 text-center">
//             <p className="text-sm font-semibold text-red-700">{fetchError}</p>
//           </div>
//         ) : (
//           <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-slate-50/80">
//                   <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400">
//                     Admin
//                   </th>
//                   <th className="hidden px-4 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400 sm:table-cell">
//                     Role
//                   </th>
//                   <th className="hidden px-4 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400 md:table-cell">
//                     Status
//                   </th>
//                   <th className="hidden px-4 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400 lg:table-cell">
//                     Last Login
//                   </th>
//                   <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-widest text-slate-400">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {admins.map((admin) => (
//                   <tr
//                     key={admin.id}
//                     className="transition-colors hover:bg-slate-50/60"
//                   >
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#320056]/10 text-sm font-black text-[#320056]">
//                           {admin.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-bold text-slate-800">
//                             {admin.name}
//                           </p>
//                           <p className="text-xs text-slate-400">
//                             @{admin.username} · {admin.email}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="hidden px-4 py-4 sm:table-cell">
//                       <RoleBadge role={admin.role} />
//                     </td>
//                     <td className="hidden px-4 py-4 md:table-cell">
//                       <StatusBadge active={admin.isActive} />
//                     </td>
//                     <td className="hidden px-4 py-4 text-xs text-slate-400 lg:table-cell">
//                       {formatDate(admin.lastLogin)}
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex items-center justify-end gap-1">
//                         {admin.role !== "SUPER_ADMIN" && (
//                           <>
//                             <button
//                               onClick={() => openEdit(admin)}
//                               title="Edit admin"
//                               className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-[#320056]/10 hover:text-[#320056]"
//                             >
//                               <Edit2 size={15} />
//                             </button>
//                             <button
//                               onClick={() => openDelete(admin)}
//                               title="Delete admin"
//                               className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
//                             >
//                               <Trash2 size={15} />
//                             </button>
//                           </>
//                         )}
//                         {admin.role === "SUPER_ADMIN" && (
//                           <span className="text-xs font-semibold text-slate-300">
//                             Protected
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}

//                 {admins.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="py-16 text-center text-sm text-slate-400"
//                     >
//                       No admin users found. Create the first sub-admin above.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* ── Create Modal ── */}
//       {modal === "create" && (
//         <Modal title="Create Sub-Admin" onClose={closeModal}>
//           <AdminForm
//             mode="create"
//             onSuccess={handleSuccess}
//             onClose={closeModal}
//           />
//         </Modal>
//       )}

//       {/* ── Edit Modal ── */}
//       {modal === "edit" && selected && (
//         <Modal title={`Edit Admin — ${selected.name}`} onClose={closeModal}>
//           <AdminForm
//             mode="edit"
//             initial={selected}
//             onSuccess={handleSuccess}
//             onClose={closeModal}
//           />
//         </Modal>
//       )}

//       {/* ── Delete Confirm Modal ── */}
//       {modal === "delete" && selected && (
//         <Modal title="Remove Admin Account" onClose={closeModal}>
//           <div className="space-y-5">
//             <p className="text-sm leading-6 text-slate-600">
//               Are you sure you want to permanently remove{" "}
//               <span className="font-bold text-[#320056]">{selected.name}</span>{" "}
//               (<span className="font-mono text-xs">{selected.email}</span>)?
//               This action cannot be undone.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={closeModal}
//                 className="flex-1 rounded-full border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 disabled={deleting}
//                 className="flex-1 rounded-full bg-red-600 py-3 text-sm font-black text-white hover:bg-red-700 disabled:opacity-60"
//               >
//                 {deleting ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <Loader2 size={15} className="animate-spin" />
//                     Removing…
//                   </span>
//                 ) : (
//                   "Yes, Remove"
//                 )}
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* ── Toast ── */}
//       {toast && (
//         <Toast
//           message={toast.msg}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import {useEffect, useState, FormEvent} from "react";
import {
  CheckCircle,
  Edit2,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  RefreshCw,
  Shield,
  ShieldAlert,
  Trash2,
  UserCheck,
  UserX,
  X,
} from "lucide-react";

/* ────────── Types ────────── */
interface AdminUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: "SUPER_ADMIN" | "SUB_ADMIN";
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  creator?: {name: string} | null;
}

type ModalMode = "create" | "edit" | "delete" | null;

/* ────────── Helpers ────────── */
function formatDate(iso: string | null) {
  if (!iso) return "Never";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ────────── Badge ────────── */
function RoleBadge({role}: {role: AdminUser["role"]}) {
  if (role === "SUPER_ADMIN") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#320056]/10 px-3 py-1 text-xs font-black text-[#320056]">
        <ShieldAlert size={12} />
        Super Admin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#005768]/10 px-3 py-1 text-xs font-black text-[#005768]">
      <Shield size={12} />
      Sub Admin
    </span>
  );
}

function StatusBadge({active}: {active: boolean}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
        active
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}>
      {active ? <UserCheck size={12} /> : <UserX size={12} />}
      {active ? "Active" : "Inactive"}
    </span>
  );
}

/* ────────── Toast ────────── */
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl ${
        type === "success"
          ? "bg-emerald-600 text-white"
          : "bg-red-600 text-white"
      }`}>
      {type === "success" ? <CheckCircle size={18} /> : <X size={18} />}
      <span className="text-sm font-bold">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
}

/* ────────── Modal ────────── */
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
          <h3 className="text-lg font-black text-[#320056]">{title}</h3>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200">
            <X size={18} />
          </button>
        </div>
        <div className="p-7">{children}</div>
      </div>
    </div>
  );
}

/* ────────── Create / Edit Form ────────── */
function AdminForm({
  mode,
  initial,
  onSuccess,
  onClose,
}: {
  mode: "create" | "edit";
  initial?: AdminUser | null;
  onSuccess: (msg: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [username, setUsername] = useState(initial?.username ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url =
      mode === "create"
        ? "/api/admin/users"
        : `/api/admin/users/${initial!.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const payload: Record<string, unknown> =
      mode === "create"
        ? {name, username, email, password}
        : {name, username, email, isActive, ...(password ? {password} : {})};

    const res = await fetch(url, {
      method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as {error?: string};
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    onSuccess(
      mode === "create"
        ? `Sub-admin "${name}" created successfully.`
        : `Admin "${name}" updated successfully.`,
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wide text-slate-500">
            Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/15"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wide text-slate-500">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="jane.doe"
            className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/15"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-black uppercase tracking-wide text-slate-500">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@ekinrin-ng.com"
          className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/15"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-black uppercase tracking-wide text-slate-500">
          {mode === "edit"
            ? "New Password (leave blank to keep current)"
            : "Password"}
        </label>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "edit" ? "••••••••" : "Min. 8 characters"}
            className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] py-3 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#320056]/15"
            required={mode === "create"}
            minLength={mode === "create" ? 8 : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {mode === "edit" && (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded accent-[#320056]"
          />
          <label
            htmlFor="isActive"
            className="text-sm font-bold text-slate-700">
            Account is Active
          </label>
        </div>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          ⚠ {error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-full border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-full bg-[#320056] py-3 text-sm font-black text-white shadow-md shadow-[#320056]/20 hover:bg-[#4b0082] disabled:opacity-60">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={15} className="animate-spin" />
              {mode === "create" ? "Creating…" : "Saving…"}
            </span>
          ) : mode === "create" ? (
            "Create Sub-Admin"
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}

/* ────────── Main Component ────────── */
export default function AdminUsersManager() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [modal, setModal] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  async function loadAdmins(isRefresh = false) {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);

    const res = await fetch("/api/admin/users");
    if (!res.ok) {
      setFetchError("Could not load admin users. You may not have permission.");
      if (isRefresh) setIsRefreshing(false);
      else setLoading(false);
      return;
    }
    const data = (await res.json()) as {users: AdminUser[]};
    setAdmins(data.users);

    if (isRefresh) setIsRefreshing(false);
    else setLoading(false);
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  function openCreate() {
    setSelected(null);
    setModal("create");
  }

  function openEdit(admin: AdminUser) {
    setSelected(admin);
    setModal("edit");
  }

  function openDelete(admin: AdminUser) {
    setSelected(admin);
    setModal("delete");
  }

  function closeModal() {
    setModal(null);
    setSelected(null);
  }

  function handleSuccess(msg: string) {
    closeModal();
    setToast({msg, type: "success"});
    loadAdmins();
  }

  async function confirmDelete() {
    if (!selected) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/users/${selected.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (!res.ok) {
      const data = (await res.json()) as {error?: string};
      setToast({msg: data.error ?? "Delete failed.", type: "error"});
      closeModal();
      return;
    }
    closeModal();
    setToast({msg: `Admin "${selected.name}" removed.`, type: "success"});
    loadAdmins();
  }

  const superAdmins = admins.filter((a) => a.role === "SUPER_ADMIN");
  const subAdmins = admins.filter((a) => a.role === "SUB_ADMIN");

  return (
    <div className="min-h-screen pt-16 lg:pt-0">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#320056]">
              Admin Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create and manage sub-admins for the admin console.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => loadAdmins(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-70">
              {isRefreshing ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <RefreshCw size={17} />
              )}
              Refresh
            </button>

            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-full bg-[#320056] px-5 py-3 text-sm font-black text-white shadow-md shadow-[#320056]/20 transition hover:bg-[#4b0082] active:scale-[0.98]">
              <Plus size={17} />
              Create Sub-Admin
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            {label: "Total Admins", value: admins.length},
            {label: "Super Admins", value: superAdmins.length},
            {
              label: "Active Sub-Admins",
              value: subAdmins.filter((a) => a.isActive).length,
            },
          ].map(({label, value}) => (
            <div
              key={label}
              className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200/60">
              <p className="text-2xl font-black text-[#320056]">{value}</p>
              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="animate-spin text-[#320056]" size={32} />
          </div>
        ) : fetchError ? (
          <div className="rounded-2xl bg-red-50 px-6 py-8 text-center">
            <p className="text-sm font-semibold text-red-700">{fetchError}</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400">
                    Admin
                  </th>
                  <th className="hidden px-4 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400 sm:table-cell">
                    Role
                  </th>
                  <th className="hidden px-4 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400 md:table-cell">
                    Status
                  </th>
                  <th className="hidden px-4 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400 lg:table-cell">
                    Last Login
                  </th>
                  <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-widest text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="transition-colors hover:bg-slate-50/60">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#320056]/10 text-sm font-black text-[#320056]">
                          {admin.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">
                            {admin.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            @{admin.username} · {admin.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">
                      <RoleBadge role={admin.role} />
                    </td>
                    <td className="hidden px-4 py-4 md:table-cell">
                      <StatusBadge active={admin.isActive} />
                    </td>
                    <td className="hidden px-4 py-4 text-xs text-slate-400 lg:table-cell">
                      {formatDate(admin.lastLogin)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {admin.role !== "SUPER_ADMIN" && (
                          <>
                            <button
                              onClick={() => openEdit(admin)}
                              title="Edit admin"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-[#320056]/10 hover:text-[#320056]">
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => openDelete(admin)}
                              title="Delete admin"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600">
                              <Trash2 size={15} />
                            </button>
                          </>
                        )}
                        {admin.role === "SUPER_ADMIN" && (
                          <span className="text-xs font-semibold text-slate-300">
                            Protected
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {admins.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-16 text-center text-sm text-slate-400">
                      No admin users found. Create the first sub-admin above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === "create" && (
        <Modal title="Create Sub-Admin" onClose={closeModal}>
          <AdminForm
            mode="create"
            onSuccess={handleSuccess}
            onClose={closeModal}
          />
        </Modal>
      )}

      {modal === "edit" && selected && (
        <Modal title={`Edit Admin — ${selected.name}`} onClose={closeModal}>
          <AdminForm
            mode="edit"
            initial={selected}
            onSuccess={handleSuccess}
            onClose={closeModal}
          />
        </Modal>
      )}

      {modal === "delete" && selected && (
        <Modal title="Remove Admin Account" onClose={closeModal}>
          <div className="space-y-5">
            <p className="text-sm leading-6 text-slate-600">
              Are you sure you want to permanently remove{" "}
              <span className="font-bold text-[#320056]">{selected.name}</span>{" "}
              (<span className="font-mono text-xs">{selected.email}</span>)?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded-full border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 rounded-full bg-red-600 py-3 text-sm font-black text-white hover:bg-red-700 disabled:opacity-60">
                {deleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={15} className="animate-spin" />
                    Removing…
                  </span>
                ) : (
                  "Yes, Remove"
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
