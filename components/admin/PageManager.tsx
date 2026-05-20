// // "use client";

// // import {useEffect, useMemo, useState} from "react";
// // import type {ReactNode} from "react";
// // import {
// //   CalendarDays,
// //   ChevronLeft,
// //   ChevronRight,
// //   Clock3,
// //   FileText,
// //   ImageIcon,
// //   Layers3,
// //   PencilLine,
// //   Plus,
// //   RefreshCw,
// //   Save,
// //   Search,
// //   Trash2,
// //   X,
// // } from "lucide-react";

// // type SitePageRecord = {
// //   id: string;
// //   slug: string;
// //   title: string;
// //   seoTitle?: string | null;
// //   seoDescription?: string | null;
// //   content: unknown;
// //   updatedAt?: string;
// // };

// // type ContentPrimitive = string | number | boolean | null;
// // type ContentObject = {[key: string]: ContentValue};
// // type ContentArray = ContentValue[];
// // type ContentValue = ContentPrimitive | ContentObject | ContentArray;
// // type Path = Array<string | number>;

// // type FormState = {
// //   slug: string;
// //   title: string;
// //   seoTitle: string;
// //   seoDescription: string;
// //   content: ContentObject;
// // };

// // const emptyForm: FormState = {
// //   slug: "",
// //   title: "",
// //   seoTitle: "",
// //   seoDescription: "",
// //   content: {},
// // };

// // const PAGE_SIZE = 3;

// // function isRecord(value: unknown): value is Record<string, unknown> {
// //   return typeof value === "object" && value !== null && !Array.isArray(value);
// // }

// // function isContentObject(value: ContentValue): value is ContentObject {
// //   return typeof value === "object" && value !== null && !Array.isArray(value);
// // }

// // function normaliseValue(value: unknown): ContentValue {
// //   if (value === null) return null;
// //   if (["string", "number", "boolean"].includes(typeof value)) {
// //     return value as ContentPrimitive;
// //   }
// //   if (Array.isArray(value)) return value.map((item) => normaliseValue(item));
// //   if (isRecord(value)) {
// //     return Object.fromEntries(
// //       Object.entries(value).map(([key, item]) => [key, normaliseValue(item)]),
// //     );
// //   }
// //   return "";
// // }

// // function normaliseObject(value: unknown): ContentObject {
// //   const normalised = normaliseValue(value);
// //   return isContentObject(normalised) ? normalised : {};
// // }

// // function cloneContent<T extends ContentValue>(value: T): T {
// //   return JSON.parse(JSON.stringify(value)) as T;
// // }

// // function pathKey(path: Path) {
// //   return path.join(".") || "root";
// // }

// // function titleCase(input: string | number) {
// //   return String(input)
// //     .replace(/([a-z])([A-Z])/g, "$1 $2")
// //     .replace(/[-_]/g, " ")
// //     .replace(/\s+/g, " ")
// //     .trim()
// //     .replace(/^./, (char) => char.toUpperCase());
// // }

// // function isLongTextField(key: string | number, value: ContentPrimitive) {
// //   const name = String(key).toLowerCase();
// //   return (
// //     typeof value === "string" &&
// //     (value.length > 80 ||
// //       name.includes("description") ||
// //       name.includes("body") ||
// //       name.includes("paragraph") ||
// //       name.includes("intro") ||
// //       name.includes("outro") ||
// //       name.includes("quote") ||
// //       name.includes("note"))
// //   );
// // }

// // function isImageField(
// //   path: Path,
// //   key: string | number,
// //   value: ContentPrimitive,
// // ) {
// //   if (typeof value !== "string") return false;
// //   const fieldName = String(key).toLowerCase();
// //   const fullPath = path.map(String).join(".").toLowerCase();
// //   const imageNameHints = [
// //     "image",
// //     "img",
// //     "photo",
// //     "avatar",
// //     "thumbnail",
// //     "cover",
// //     "banner",
// //     "logo",
// //     "portrait",
// //     "background",
// //   ];
// //   const imageValueHints = [
// //     ".jpg",
// //     ".jpeg",
// //     ".png",
// //     ".webp",
// //     ".gif",
// //     ".svg",
// //     "/uploads/",
// //     "images.unsplash.com",
// //     "lh3.googleusercontent.com",
// //   ];

// //   return (
// //     imageNameHints.some(
// //       (hint) => fieldName.includes(hint) || fullPath.includes(hint),
// //     ) ||
// //     ((fieldName === "src" || fieldName === "url") &&
// //       imageValueHints.some((hint) => value.toLowerCase().includes(hint)))
// //   );
// // }

// // function getAtPath(root: ContentObject, path: Path): ContentValue | undefined {
// //   let current: ContentValue = root;
// //   for (const segment of path) {
// //     if (Array.isArray(current) && typeof segment === "number")
// //       current = current[segment];
// //     else if (isContentObject(current) && typeof segment === "string")
// //       current = current[segment];
// //     else return undefined;
// //   }
// //   return current;
// // }

// // function setAtPath(
// //   root: ContentObject,
// //   path: Path,
// //   value: ContentValue,
// // ): ContentObject {
// //   if (path.length === 0) return isContentObject(value) ? value : root;
// //   const copy = cloneContent(root);
// //   let current: ContentValue = copy;

// //   path.forEach((segment, index) => {
// //     const isLast = index === path.length - 1;
// //     if (isLast) {
// //       if (Array.isArray(current) && typeof segment === "number")
// //         current[segment] = value;
// //       if (isContentObject(current) && typeof segment === "string")
// //         current[segment] = value;
// //       return;
// //     }

// //     if (Array.isArray(current) && typeof segment === "number")
// //       current = current[segment];
// //     else if (isContentObject(current) && typeof segment === "string")
// //       current = current[segment];
// //   });

// //   return copy;
// // }

// // function removeAtPath(root: ContentObject, path: Path): ContentObject {
// //   const copy = cloneContent(root);
// //   const parentPath = path.slice(0, -1);
// //   const last = path[path.length - 1];
// //   const parent = getAtPath(copy, parentPath);

// //   if (Array.isArray(parent) && typeof last === "number") parent.splice(last, 1);
// //   if (isContentObject(parent) && typeof last === "string") delete parent[last];

// //   return copy;
// // }

// // function getEmptyArrayItem(items: ContentArray): ContentValue {
// //   const sample = items[items.length - 1];
// //   if (sample === undefined) return "";
// //   if (typeof sample === "string") return "";
// //   if (typeof sample === "number") return 0;
// //   if (typeof sample === "boolean") return false;
// //   if (sample === null) return "";
// //   if (Array.isArray(sample)) return [];
// //   return Object.fromEntries(Object.keys(sample).map((key) => [key, ""]));
// // }

// // function coercePrimitive(
// //   original: ContentPrimitive,
// //   value: string,
// // ): ContentPrimitive {
// //   if (typeof original === "number") return Number(value) || 0;
// //   if (original === null) return value;
// //   return value;
// // }

// // function imageAltFromFileName(fileName: string) {
// //   return fileName
// //     .replace(/\.[^/.]+$/, "")
// //     .replace(/[-_]+/g, " ")
// //     .replace(/\s+/g, " ")
// //     .trim()
// //     .replace(/^./, (char) => char.toUpperCase());
// // }

// // function getSiblingAltPath(path: Path): Path | null {
// //   if (!path.length) return null;
// //   const parentPath = path.slice(0, -1);
// //   const last = String(path[path.length - 1]).toLowerCase();
// //   const altKey = last.includes("logo")
// //     ? "logoAlt"
// //     : last.includes("avatar") || last.includes("portrait")
// //       ? "avatarAlt"
// //       : "alt";
// //   return [...parentPath, altKey];
// // }

// // function pageDescription(page: SitePageRecord) {
// //   const content = normaliseObject(page.content);
// //   const firstKey = Object.keys(content)[0];
// //   if (!firstKey) return "Empty page content record";
// //   return `Contains ${Object.keys(content).length} editable section${Object.keys(content).length === 1 ? "" : "s"}: ${titleCase(firstKey)}${Object.keys(content).length > 1 ? "..." : ""}`;
// // }

// // function updatedDate(page?: SitePageRecord) {
// //   if (!page?.updatedAt) return "Not saved yet";
// //   return new Intl.DateTimeFormat("en", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   }).format(new Date(page.updatedAt));
// // }

// // export default function PageManager() {
// //   const [pages, setPages] = useState<SitePageRecord[]>([]);
// //   const [selectedSlug, setSelectedSlug] = useState<string>("");
// //   const [form, setForm] = useState<FormState>(emptyForm);
// //   const [status, setStatus] = useState<string>("");
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [isEditorOpen, setIsEditorOpen] = useState(false);
// //   const [fieldDrafts, setFieldDrafts] = useState<Record<string, string>>({});
// //   const [uploadingFields, setUploadingFields] = useState<
// //     Record<string, boolean>
// //   >({});

// //   async function loadPages() {
// //     setLoading(true);
// //     setStatus("");
// //     const response = await fetch("/api/cms", {cache: "no-store"});
// //     const data = (await response.json()) as SitePageRecord[];
// //     setPages(data);
// //     setLoading(false);

// //     if (!selectedSlug && data.length) {
// //       hydrateForm(data[0]);
// //       setSelectedSlug(data[0].slug);
// //     }
// //   }

// //   useEffect(() => {
// //     void loadPages();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   const sortedPages = useMemo(() => {
// //     const term = searchTerm.trim().toLowerCase();
// //     const sorted = [...pages].sort((a, b) => a.title.localeCompare(b.title));
// //     if (!term) return sorted;
// //     return sorted.filter((page) =>
// //       `${page.title} ${page.slug}`.toLowerCase().includes(term),
// //     );
// //   }, [pages, searchTerm]);

// //   const totalPages = Math.max(1, Math.ceil(sortedPages.length / PAGE_SIZE));
// //   const paginatedPages = sortedPages.slice(
// //     (currentPage - 1) * PAGE_SIZE,
// //     currentPage * PAGE_SIZE,
// //   );
// //   const selectedPage = pages.find((page) => page.slug === selectedSlug);

// //   function hydrateForm(page: SitePageRecord) {
// //     setForm({
// //       slug: page.slug,
// //       title: page.title,
// //       seoTitle: page.seoTitle ?? "",
// //       seoDescription: page.seoDescription ?? "",
// //       content: normaliseObject(page.content),
// //     });
// //   }

// //   function resetForm() {
// //     setSelectedSlug("");
// //     setForm({
// //       ...emptyForm,
// //       content: {
// //         hero: {
// //           eyebrow: "",
// //           title: "",
// //           description: "",
// //         },
// //       },
// //     });
// //     setIsEditorOpen(true);
// //     setStatus("Creating a new page record.");
// //   }

// //   function updateContent(path: Path, value: ContentValue) {
// //     setForm((current) => ({
// //       ...current,
// //       content: setAtPath(current.content, path, value),
// //     }));
// //   }

// //   function removeContent(path: Path) {
// //     setForm((current) => ({
// //       ...current,
// //       content: removeAtPath(current.content, path),
// //     }));
// //   }

// //   function addArrayItem(path: Path, items: ContentArray) {
// //     updateContent(path, [...items, getEmptyArrayItem(items)]);
// //   }

// //   function addObjectField(path: Path) {
// //     const key = pathKey(path);
// //     const fieldName = fieldDrafts[key]?.trim();
// //     if (!fieldName) return;
// //     const target = getAtPath(form.content, path);
// //     if (!isContentObject(target) || target[fieldName] !== undefined) return;
// //     updateContent(path, {...target, [fieldName]: ""});
// //     setFieldDrafts((current) => ({...current, [key]: ""}));
// //   }

// //   async function savePage() {
// //     const payload = {
// //       slug: form.slug.trim(),
// //       title: form.title.trim(),
// //       seoTitle: form.seoTitle.trim(),
// //       seoDescription: form.seoDescription.trim(),
// //       content: form.content,
// //     };

// //     if (!payload.slug || !payload.title) {
// //       setStatus("Slug and title are required.");
// //       return;
// //     }

// //     const isNew =
// //       !selectedSlug || !pages.some((page) => page.slug === selectedSlug);
// //     const endpoint = isNew ? "/api/cms" : `/api/cms/${selectedSlug}`;
// //     const method = isNew ? "POST" : "PUT";

// //     const response = await fetch(endpoint, {
// //       method,
// //       headers: {"Content-Type": "application/json"},
// //       body: JSON.stringify(payload),
// //     });

// //     if (!response.ok) {
// //       const error = (await response.json()) as {error?: string};
// //       setStatus(error.error || "Could not save page.");
// //       return;
// //     }

// //     const saved = (await response.json()) as SitePageRecord;
// //     await loadPages();
// //     setSelectedSlug(saved.slug);
// //     hydrateForm(saved);
// //     setStatus(`Saved ${saved.title}.`);
// //   }

// //   async function deletePage(slug = selectedSlug) {
// //     if (!slug) return;
// //     const confirmed = window.confirm(`Delete the page "${slug}"?`);
// //     if (!confirmed) return;

// //     const response = await fetch(`/api/cms/${slug}`, {method: "DELETE"});
// //     if (!response.ok) {
// //       setStatus("Could not delete the page.");
// //       return;
// //     }

// //     setStatus(`Deleted ${slug}.`);
// //     setSelectedSlug("");
// //     setForm(emptyForm);
// //     setIsEditorOpen(false);
// //     await loadPages();
// //   }

// //   async function uploadImageFromDevice(path: Path, file: File | null) {
// //     if (!file) return;
// //     if (!file.type.startsWith("image/")) {
// //       setStatus("Please choose a valid image file.");
// //       return;
// //     }

// //     const key = pathKey(path);
// //     const formData = new FormData();
// //     formData.append("file", file);

// //     setUploadingFields((current) => ({...current, [key]: true}));
// //     setStatus(`Uploading ${file.name}...`);

// //     try {
// //       const response = await fetch("/api/uploads", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       const data = (await response.json()) as {url?: string; error?: string};
// //       if (!response.ok || !data.url) {
// //         setStatus(data.error || "Could not upload image.");
// //         return;
// //       }

// //       setForm((current) => {
// //         let nextContent = setAtPath(current.content, path, data.url);
// //         const altPath = getSiblingAltPath(path);
// //         if (altPath) {
// //           const existingAlt = getAtPath(nextContent, altPath);
// //           if (
// //             existingAlt === undefined ||
// //             existingAlt === null ||
// //             String(existingAlt).trim() === ""
// //           ) {
// //             nextContent = setAtPath(
// //               nextContent,
// //               altPath,
// //               imageAltFromFileName(file.name),
// //             );
// //           }
// //         }
// //         return {...current, content: nextContent};
// //       });
// //       setStatus(
// //         "Image uploaded. Alt text was added as editable text. Remember to save the page to store the image and alt text in PostgreSQL.",
// //       );
// //     } catch {
// //       setStatus("Could not upload image. Please try again.");
// //     } finally {
// //       setUploadingFields((current) => ({...current, [key]: false}));
// //     }
// //   }

// //   function renderPrimitive(
// //     path: Path,
// //     label: string | number,
// //     value: ContentPrimitive,
// //   ) {
// //     const inputBase =
// //       "w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition focus:ring-[#320056]/25";

// //     if (typeof value === "boolean") {
// //       return (
// //         <label className="flex items-center justify-between gap-4 rounded-xl bg-[#f7f9fc] px-4 py-3 text-sm font-bold text-[#320056]">
// //           <span>{titleCase(label)}</span>
// //           <input
// //             type="checkbox"
// //             checked={value}
// //             onChange={(event) => updateContent(path, event.target.checked)}
// //             className="h-5 w-5 rounded border-slate-300 text-[#320056] focus:ring-[#320056]/20"
// //           />
// //         </label>
// //       );
// //     }

// //     if (isImageField(path, label, value)) {
// //       const key = pathKey(path);
// //       const imageValue = value === null ? "" : String(value);
// //       return (
// //         <div className="space-y-3 rounded-2xl bg-[#f7f9fc] p-4 text-sm font-bold text-[#320056] ring-1 ring-slate-100">
// //           <div className="flex items-center justify-between gap-3">
// //             <span className="uppercase tracking-[0.14em] text-[11px] text-slate-400">
// //               {titleCase(label)}
// //             </span>
// //             <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#005768]">
// //               <ImageIcon size={13} /> Device Upload
// //             </span>
// //           </div>

// //           {imageValue ? (
// //             <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-100">
// //               {/* eslint-disable-next-line @next/next/no-img-element */}
// //               <img
// //                 src={imageValue}
// //                 alt={String(label)}
// //                 className="h-40 w-full object-cover"
// //               />
// //             </div>
// //           ) : (
// //             <div className="flex h-40 w-full items-center justify-center rounded-xl bg-white text-slate-300 ring-1 ring-slate-100">
// //               <ImageIcon size={36} />
// //             </div>
// //           )}

// //           <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#005768]/30 bg-white px-4 py-4 text-center transition hover:bg-[#50d9fe]/10">
// //             <span className="text-sm font-extrabold text-[#320056]">
// //               {uploadingFields[key]
// //                 ? "Uploading image..."
// //                 : "Choose image from your device"}
// //             </span>
// //             <span className="mt-1 text-xs font-medium text-slate-400">
// //               PNG, JPG, JPEG, WEBP, GIF, or SVG. Alt text stays as a normal
// //               editable text field.
// //             </span>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               disabled={uploadingFields[key]}
// //               onChange={(event) =>
// //                 void uploadImageFromDevice(
// //                   path,
// //                   event.target.files?.[0] ?? null,
// //                 )
// //               }
// //               className="sr-only"
// //             />
// //           </label>

// //           <div className="rounded-xl bg-white px-4 py-3 text-xs font-medium text-slate-500 ring-1 ring-slate-100">
// //             <span className="block font-black uppercase tracking-widest text-slate-400">
// //               Saved path
// //             </span>
// //             <span className="mt-1 block break-all">
// //               {imageValue || "No image selected yet"}
// //             </span>
// //           </div>
// //         </div>
// //       );
// //     }

// //     return (
// //       <label className="space-y-2 text-sm font-bold text-[#320056]">
// //         <span className="uppercase tracking-[0.14em] text-[11px] text-slate-400">
// //           {titleCase(label)}
// //         </span>
// //         {isLongTextField(label, value) ? (
// //           <textarea
// //             value={value === null ? "" : String(value)}
// //             onChange={(event) =>
// //               updateContent(path, coercePrimitive(value, event.target.value))
// //             }
// //             className={`${inputBase} min-h-28 resize-y`}
// //           />
// //         ) : (
// //           <input
// //             type={typeof value === "number" ? "number" : "text"}
// //             value={value === null ? "" : String(value)}
// //             onChange={(event) =>
// //               updateContent(path, coercePrimitive(value, event.target.value))
// //             }
// //             className={inputBase}
// //           />
// //         )}
// //       </label>
// //     );
// //   }

// //   function renderValue(
// //     path: Path,
// //     label: string | number,
// //     value: ContentValue,
// //     depth = 0,
// //   ): ReactNode {
// //     if (Array.isArray(value)) {
// //       return (
// //         <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
// //           <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
// //             <div>
// //               <p className="text-sm font-black uppercase tracking-[0.18em] text-[#320056]">
// //                 {titleCase(label)}
// //               </p>
// //               <p className="text-xs text-slate-400">
// //                 {value.length} editable item{value.length === 1 ? "" : "s"}
// //               </p>
// //             </div>
// //             <button
// //               type="button"
// //               onClick={() => addArrayItem(path, value)}
// //               className="inline-flex items-center gap-2 rounded-full bg-[#320056] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#320056]/10">
// //               <Plus size={14} /> Add item
// //             </button>
// //           </div>

// //           <div className="space-y-4">
// //             {value.map((item, index) => (
// //               <div
// //                 key={`${pathKey(path)}-${index}`}
// //                 className="rounded-2xl border-l-4 border-[#005768] bg-[#f7f9fc] p-4">
// //                 <div className="mb-3 flex items-center justify-between gap-3">
// //                   <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
// //                     Item {index + 1}
// //                   </p>
// //                   <button
// //                     type="button"
// //                     onClick={() => removeContent([...path, index])}
// //                     className="rounded-full p-2 text-red-600 transition hover:bg-red-50"
// //                     aria-label={`Remove ${titleCase(label)} item ${index + 1}`}>
// //                     <Trash2 size={15} />
// //                   </button>
// //                 </div>
// //                 {renderValue([...path, index], index, item, depth + 1)}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       );
// //     }

// //     if (isContentObject(value)) {
// //       const entries = Object.entries(value);
// //       const key = pathKey(path);
// //       return (
// //         <div
// //           className={`rounded-2xl ${depth === 0 ? "bg-transparent" : "border border-slate-100 bg-white p-4 shadow-sm"}`}>
// //           {depth > 0 && (
// //             <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
// //               <p className="text-sm font-black uppercase tracking-[0.18em] text-[#320056]">
// //                 {titleCase(label)}
// //               </p>
// //               <button
// //                 type="button"
// //                 onClick={() => removeContent(path)}
// //                 className="rounded-full p-2 text-red-600 transition hover:bg-red-50">
// //                 <Trash2 size={15} />
// //               </button>
// //             </div>
// //           )}

// //           <div className="grid gap-4 md:grid-cols-2">
// //             {entries.map(([field, item]) => (
// //               <div
// //                 key={`${key}-${field}`}
// //                 className={
// //                   isContentObject(item) || Array.isArray(item)
// //                     ? "md:col-span-2"
// //                     : ""
// //                 }>
// //                 {renderValue([...path, field], field, item, depth + 1)}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-[#f7f9fc] p-3 sm:flex-row">
// //             <input
// //               value={fieldDrafts[key] ?? ""}
// //               onChange={(event) =>
// //                 setFieldDrafts((current) => ({
// //                   ...current,
// //                   [key]: event.target.value,
// //                 }))
// //               }
// //               placeholder="Add new field name, e.g. subtitle"
// //               className="min-w-0 flex-1 rounded-xl border-none bg-white px-4 py-2 text-sm outline-none ring-1 ring-slate-100 focus:ring-[#320056]/25"
// //             />
// //             <button
// //               type="button"
// //               onClick={() => addObjectField(path)}
// //               className="rounded-xl bg-[#005768] px-4 py-2 text-sm font-bold text-white">
// //               Add field
// //             </button>
// //           </div>
// //         </div>
// //       );
// //     }

// //     return renderPrimitive(path, label, value);
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f7f9fc] text-[#191c1e]">
// //       <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/75 px-4 py-5 backdrop-blur-xl sm:px-6 lg:px-10">
// //         <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
// //           <div>
// //             <h1 className="font-sans text-2xl font-extrabold tracking-tight text-[#320056]">
// //               Pages Content Manager
// //             </h1>
// //             <p className="mt-1 text-sm font-medium text-slate-500">
// //               Create and edit every website page through form fields, not JSON.
// //             </p>
// //           </div>

// //           <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
// //             <div className="relative">
// //               <Search
// //                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
// //                 size={17}
// //               />
// //               <input
// //                 value={searchTerm}
// //                 onChange={(event) => {
// //                   setSearchTerm(event.target.value);
// //                   setCurrentPage(1);
// //                 }}
// //                 className="w-full rounded-full border-none bg-[#e6e8eb] py-3 pl-10 pr-4 text-sm outline-none ring-1 ring-transparent transition focus:ring-[#320056]/20 sm:w-72"
// //                 placeholder="Search pages..."
// //               />
// //             </div>
// //             <div className="hidden items-center gap-3 border-l border-slate-200 pl-5 lg:flex">
// //               <div className="text-right">
// //                 <p className="text-sm font-extrabold text-[#320056]">
// //                   Admin User
// //                 </p>
// //                 <p className="text-[10px] font-black uppercase tracking-widest text-[#005768]">
// //                   Administrator
// //                 </p>
// //               </div>
// //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#005768] text-sm font-black text-white ring-2 ring-[#320056]/10">
// //                 A
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="mx-auto max-w-7xl space-y-7 px-4 py-7 sm:px-6 lg:px-10">
// //         <section className="grid grid-cols-1 gap-5 lg:grid-cols-4">
// //           <div className="rounded-[1.4rem] bg-white p-5 shadow-sm lg:col-span-3">
// //             <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
// //               <div className="flex flex-wrap gap-3">
// //                 <span className="inline-flex items-center gap-2 rounded-full bg-[#320056]/5 px-4 py-2 text-sm font-bold text-[#320056]">
// //                   <span className="h-2 w-2 rounded-full bg-teal-500" />{" "}
// //                   {pages.length} Active Pages
// //                 </span>
// //                 <span className="inline-flex items-center gap-2 rounded-full bg-[#320056]/5 px-4 py-2 text-sm font-bold text-[#320056]">
// //                   <span className="h-2 w-2 rounded-full bg-amber-500" />{" "}
// //                   {
// //                     pages.filter(
// //                       (page) =>
// //                         Object.keys(normaliseObject(page.content)).length === 0,
// //                     ).length
// //                   }{" "}
// //                   Empty Records
// //                 </span>
// //               </div>

// //               <div className="flex flex-wrap gap-3">
// //                 <button
// //                   onClick={loadPages}
// //                   type="button"
// //                   className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
// //                   <RefreshCw size={16} /> Refresh
// //                 </button>
// //                 <button
// //                   onClick={resetForm}
// //                   type="button"
// //                   className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#320056] to-[#4b0082] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#320056]/20 transition hover:scale-[1.02] active:scale-95">
// //                   <Plus size={16} /> Add New Page
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex items-center justify-center gap-4 rounded-[1.4rem] border border-[#005768]/10 bg-[#50d9fe]/10 p-5">
// //             <CalendarDays className="text-[#005768]" size={24} />
// //             <div>
// //               <p className="text-[10px] font-black uppercase tracking-tight text-[#005768]">
// //                 Last Update
// //               </p>
// //               <p className="text-sm font-extrabold text-slate-800">
// //                 {updatedDate(selectedPage)}
// //               </p>
// //             </div>
// //           </div>
// //         </section>

// //         <section className="grid grid-cols-1 gap-5">
// //           {loading ? (
// //             <div className="rounded-2xl bg-white p-8 text-sm font-semibold text-slate-500">
// //               Loading editable pages...
// //             </div>
// //           ) : paginatedPages.length ? (
// //             paginatedPages.map((page) => {
// //               const isActive = selectedSlug === page.slug;
// //               const sections = Object.keys(normaliseObject(page.content));
// //               return (
// //                 <article
// //                   key={page.id}
// //                   className={`group relative overflow-hidden rounded-xl border-l-4 bg-white p-5 transition-all hover:shadow-xl hover:shadow-[#320056]/5 ${isActive ? "border-[#005768] ring-2 ring-[#005768]/10" : "border-slate-200"}`}>
// //                   <div className="flex flex-col gap-6 md:flex-row md:items-center">
// //                     <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-lg bg-[#e6e8eb] text-[#320056] md:w-44">
// //                       {page.slug === "gallery" ? (
// //                         <ImageIcon size={38} />
// //                       ) : (
// //                         <FileText size={38} />
// //                       )}
// //                     </div>

// //                     <div className="min-w-0 flex-1 space-y-2">
// //                       <div className="flex flex-wrap items-center gap-2">
// //                         <span className="rounded bg-[#f0dbff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#320056]">
// //                           /{page.slug || "new-page"}
// //                         </span>
// //                         <span className="rounded bg-[#b3ebff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#005768]">
// //                           {sections.length} Sections
// //                         </span>
// //                       </div>
// //                       <h2 className="font-sans text-xl font-extrabold text-[#320056]">
// //                         {page.title}
// //                       </h2>
// //                       <p className="max-w-3xl text-sm leading-6 text-slate-500">
// //                         {page.seoDescription || pageDescription(page)}
// //                       </p>
// //                       <div className="flex flex-wrap gap-5 pt-1 text-xs font-semibold text-slate-400">
// //                         <span className="inline-flex items-center gap-1">
// //                           <Clock3 size={14} /> Updated {updatedDate(page)}
// //                         </span>
// //                         <span className="inline-flex items-center gap-1">
// //                           <Layers3 size={14} />{" "}
// //                           {sections.slice(0, 4).map(titleCase).join(", ") ||
// //                             "No sections yet"}
// //                         </span>
// //                       </div>
// //                     </div>

// //                     <div className="flex gap-2 self-end md:self-center">
// //                       <button
// //                         type="button"
// //                         onClick={() => {
// //                           setSelectedSlug(page.slug);
// //                           hydrateForm(page);
// //                           setIsEditorOpen(true);
// //                           setStatus(`Editing ${page.title}.`);
// //                         }}
// //                         className="rounded-full p-3 text-[#320056] transition hover:bg-[#320056]/5"
// //                         title="Edit page">
// //                         <PencilLine size={18} />
// //                       </button>
// //                       <button
// //                         type="button"
// //                         onClick={() => void deletePage(page.slug)}
// //                         className="rounded-full p-3 text-red-600 transition hover:bg-red-50"
// //                         title="Delete page">
// //                         <Trash2 size={18} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <FileText
// //                     className="absolute -bottom-5 -right-5 text-[#320056] opacity-[0.03]"
// //                     size={96}
// //                   />
// //                 </article>
// //               );
// //             })
// //           ) : (
// //             <div className="rounded-2xl bg-white p-8 text-sm font-semibold text-slate-500">
// //               No pages match your search.
// //             </div>
// //           )}
// //         </section>

// //         <footer className="flex flex-col gap-4 border-t border-slate-100 py-6 sm:flex-row sm:items-center sm:justify-between">
// //           <p className="text-sm font-semibold text-slate-400">
// //             Showing{" "}
// //             <span className="text-slate-800">
// //               {sortedPages.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-
// //               {Math.min(currentPage * PAGE_SIZE, sortedPages.length)}
// //             </span>{" "}
// //             of <span className="text-slate-800">{sortedPages.length}</span>{" "}
// //             Website Pages
// //           </p>
// //           <div className="flex gap-2">
// //             <button
// //               type="button"
// //               onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
// //               className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100">
// //               <ChevronLeft size={18} />
// //             </button>
// //             {Array.from({length: totalPages}).map((_, index) => (
// //               <button
// //                 key={index}
// //                 type="button"
// //                 onClick={() => setCurrentPage(index + 1)}
// //                 className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${currentPage === index + 1 ? "bg-[#320056] text-white shadow-md" : "text-slate-500 hover:bg-slate-100"}`}>
// //                 {index + 1}
// //               </button>
// //             ))}
// //             <button
// //               type="button"
// //               onClick={() =>
// //                 setCurrentPage((page) => Math.min(totalPages, page + 1))
// //               }
// //               className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100">
// //               <ChevronRight size={18} />
// //             </button>
// //           </div>
// //         </footer>
// //       </div>

// //       {isEditorOpen && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#320056]/20 p-4 backdrop-blur-sm">
// //           <div className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[1.5rem] bg-white shadow-2xl">
// //             <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-start sm:justify-between lg:px-8">
// //               <div>
// //                 <h2 className="font-sans text-2xl font-extrabold text-[#320056]">
// //                   {selectedSlug ? `Edit ${form.title}` : "New Page Entry"}
// //                 </h2>
// //                 <p className="mt-1 text-sm text-slate-500">
// //                   Use the form fields below to update the database content for
// //                   this page.
// //                 </p>
// //               </div>
// //               <button
// //                 type="button"
// //                 onClick={() => setIsEditorOpen(false)}
// //                 className="self-end rounded-full p-2 text-slate-500 transition hover:bg-slate-100 sm:self-auto">
// //                 <X size={20} />
// //               </button>
// //             </div>

// //             <div className="max-h-[calc(92vh-170px)] overflow-y-auto px-5 py-6 lg:px-8">
// //               <div className="grid gap-4 md:grid-cols-2">
// //                 <label className="space-y-2 text-sm font-bold text-[#320056]">
// //                   <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
// //                     Page Slug
// //                   </span>
// //                   <input
// //                     value={form.slug}
// //                     onChange={(event) =>
// //                       setForm((current) => ({
// //                         ...current,
// //                         slug: event.target.value,
// //                       }))
// //                     }
// //                     className="w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
// //                     placeholder="home"
// //                   />
// //                 </label>
// //                 <label className="space-y-2 text-sm font-bold text-[#320056]">
// //                   <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
// //                     Page Title
// //                   </span>
// //                   <input
// //                     value={form.title}
// //                     onChange={(event) =>
// //                       setForm((current) => ({
// //                         ...current,
// //                         title: event.target.value,
// //                       }))
// //                     }
// //                     className="w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
// //                     placeholder="Home"
// //                   />
// //                 </label>
// //                 <label className="space-y-2 text-sm font-bold text-[#320056] md:col-span-2">
// //                   <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
// //                     SEO Title
// //                   </span>
// //                   <input
// //                     value={form.seoTitle}
// //                     onChange={(event) =>
// //                       setForm((current) => ({
// //                         ...current,
// //                         seoTitle: event.target.value,
// //                       }))
// //                     }
// //                     className="w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
// //                   />
// //                 </label>
// //                 <label className="space-y-2 text-sm font-bold text-[#320056] md:col-span-2">
// //                   <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
// //                     SEO Description
// //                   </span>
// //                   <textarea
// //                     value={form.seoDescription}
// //                     onChange={(event) =>
// //                       setForm((current) => ({
// //                         ...current,
// //                         seoDescription: event.target.value,
// //                       }))
// //                     }
// //                     className="min-h-24 w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
// //                   />
// //                 </label>
// //               </div>

// //               <div className="mt-7 space-y-5">
// //                 <div className="flex items-center justify-between gap-3">
// //                   <div>
// //                     <h3 className="font-sans text-lg font-extrabold text-[#320056]">
// //                       Editable Page Sections
// //                     </h3>
// //                     <p className="text-sm text-slate-500">
// //                       Every nested field below maps directly to the page content
// //                       stored in PostgreSQL.
// //                     </p>
// //                   </div>
// //                 </div>
// //                 {renderValue([], "content", form.content, 0)}
// //               </div>
// //             </div>

// //             <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
// //               <p className="rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-medium text-slate-600">
// //                 {status || "Update fields and save changes to PostgreSQL."}
// //               </p>
// //               <div className="flex justify-end gap-3">
// //                 <button
// //                   type="button"
// //                   onClick={() => setIsEditorOpen(false)}
// //                   className="rounded-full px-6 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100">
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => void savePage()}
// //                   className="inline-flex items-center gap-2 rounded-full bg-[#320056] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#320056]/20">
// //                   <Save size={16} /> Save Page
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import {useEffect, useMemo, useState} from "react";
// import type {ReactNode} from "react";
// import {
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   Clock3,
//   FileText,
//   ImageIcon,
//   Layers3,
//   PencilLine,
//   Plus,
//   RefreshCw,
//   Save,
//   Search,
//   Trash2,
//   X,
// } from "lucide-react";

// type SitePageRecord = {
//   id: string;
//   slug: string;
//   title: string;
//   seoTitle?: string | null;
//   seoDescription?: string | null;
//   content: unknown;
//   updatedAt?: string;
// };

// type ContentPrimitive = string | number | boolean | null;
// type ContentObject = {[key: string]: ContentValue};
// type ContentArray = ContentValue[];
// type ContentValue = ContentPrimitive | ContentObject | ContentArray;
// type Path = Array<string | number>;

// type FormState = {
//   slug: string;
//   title: string;
//   seoTitle: string;
//   seoDescription: string;
//   content: ContentObject;
// };

// const emptyForm: FormState = {
//   slug: "",
//   title: "",
//   seoTitle: "",
//   seoDescription: "",
//   content: {},
// };

// const PAGE_SIZE = 3;

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === "object" && value !== null && !Array.isArray(value);
// }

// function isContentObject(value: ContentValue): value is ContentObject {
//   return typeof value === "object" && value !== null && !Array.isArray(value);
// }

// function normaliseValue(value: unknown): ContentValue {
//   if (value === null) return null;
//   if (["string", "number", "boolean"].includes(typeof value)) {
//     return value as ContentPrimitive;
//   }
//   if (Array.isArray(value)) return value.map((item) => normaliseValue(item));
//   if (isRecord(value)) {
//     return Object.fromEntries(
//       Object.entries(value).map(([key, item]) => [key, normaliseValue(item)]),
//     );
//   }
//   return "";
// }

// function normaliseObject(value: unknown): ContentObject {
//   const normalised = normaliseValue(value);
//   return isContentObject(normalised) ? normalised : {};
// }

// function cloneContent<T extends ContentValue>(value: T): T {
//   return JSON.parse(JSON.stringify(value)) as T;
// }

// function pathKey(path: Path) {
//   return path.join(".") || "root";
// }

// function titleCase(input: string | number) {
//   return String(input)
//     .replace(/([a-z])([A-Z])/g, "$1 $2")
//     .replace(/[-_]/g, " ")
//     .replace(/\s+/g, " ")
//     .trim()
//     .replace(/^./, (char) => char.toUpperCase());
// }

// function isLongTextField(key: string | number, value: ContentPrimitive) {
//   const name = String(key).toLowerCase();
//   return (
//     typeof value === "string" &&
//     (value.length > 80 ||
//       name.includes("description") ||
//       name.includes("body") ||
//       name.includes("paragraph") ||
//       name.includes("intro") ||
//       name.includes("outro") ||
//       name.includes("quote") ||
//       name.includes("note"))
//   );
// }

// function isImageField(
//   path: Path,
//   key: string | number,
//   value: ContentPrimitive,
// ) {
//   if (typeof value !== "string") return false;

//   const fieldName = String(key).toLowerCase();
//   const fullPath = path.map(String).join(".").toLowerCase();

//   const imageNameHints = [
//     "image",
//     "img",
//     "photo",
//     "avatar",
//     "thumbnail",
//     "cover",
//     "banner",
//     "logo",
//     "portrait",
//     "background",
//   ];

//   const imageValueHints = [
//     ".jpg",
//     ".jpeg",
//     ".png",
//     ".webp",
//     ".gif",
//     ".svg",
//     "/uploads/",
//     "images.unsplash.com",
//     "lh3.googleusercontent.com",
//   ];

//   return (
//     imageNameHints.some(
//       (hint) => fieldName.includes(hint) || fullPath.includes(hint),
//     ) ||
//     ((fieldName === "src" || fieldName === "url") &&
//       imageValueHints.some((hint) => value.toLowerCase().includes(hint)))
//   );
// }

// function getAtPath(root: ContentObject, path: Path): ContentValue | undefined {
//   let current: ContentValue = root;

//   for (const segment of path) {
//     if (Array.isArray(current) && typeof segment === "number") {
//       current = current[segment];
//     } else if (isContentObject(current) && typeof segment === "string") {
//       current = current[segment];
//     } else {
//       return undefined;
//     }
//   }

//   return current;
// }

// function setAtPath(
//   root: ContentObject,
//   path: Path,
//   value: ContentValue,
// ): ContentObject {
//   if (path.length === 0) return isContentObject(value) ? value : root;

//   const copy = cloneContent(root);
//   let current: ContentValue = copy;

//   path.forEach((segment, index) => {
//     const isLast = index === path.length - 1;

//     if (isLast) {
//       if (Array.isArray(current) && typeof segment === "number") {
//         current[segment] = value;
//       }

//       if (isContentObject(current) && typeof segment === "string") {
//         current[segment] = value;
//       }

//       return;
//     }

//     if (Array.isArray(current) && typeof segment === "number") {
//       current = current[segment];
//     } else if (isContentObject(current) && typeof segment === "string") {
//       current = current[segment];
//     }
//   });

//   return copy;
// }

// function removeAtPath(root: ContentObject, path: Path): ContentObject {
//   const copy = cloneContent(root);
//   const parentPath = path.slice(0, -1);
//   const last = path[path.length - 1];
//   const parent = getAtPath(copy, parentPath);

//   if (Array.isArray(parent) && typeof last === "number") parent.splice(last, 1);
//   if (isContentObject(parent) && typeof last === "string") delete parent[last];

//   return copy;
// }

// function getEmptyArrayItem(items: ContentArray): ContentValue {
//   const sample = items[items.length - 1];

//   if (sample === undefined) return "";
//   if (typeof sample === "string") return "";
//   if (typeof sample === "number") return 0;
//   if (typeof sample === "boolean") return false;
//   if (sample === null) return "";
//   if (Array.isArray(sample)) return [];

//   return Object.fromEntries(Object.keys(sample).map((key) => [key, ""]));
// }

// function coercePrimitive(
//   original: ContentPrimitive,
//   value: string,
// ): ContentPrimitive {
//   if (typeof original === "number") return Number(value) || 0;
//   if (original === null) return value;
//   return value;
// }

// function imageAltFromFileName(fileName: string) {
//   return fileName
//     .replace(/\.[^/.]+$/, "")
//     .replace(/[-_]+/g, " ")
//     .replace(/\s+/g, " ")
//     .trim()
//     .replace(/^./, (char) => char.toUpperCase());
// }

// function getSiblingAltPath(path: Path): Path | null {
//   if (!path.length) return null;

//   const parentPath = path.slice(0, -1);
//   const last = String(path[path.length - 1]).toLowerCase();

//   const altKey = last.includes("logo")
//     ? "logoAlt"
//     : last.includes("avatar") || last.includes("portrait")
//       ? "avatarAlt"
//       : "alt";

//   return [...parentPath, altKey];
// }

// function pageDescription(page: SitePageRecord) {
//   const content = normaliseObject(page.content);
//   const firstKey = Object.keys(content)[0];

//   if (!firstKey) return "Empty page content record";

//   return `Contains ${Object.keys(content).length} editable section${
//     Object.keys(content).length === 1 ? "" : "s"
//   }: ${titleCase(firstKey)}${Object.keys(content).length > 1 ? "..." : ""}`;
// }

// function updatedDate(page?: SitePageRecord) {
//   if (!page?.updatedAt) return "Not saved yet";

//   return new Intl.DateTimeFormat("en", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   }).format(new Date(page.updatedAt));
// }

// export default function PageManager() {
//   const [pages, setPages] = useState<SitePageRecord[]>([]);
//   const [selectedSlug, setSelectedSlug] = useState<string>("");
//   const [form, setForm] = useState<FormState>(emptyForm);
//   const [status, setStatus] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isEditorOpen, setIsEditorOpen] = useState(false);
//   const [fieldDrafts, setFieldDrafts] = useState<Record<string, string>>({});
//   const [uploadingFields, setUploadingFields] = useState<
//     Record<string, boolean>
//   >({});

//   async function loadPages() {
//     setLoading(true);
//     setStatus("");

//     const response = await fetch("/api/cms", {cache: "no-store"});
//     const data = (await response.json()) as SitePageRecord[];

//     setPages(data);
//     setLoading(false);

//     if (!selectedSlug && data.length) {
//       hydrateForm(data[0]);
//       setSelectedSlug(data[0].slug);
//     }
//   }

//   useEffect(() => {
//     void loadPages();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const sortedPages = useMemo(() => {
//     const term = searchTerm.trim().toLowerCase();
//     const sorted = [...pages].sort((a, b) => a.title.localeCompare(b.title));

//     if (!term) return sorted;

//     return sorted.filter((page) =>
//       `${page.title} ${page.slug}`.toLowerCase().includes(term),
//     );
//   }, [pages, searchTerm]);

//   const totalPages = Math.max(1, Math.ceil(sortedPages.length / PAGE_SIZE));
//   const paginatedPages = sortedPages.slice(
//     (currentPage - 1) * PAGE_SIZE,
//     currentPage * PAGE_SIZE,
//   );
//   const selectedPage = pages.find((page) => page.slug === selectedSlug);

//   function hydrateForm(page: SitePageRecord) {
//     setForm({
//       slug: page.slug,
//       title: page.title,
//       seoTitle: page.seoTitle ?? "",
//       seoDescription: page.seoDescription ?? "",
//       content: normaliseObject(page.content),
//     });
//   }

//   function resetForm() {
//     setSelectedSlug("");
//     setForm({
//       ...emptyForm,
//       content: {
//         hero: {
//           eyebrow: "",
//           title: "",
//           description: "",
//         },
//       },
//     });
//     setIsEditorOpen(true);
//     setStatus("Creating a new page record.");
//   }

//   function updateContent(path: Path, value: ContentValue) {
//     setForm((current) => ({
//       ...current,
//       content: setAtPath(current.content, path, value),
//     }));
//   }

//   function removeContent(path: Path) {
//     setForm((current) => ({
//       ...current,
//       content: removeAtPath(current.content, path),
//     }));
//   }

//   function addArrayItem(path: Path, items: ContentArray) {
//     updateContent(path, [...items, getEmptyArrayItem(items)]);
//   }

//   function addObjectField(path: Path) {
//     const key = pathKey(path);
//     const fieldName = fieldDrafts[key]?.trim();

//     if (!fieldName) return;

//     const target = getAtPath(form.content, path);

//     if (!isContentObject(target) || target[fieldName] !== undefined) return;

//     updateContent(path, {...target, [fieldName]: ""});
//     setFieldDrafts((current) => ({...current, [key]: ""}));
//   }

//   async function savePage() {
//     const payload = {
//       slug: form.slug.trim(),
//       title: form.title.trim(),
//       seoTitle: form.seoTitle.trim(),
//       seoDescription: form.seoDescription.trim(),
//       content: form.content,
//     };

//     if (!payload.slug || !payload.title) {
//       setStatus("Slug and title are required.");
//       return;
//     }

//     const isNew =
//       !selectedSlug || !pages.some((page) => page.slug === selectedSlug);
//     const endpoint = isNew ? "/api/cms" : `/api/cms/${selectedSlug}`;
//     const method = isNew ? "POST" : "PUT";

//     const response = await fetch(endpoint, {
//       method,
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const error = (await response.json()) as {error?: string};
//       setStatus(error.error || "Could not save page.");
//       return;
//     }

//     const saved = (await response.json()) as SitePageRecord;

//     await loadPages();
//     setSelectedSlug(saved.slug);
//     hydrateForm(saved);
//     setStatus(`Saved ${saved.title}.`);
//   }

//   async function deletePage(slug = selectedSlug) {
//     if (!slug) return;

//     const confirmed = window.confirm(`Delete the page "${slug}"?`);
//     if (!confirmed) return;

//     const response = await fetch(`/api/cms/${slug}`, {method: "DELETE"});

//     if (!response.ok) {
//       setStatus("Could not delete the page.");
//       return;
//     }

//     setStatus(`Deleted ${slug}.`);
//     setSelectedSlug("");
//     setForm(emptyForm);
//     setIsEditorOpen(false);
//     await loadPages();
//   }

//   async function uploadImageFromDevice(path: Path, file: File | null) {
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setStatus("Please choose a valid image file.");
//       return;
//     }

//     const key = pathKey(path);
//     const formData = new FormData();

//     formData.append("file", file);

//     setUploadingFields((current) => ({...current, [key]: true}));
//     setStatus(`Uploading ${file.name}...`);

//     try {
//       const response = await fetch("/api/uploads", {
//         method: "POST",
//         body: formData,
//       });

//       const data = (await response.json()) as {url?: string; error?: string};

//       if (!response.ok || !data.url) {
//         setStatus(data.error || "Could not upload image.");
//         return;
//       }

//       setForm((current) => {
//         let nextContent = setAtPath(current.content, path, data.url);
//         const altPath = getSiblingAltPath(path);

//         if (altPath) {
//           const existingAlt = getAtPath(nextContent, altPath);

//           if (
//             existingAlt === undefined ||
//             existingAlt === null ||
//             String(existingAlt).trim() === ""
//           ) {
//             nextContent = setAtPath(
//               nextContent,
//               altPath,
//               imageAltFromFileName(file.name),
//             );
//           }
//         }

//         return {...current, content: nextContent};
//       });

//       setStatus(
//         "Image uploaded. Alt text was added as editable text. Remember to save the page to store the image and alt text in PostgreSQL.",
//       );
//     } catch {
//       setStatus("Could not upload image. Please try again.");
//     } finally {
//       setUploadingFields((current) => ({...current, [key]: false}));
//     }
//   }

//   function renderPrimitive(
//     path: Path,
//     label: string | number,
//     value: ContentPrimitive,
//   ) {
//     const inputBase =
//       "w-full rounded-xl border-none bg-[#f2f4f7] px-3 py-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition focus:ring-[#320056]/25 sm:px-4";

//     if (typeof value === "boolean") {
//       return (
//         <label className="flex items-center justify-between gap-4 rounded-xl bg-[#f7f9fc] px-3 py-3 text-sm font-bold text-[#320056] sm:px-4">
//           <span>{titleCase(label)}</span>
//           <input
//             type="checkbox"
//             checked={value}
//             onChange={(event) => updateContent(path, event.target.checked)}
//             className="h-5 w-5 rounded border-slate-300 text-[#320056] focus:ring-[#320056]/20"
//           />
//         </label>
//       );
//     }

//     if (isImageField(path, label, value)) {
//       const key = pathKey(path);
//       const imageValue = value === null ? "" : String(value);

//       return (
//         <div className="space-y-3 rounded-2xl bg-[#f7f9fc]  p-3 text-sm font-bold text-[#320056] ring-1 ring-slate-100 sm:p-4">
//           <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//             <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
//               {titleCase(label)}
//             </span>

//             <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#005768]">
//               <ImageIcon size={13} /> Device Upload
//             </span>
//           </div>

//           {imageValue ? (
//             <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-100">
//               {/* eslint-disable-next-line @next/next/no-img-element */}
//               <img
//                 src={imageValue}
//                 alt={String(label)}
//                 className="h-36 w-full object-cover sm:h-40"
//               />
//             </div>
//           ) : (
//             <div className="flex h-36 w-full items-center justify-center rounded-xl bg-white text-slate-300 ring-1 ring-slate-100 sm:h-40">
//               <ImageIcon size={36} />
//             </div>
//           )}

//           <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#005768]/30 bg-white px-3 py-4 text-center transition hover:bg-[#50d9fe]/10 sm:px-4">
//             <span className="text-sm font-extrabold text-[#320056]">
//               {uploadingFields[key]
//                 ? "Uploading image..."
//                 : "Choose image from your device"}
//             </span>

//             <span className="mt-1 text-xs font-medium leading-5 text-slate-400">
//               PNG, JPG, JPEG, WEBP, GIF, or SVG. Alt text stays as a normal
//               editable text field.
//             </span>

//             <input
//               type="file"
//               accept="image/*"
//               disabled={uploadingFields[key]}
//               onChange={(event) =>
//                 void uploadImageFromDevice(
//                   path,
//                   event.target.files?.[0] ?? null,
//                 )
//               }
//               className="sr-only"
//             />
//           </label>

//           <div className="rounded-xl bg-white px-3 py-3 text-xs font-medium text-slate-500 ring-1 ring-slate-100 sm:px-4">
//             <span className="block font-black uppercase tracking-widest text-slate-400">
//               Saved path
//             </span>
//             <span className="mt-1 block break-all">
//               {imageValue || "No image selected yet"}
//             </span>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <label className="space-y-2 text-sm font-bold text-[#320056]">
//         <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
//           {titleCase(label)}
//         </span>

//         {isLongTextField(label, value) ? (
//           <textarea
//             value={value === null ? "" : String(value)}
//             onChange={(event) =>
//               updateContent(path, coercePrimitive(value, event.target.value))
//             }
//             className={`${inputBase} min-h-28 resize-y`}
//           />
//         ) : (
//           <input
//             type={typeof value === "number" ? "number" : "text"}
//             value={value === null ? "" : String(value)}
//             onChange={(event) =>
//               updateContent(path, coercePrimitive(value, event.target.value))
//             }
//             className={inputBase}
//           />
//         )}
//       </label>
//     );
//   }

//   function renderValue(
//     path: Path,
//     label: string | number,
//     value: ContentValue,
//     depth = 0,
//   ): ReactNode {
//     if (Array.isArray(value)) {
//       return (
//         <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
//           <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm font-black uppercase tracking-[0.18em] text-[#320056]">
//                 {titleCase(label)}
//               </p>
//               <p className="text-xs text-slate-400">
//                 {value.length} editable item{value.length === 1 ? "" : "s"}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => addArrayItem(path, value)}
//               className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#320056] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#320056]/10 sm:w-auto">
//               <Plus size={14} /> Add item
//             </button>
//           </div>

//           <div className="space-y-4">
//             {value.map((item, index) => (
//               <div
//                 key={`${pathKey(path)}-${index}`}
//                 className="rounded-2xl border-l-4 border-[#005768] bg-[#f7f9fc] p-3 sm:p-4">
//                 <div className="mb-3 flex items-center justify-between gap-3">
//                   <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
//                     Item {index + 1}
//                   </p>

//                   <button
//                     type="button"
//                     onClick={() => removeContent([...path, index])}
//                     className="rounded-full p-2 text-red-600 transition hover:bg-red-50"
//                     aria-label={`Remove ${titleCase(label)} item ${index + 1}`}>
//                     <Trash2 size={15} />
//                   </button>
//                 </div>

//                 {renderValue([...path, index], index, item, depth + 1)}
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     if (isContentObject(value)) {
//       const entries = Object.entries(value);
//       const key = pathKey(path);

//       return (
//         <div
//           className={`rounded-2xl ${
//             depth === 0
//               ? "bg-transparent"
//               : "border border-slate-100 bg-white p-3 shadow-sm sm:p-4"
//           }`}>
//           {depth > 0 && (
//             <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
//               <p className="text-sm font-black uppercase tracking-[0.18em] text-[#320056]">
//                 {titleCase(label)}
//               </p>

//               <button
//                 type="button"
//                 onClick={() => removeContent(path)}
//                 className="rounded-full p-2 text-red-600 transition hover:bg-red-50">
//                 <Trash2 size={15} />
//               </button>
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             {entries.map(([field, item]) => (
//               <div
//                 key={`${key}-${field}`}
//                 className={
//                   isContentObject(item) || Array.isArray(item)
//                     ? "md:col-span-2"
//                     : ""
//                 }>
//                 {renderValue([...path, field], field, item, depth + 1)}
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-[#f7f9fc] p-3 sm:flex-row">
//             <input
//               value={fieldDrafts[key] ?? ""}
//               onChange={(event) =>
//                 setFieldDrafts((current) => ({
//                   ...current,
//                   [key]: event.target.value,
//                 }))
//               }
//               placeholder="Add new field name, e.g. subtitle"
//               className="min-w-0 flex-1 rounded-xl border-none bg-white px-4 py-3 text-sm outline-none ring-1 ring-slate-100 focus:ring-[#320056]/25 sm:py-2"
//             />

//             <button
//               type="button"
//               onClick={() => addObjectField(path)}
//               className="rounded-xl bg-[#005768] px-4 py-3 text-sm font-bold text-white sm:py-2">
//               Add field
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return renderPrimitive(path, label, value);
//   }

//   return (
//     <div className="min-h-screen mt-15 sm:mt-0 overflow-x-hidden bg-[#f7f9fc] text-[#191c1e]">
//       <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 px-3 py-4 backdrop-blur-xl sm:px-6 sm:py-5 lg:px-10">
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
//           <div className="min-w-0">
//             <h1 className="font-sans text-xl font-extrabold tracking-tight text-[#320056] sm:text-2xl">
//               Pages Content Manager
//             </h1>

//             <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-500">
//               Create and edit every website page through form fields, not JSON.
//             </p>
//           </div>

//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//             <div className="relative w-full sm:w-auto">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={17}
//               />

//               <input
//                 value={searchTerm}
//                 onChange={(event) => {
//                   setSearchTerm(event.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full rounded-full border-none bg-[#e6e8eb] py-3 pl-10 pr-4 text-sm outline-none ring-1 ring-transparent transition focus:ring-[#320056]/20 sm:w-72"
//                 placeholder="Search pages..."
//               />
//             </div>

//             <div className="hidden items-center gap-3 border-l border-slate-200 pl-5 lg:flex">
//               <div className="text-right">
//                 <p className="text-sm font-extrabold text-[#320056]">
//                   Admin User
//                 </p>
//                 <p className="text-[10px] font-black uppercase tracking-widest text-[#005768]">
//                   Administrator
//                 </p>
//               </div>

//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#005768] text-sm font-black text-white ring-2 ring-[#320056]/10">
//                 A
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="mx-auto max-w-7xl space-y-5 px-3 py-5 sm:space-y-7 sm:px-6 sm:py-7 lg:px-10">
//         <section className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-5">
//           <div className="rounded-3xl bg-white p-4 shadow-sm sm:rounded-[1.4rem] sm:p-5 lg:col-span-3">
//             <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
//               <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
//                 <span className="inline-flex items-center gap-2 rounded-full bg-[#320056]/5 px-4 py-2 text-sm font-bold text-[#320056]">
//                   <span className="h-2 w-2 rounded-full bg-teal-500" />
//                   {pages.length} Active Pages
//                 </span>

//                 <span className="inline-flex items-center gap-2 rounded-full bg-[#320056]/5 px-4 py-2 text-sm font-bold text-[#320056]">
//                   <span className="h-2 w-2 rounded-full bg-amber-500" />
//                   {
//                     pages.filter(
//                       (page) =>
//                         Object.keys(normaliseObject(page.content)).length === 0,
//                     ).length
//                   }{" "}
//                   Empty Records
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
//                 <button
//                   onClick={loadPages}
//                   type="button"
//                   className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
//                   <RefreshCw size={16} /> Refresh
//                 </button>

//                 <button
//                   onClick={resetForm}
//                   type="button"
//                   className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#320056] to-[#4b0082] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#320056]/20 transition hover:scale-[1.02] active:scale-95">
//                   <Plus size={16} /> Add New Page
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-start gap-4 rounded-3xl border border-[#005768]/10 bg-[#50d9fe]/10 p-4 sm:rounded-[1.4rem] sm:p-5 lg:justify-center">
//             <CalendarDays className="shrink-0 text-[#005768]" size={24} />

//             <div>
//               <p className="text-[10px] font-black uppercase tracking-tight text-[#005768]">
//                 Last Update
//               </p>
//               <p className="text-sm font-extrabold text-slate-800">
//                 {updatedDate(selectedPage)}
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="grid grid-cols-1 gap-4 sm:gap-5">
//           {loading ? (
//             <div className="rounded-2xl bg-white p-6 text-sm font-semibold text-slate-500 sm:p-8">
//               Loading editable pages...
//             </div>
//           ) : paginatedPages.length ? (
//             paginatedPages.map((page) => {
//               const isActive = selectedSlug === page.slug;
//               const sections = Object.keys(normaliseObject(page.content));

//               return (
//                 <article
//                   key={page.id}
//                   className={`group relative overflow-hidden rounded-2xl border-l-4 bg-white p-4 transition-all hover:shadow-xl hover:shadow-[#320056]/5 sm:p-5 ${
//                     isActive
//                       ? "border-[#005768] ring-2 ring-[#005768]/10"
//                       : "border-slate-200"
//                   }`}>
//                   <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
//                     <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-xl bg-[#e6e8eb] text-[#320056] sm:h-28 md:w-44">
//                       {page.slug === "gallery" ? (
//                         <ImageIcon size={38} />
//                       ) : (
//                         <FileText size={38} />
//                       )}
//                     </div>

//                     <div className="min-w-0 flex-1 space-y-2">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <span className="max-w-full truncate rounded bg-[#f0dbff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#320056]">
//                           /{page.slug || "new-page"}
//                         </span>

//                         <span className="rounded bg-[#b3ebff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#005768]">
//                           {sections.length} Sections
//                         </span>
//                       </div>

//                       <h2 className="font-sans text-lg font-extrabold leading-tight text-[#320056] sm:text-xl">
//                         {page.title}
//                       </h2>

//                       <p className="max-w-3xl text-sm leading-6 text-slate-500">
//                         {page.seoDescription || pageDescription(page)}
//                       </p>

//                       <div className="flex flex-col gap-2 pt-1 text-xs font-semibold text-slate-400 sm:flex-row sm:flex-wrap sm:gap-5">
//                         <span className="inline-flex items-center gap-1">
//                           <Clock3 size={14} /> Updated {updatedDate(page)}
//                         </span>

//                         <span className="inline-flex items-start gap-1">
//                           <Layers3 className="mt-0.5 shrink-0" size={14} />
//                           <span>
//                             {sections.slice(0, 4).map(titleCase).join(", ") ||
//                               "No sections yet"}
//                           </span>
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex w-full justify-end gap-2 md:w-auto md:self-center">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setSelectedSlug(page.slug);
//                           hydrateForm(page);
//                           setIsEditorOpen(true);
//                           setStatus(`Editing ${page.title}.`);
//                         }}
//                         className="rounded-full p-3 text-[#320056] transition hover:bg-[#320056]/5"
//                         title="Edit page">
//                         <PencilLine size={18} />
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => void deletePage(page.slug)}
//                         className="rounded-full p-3 text-red-600 transition hover:bg-red-50"
//                         title="Delete page">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </div>

//                   <FileText
//                     className="absolute -bottom-5 -right-5 text-[#320056] opacity-[0.03]"
//                     size={96}
//                   />
//                 </article>
//               );
//             })
//           ) : (
//             <div className="rounded-2xl bg-white p-6 text-sm font-semibold text-slate-500 sm:p-8">
//               No pages match your search.
//             </div>
//           )}
//         </section>

//         <footer className="flex flex-col gap-4 border-t border-slate-100 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
//           <p className="text-sm font-semibold leading-6 text-slate-400">
//             Showing{" "}
//             <span className="text-slate-800">
//               {sortedPages.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-
//               {Math.min(currentPage * PAGE_SIZE, sortedPages.length)}
//             </span>{" "}
//             of <span className="text-slate-800">{sortedPages.length}</span>{" "}
//             Website Pages
//           </p>

//           <div className="flex flex-wrap gap-2">
//             <button
//               type="button"
//               onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
//               className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100">
//               <ChevronLeft size={18} />
//             </button>

//             {Array.from({length: totalPages}).map((_, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => setCurrentPage(index + 1)}
//                 className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${
//                   currentPage === index + 1
//                     ? "bg-[#320056] text-white shadow-md"
//                     : "text-slate-500 hover:bg-slate-100"
//                 }`}>
//                 {index + 1}
//               </button>
//             ))}

//             <button
//               type="button"
//               onClick={() =>
//                 setCurrentPage((page) => Math.min(totalPages, page + 1))
//               }
//               className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100">
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         </footer>
//       </div>

//       {isEditorOpen && (
//         <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#320056]/20 p-0 backdrop-blur-sm sm:items-center sm:p-4">
//           <div className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl sm:max-h-[92vh] sm:rounded-[1.5rem]">
//             <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5 sm:py-5 lg:px-8">
//               <div className="min-w-0">
//                 <h2 className="font-sans text-xl font-extrabold leading-tight text-[#320056] sm:text-2xl">
//                   {selectedSlug ? `Edit ${form.title}` : "New Page Entry"}
//                 </h2>

//                 <p className="mt-1 text-sm leading-6 text-slate-500">
//                   Use the form fields below to update the database content for
//                   this page.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setIsEditorOpen(false)}
//                 className="self-end rounded-full p-2 text-slate-500 transition hover:bg-slate-100 sm:self-auto">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="max-h-[calc(95vh-190px)] overflow-y-auto px-4 py-5 sm:max-h-[calc(92vh-170px)] sm:px-5 sm:py-6 lg:px-8">
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <label className="space-y-2 text-sm font-bold text-[#320056]">
//                   <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
//                     Page Slug
//                   </span>

//                   <input
//                     value={form.slug}
//                     onChange={(event) =>
//                       setForm((current) => ({
//                         ...current,
//                         slug: event.target.value,
//                       }))
//                     }
//                     className="w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
//                     placeholder="home"
//                   />
//                 </label>

//                 <label className="space-y-2 text-sm font-bold text-[#320056]">
//                   <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
//                     Page Title
//                   </span>

//                   <input
//                     value={form.title}
//                     onChange={(event) =>
//                       setForm((current) => ({
//                         ...current,
//                         title: event.target.value,
//                       }))
//                     }
//                     className="w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
//                     placeholder="Home"
//                   />
//                 </label>

//                 <label className="space-y-2 text-sm font-bold text-[#320056] md:col-span-2">
//                   <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
//                     SEO Title
//                   </span>

//                   <input
//                     value={form.seoTitle}
//                     onChange={(event) =>
//                       setForm((current) => ({
//                         ...current,
//                         seoTitle: event.target.value,
//                       }))
//                     }
//                     className="w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
//                   />
//                 </label>

//                 <label className="space-y-2 text-sm font-bold text-[#320056] md:col-span-2">
//                   <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
//                     SEO Description
//                   </span>

//                   <textarea
//                     value={form.seoDescription}
//                     onChange={(event) =>
//                       setForm((current) => ({
//                         ...current,
//                         seoDescription: event.target.value,
//                       }))
//                     }
//                     className="min-h-24 w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
//                   />
//                 </label>
//               </div>

//               <div className="mt-6 space-y-5 sm:mt-7">
//                 <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h3 className="font-sans text-lg font-extrabold text-[#320056]">
//                       Editable Page Sections
//                     </h3>

//                     <p className="text-sm leading-6 text-slate-500">
//                       Every nested field below maps directly to the page content
//                       stored in PostgreSQL.
//                     </p>
//                   </div>
//                 </div>

//                 {renderValue([], "content", form.content, 0)}
//               </div>
//             </div>

//             <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5 lg:px-8">
//               <p className="rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-medium leading-6 text-slate-600">
//                 {status || "Update fields and save changes to PostgreSQL."}
//               </p>

//               <div className="grid grid-cols-1 gap-3 sm:flex sm:justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditorOpen(false)}
//                   className="rounded-full px-6 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100">
//                   Cancel
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => void savePage()}
//                   className="inline-flex items-center justify-center gap-2 rounded-full bg-[#320056] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#320056]/20">
//                   <Save size={16} /> Save Page
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import {useEffect, useMemo, useState} from "react";
import type {ReactNode} from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  ImageIcon,
  Layers3,
  PencilLine,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";

type SitePageRecord = {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  content: unknown;
  updatedAt?: string;
};

type ContentPrimitive = string | number | boolean | null;
type ContentObject = {[key: string]: ContentValue};
type ContentArray = ContentValue[];
type ContentValue = ContentPrimitive | ContentObject | ContentArray;
type Path = Array<string | number>;

type FormState = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  content: ContentObject;
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  seoTitle: "",
  seoDescription: "",
  content: {},
};

const PAGE_SIZE = 3;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isContentObject(value: ContentValue): value is ContentObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normaliseValue(value: unknown): ContentValue {
  if (value === null) return null;

  if (["string", "number", "boolean"].includes(typeof value)) {
    return value as ContentPrimitive;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normaliseValue(item));
  }

  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normaliseValue(item)]),
    );
  }

  return "";
}

function normaliseObject(value: unknown): ContentObject {
  const normalised = normaliseValue(value);
  return isContentObject(normalised) ? normalised : {};
}

function cloneContent<T extends ContentValue>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function pathKey(path: Path) {
  return path.join(".") || "root";
}

function titleCase(input: string | number) {
  return String(input)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function isLongTextField(key: string | number, value: ContentPrimitive) {
  const name = String(key).toLowerCase();

  return (
    typeof value === "string" &&
    (value.length > 80 ||
      name.includes("description") ||
      name.includes("body") ||
      name.includes("paragraph") ||
      name.includes("intro") ||
      name.includes("outro") ||
      name.includes("quote") ||
      name.includes("note"))
  );
}

function isImageField(
  path: Path,
  key: string | number,
  value: ContentPrimitive,
) {
  if (typeof value !== "string") return false;

  const fieldName = String(key).toLowerCase();

  /*
    Important:
    Do not treat alt/caption/title fields as image upload fields.

    Example content:
    {
      image: "/uploads/about.jpg",
      alt: "Students learning in class"
    }

    The "image" field should show the upload UI.
    The "alt" field should remain a normal text input.
  */
  const textOnlyImageMetaFields = [
    "alt",
    "imagealt",
    "imgalt",
    "photoalt",
    "avataralt",
    "portraitalt",
    "logoalt",
    "thumbnailalt",
    "coveralt",
    "banneralt",
    "backgroundalt",
    "alttext",
    "imagetext",
    "caption",
    "imagecaption",
    "photocaption",
    "title",
    "imagetitle",
    "phototitle",
  ];

  if (
    textOnlyImageMetaFields.includes(fieldName) ||
    fieldName.endsWith("alt") ||
    fieldName.includes("alttext") ||
    fieldName.includes("caption") ||
    fieldName.includes("title")
  ) {
    return false;
  }

  const imageNameHints = [
    "image",
    "img",
    "photo",
    "avatar",
    "thumbnail",
    "cover",
    "banner",
    "logo",
    "portrait",
    "background",
  ];

  const imageValueHints = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".svg",
    "/uploads/",
    "images.unsplash.com",
    "lh3.googleusercontent.com",
  ];

  return (
    imageNameHints.some((hint) => fieldName.includes(hint)) ||
    ((fieldName === "src" || fieldName === "url") &&
      imageValueHints.some((hint) => value.toLowerCase().includes(hint)))
  );
}

function getAtPath(root: ContentObject, path: Path): ContentValue | undefined {
  let current: ContentValue = root;

  for (const segment of path) {
    if (Array.isArray(current) && typeof segment === "number") {
      current = current[segment];
    } else if (isContentObject(current) && typeof segment === "string") {
      current = current[segment];
    } else {
      return undefined;
    }
  }

  return current;
}

function setAtPath(
  root: ContentObject,
  path: Path,
  value: ContentValue,
): ContentObject {
  if (path.length === 0) {
    return isContentObject(value) ? value : root;
  }

  const copy = cloneContent(root);
  let current: ContentValue = copy;

  path.forEach((segment, index) => {
    const isLast = index === path.length - 1;

    if (isLast) {
      if (Array.isArray(current) && typeof segment === "number") {
        current[segment] = value;
      }

      if (isContentObject(current) && typeof segment === "string") {
        current[segment] = value;
      }

      return;
    }

    if (Array.isArray(current) && typeof segment === "number") {
      current = current[segment];
    } else if (isContentObject(current) && typeof segment === "string") {
      current = current[segment];
    }
  });

  return copy;
}

function removeAtPath(root: ContentObject, path: Path): ContentObject {
  const copy = cloneContent(root);
  const parentPath = path.slice(0, -1);
  const last = path[path.length - 1];
  const parent = getAtPath(copy, parentPath);

  if (Array.isArray(parent) && typeof last === "number") {
    parent.splice(last, 1);
  }

  if (isContentObject(parent) && typeof last === "string") {
    delete parent[last];
  }

  return copy;
}

function getEmptyArrayItem(items: ContentArray): ContentValue {
  const sample = items[items.length - 1];

  if (sample === undefined) return "";
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (sample === null) return "";
  if (Array.isArray(sample)) return [];

  return Object.fromEntries(Object.keys(sample).map((key) => [key, ""]));
}

function coercePrimitive(
  original: ContentPrimitive,
  value: string,
): ContentPrimitive {
  if (typeof original === "number") return Number(value) || 0;
  if (original === null) return value;
  return value;
}

function imageAltFromFileName(fileName: string) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function getSiblingAltPath(path: Path): Path | null {
  if (!path.length) return null;

  const parentPath = path.slice(0, -1);
  const last = String(path[path.length - 1]).toLowerCase();

  const altKey = last.includes("logo")
    ? "logoAlt"
    : last.includes("avatar") || last.includes("portrait")
      ? "avatarAlt"
      : "alt";

  return [...parentPath, altKey];
}

function getImagePreviewAlt(
  content: ContentObject,
  imagePath: Path,
  fallbackLabel: string | number,
) {
  const altPath = getSiblingAltPath(imagePath);

  if (!altPath) return titleCase(fallbackLabel);

  const altValue = getAtPath(content, altPath);

  if (
    typeof altValue === "string" ||
    typeof altValue === "number" ||
    typeof altValue === "boolean"
  ) {
    const text = String(altValue).trim();
    return text || titleCase(fallbackLabel);
  }

  return titleCase(fallbackLabel);
}

function pageDescription(page: SitePageRecord) {
  const content = normaliseObject(page.content);
  const firstKey = Object.keys(content)[0];

  if (!firstKey) return "Empty page content record";

  return `Contains ${Object.keys(content).length} editable section${
    Object.keys(content).length === 1 ? "" : "s"
  }: ${titleCase(firstKey)}${Object.keys(content).length > 1 ? "..." : ""}`;
}

function updatedDate(page?: SitePageRecord) {
  if (!page?.updatedAt) return "Not saved yet";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(page.updatedAt));
}

export default function PageManager() {
  const [pages, setPages] = useState<SitePageRecord[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [fieldDrafts, setFieldDrafts] = useState<Record<string, string>>({});
  const [uploadingFields, setUploadingFields] = useState<
    Record<string, boolean>
  >({});

  async function loadPages() {
    setLoading(true);
    setStatus("");

    const response = await fetch("/api/cms", {cache: "no-store"});
    const data = (await response.json()) as SitePageRecord[];

    setPages(data);
    setLoading(false);

    if (!selectedSlug && data.length) {
      hydrateForm(data[0]);
      setSelectedSlug(data[0].slug);
    }
  }

  useEffect(() => {
    void loadPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedPages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const sorted = [...pages].sort((a, b) => a.title.localeCompare(b.title));

    if (!term) return sorted;

    return sorted.filter((page) =>
      `${page.title} ${page.slug}`.toLowerCase().includes(term),
    );
  }, [pages, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(sortedPages.length / PAGE_SIZE));

  const paginatedPages = sortedPages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const selectedPage = pages.find((page) => page.slug === selectedSlug);

  function hydrateForm(page: SitePageRecord) {
    setForm({
      slug: page.slug,
      title: page.title,
      seoTitle: page.seoTitle ?? "",
      seoDescription: page.seoDescription ?? "",
      content: normaliseObject(page.content),
    });
  }

  function resetForm() {
    setSelectedSlug("");
    setForm({
      ...emptyForm,
      content: {
        hero: {
          eyebrow: "",
          title: "",
          description: "",
        },
      },
    });
    setIsEditorOpen(true);
    setStatus("Creating a new page record.");
  }

  function updateContent(path: Path, value: ContentValue) {
    setForm((current) => ({
      ...current,
      content: setAtPath(current.content, path, value),
    }));
  }

  function removeContent(path: Path) {
    setForm((current) => ({
      ...current,
      content: removeAtPath(current.content, path),
    }));
  }

  function addArrayItem(path: Path, items: ContentArray) {
    updateContent(path, [...items, getEmptyArrayItem(items)]);
  }

  function addObjectField(path: Path) {
    const key = pathKey(path);
    const fieldName = fieldDrafts[key]?.trim();

    if (!fieldName) return;

    const target = getAtPath(form.content, path);

    if (!isContentObject(target) || target[fieldName] !== undefined) return;

    updateContent(path, {...target, [fieldName]: ""});
    setFieldDrafts((current) => ({...current, [key]: ""}));
  }

  async function savePage() {
    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
      content: form.content,
    };

    if (!payload.slug || !payload.title) {
      setStatus("Slug and title are required.");
      return;
    }

    const isNew =
      !selectedSlug || !pages.some((page) => page.slug === selectedSlug);

    const endpoint = isNew ? "/api/cms" : `/api/cms/${selectedSlug}`;
    const method = isNew ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = (await response.json()) as {error?: string};
      setStatus(error.error || "Could not save page.");
      return;
    }

    const saved = (await response.json()) as SitePageRecord;

    await loadPages();
    setSelectedSlug(saved.slug);
    hydrateForm(saved);
    setStatus(`Saved ${saved.title}.`);
  }

  async function deletePage(slug = selectedSlug) {
    if (!slug) return;

    const confirmed = window.confirm(`Delete the page "${slug}"?`);
    if (!confirmed) return;

    const response = await fetch(`/api/cms/${slug}`, {method: "DELETE"});

    if (!response.ok) {
      setStatus("Could not delete the page.");
      return;
    }

    setStatus(`Deleted ${slug}.`);
    setSelectedSlug("");
    setForm(emptyForm);
    setIsEditorOpen(false);
    await loadPages();
  }

  async function uploadImageFromDevice(path: Path, file: File | null) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus("Please choose a valid image file.");
      return;
    }

    const key = pathKey(path);
    const formData = new FormData();

    formData.append("file", file);

    setUploadingFields((current) => ({...current, [key]: true}));
    setStatus(`Uploading ${file.name}...`);

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as {url?: string; error?: string};

      if (!response.ok || !data.url) {
        setStatus(data.error || "Could not upload image.");
        return;
      }

      setForm((current) => {
        let nextContent = setAtPath(current.content, path, data.url);
        const altPath = getSiblingAltPath(path);

        if (altPath) {
          const existingAlt = getAtPath(nextContent, altPath);

          if (
            existingAlt === undefined ||
            existingAlt === null ||
            String(existingAlt).trim() === ""
          ) {
            nextContent = setAtPath(
              nextContent,
              altPath,
              imageAltFromFileName(file.name),
            );
          }
        }

        return {...current, content: nextContent};
      });

      setStatus(
        "Image uploaded. Alt text was added as editable text. Remember to save the page to store the image and alt text in PostgreSQL.",
      );
    } catch {
      setStatus("Could not upload image. Please try again.");
    } finally {
      setUploadingFields((current) => ({...current, [key]: false}));
    }
  }

  function renderPrimitive(
    path: Path,
    label: string | number,
    value: ContentPrimitive,
  ) {
    const inputBase =
      "w-full rounded-xl border-none bg-[#f2f4f7] px-3 py-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition focus:ring-[#320056]/25 sm:px-4";

    if (typeof value === "boolean") {
      return (
        <label className="flex items-center justify-between gap-4 rounded-xl bg-[#f7f9fc] px-3 py-3 text-sm font-bold text-[#320056] sm:px-4">
          <span>{titleCase(label)}</span>

          <input
            type="checkbox"
            checked={value}
            onChange={(event) => updateContent(path, event.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-[#320056] focus:ring-[#320056]/20"
          />
        </label>
      );
    }

    if (isImageField(path, label, value)) {
      const key = pathKey(path);
      const imageValue = value === null ? "" : String(value);

      return (
        <div className="space-y-3 rounded-2xl bg-[#f7f9fc] p-3 text-sm font-bold text-[#320056] ring-1 ring-slate-100 sm:p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
              {titleCase(label)}
            </span>

            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#005768]">
              <ImageIcon size={13} /> Device Upload
            </span>
          </div>

          {imageValue ? (
            <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageValue}
                alt={getImagePreviewAlt(form.content, path, label)}
                className="h-36 w-full object-cover sm:h-40"
              />
            </div>
          ) : (
            <div className="flex h-36 w-full items-center justify-center rounded-xl bg-white text-slate-300 ring-1 ring-slate-100 sm:h-40">
              <ImageIcon size={36} />
            </div>
          )}

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#005768]/30 bg-white px-3 py-4 text-center transition hover:bg-[#50d9fe]/10 sm:px-4">
            <span className="text-sm font-extrabold text-[#320056]">
              {uploadingFields[key]
                ? "Uploading image..."
                : "Choose image from your device"}
            </span>

            <span className="mt-1 text-xs font-medium leading-5 text-slate-400">
              PNG, JPG, JPEG, WEBP, GIF, or SVG. Alt text stays as a normal
              editable text field.
            </span>

            <input
              type="file"
              accept="image/*"
              disabled={uploadingFields[key]}
              onChange={(event) =>
                void uploadImageFromDevice(
                  path,
                  event.target.files?.[0] ?? null,
                )
              }
              className="sr-only"
            />
          </label>

          <div className="rounded-xl bg-white px-3 py-3 text-xs font-medium text-slate-500 ring-1 ring-slate-100 sm:px-4">
            <span className="block font-black uppercase tracking-widest text-slate-400">
              Saved path
            </span>

            <span className="mt-1 block break-all">
              {imageValue || "No image selected yet"}
            </span>
          </div>
        </div>
      );
    }

    return (
      <label className="space-y-2 text-sm font-bold text-[#320056]">
        <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
          {titleCase(label)}
        </span>

        {isLongTextField(label, value) ? (
          <textarea
            value={value === null ? "" : String(value)}
            onChange={(event) =>
              updateContent(path, coercePrimitive(value, event.target.value))
            }
            className={`${inputBase} min-h-28 resize-y`}
          />
        ) : (
          <input
            type={typeof value === "number" ? "number" : "text"}
            value={value === null ? "" : String(value)}
            onChange={(event) =>
              updateContent(path, coercePrimitive(value, event.target.value))
            }
            className={inputBase}
          />
        )}
      </label>
    );
  }

  function renderValue(
    path: Path,
    label: string | number,
    value: ContentValue,
    depth = 0,
  ): ReactNode {
    if (Array.isArray(value)) {
      return (
        <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#320056]">
                {titleCase(label)}
              </p>

              <p className="text-xs text-slate-400">
                {value.length} editable item{value.length === 1 ? "" : "s"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => addArrayItem(path, value)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#320056] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#320056]/10 sm:w-auto">
              <Plus size={14} /> Add item
            </button>
          </div>

          <div className="space-y-4">
            {value.map((item, index) => (
              <div
                key={`${pathKey(path)}-${index}`}
                className="rounded-2xl border-l-4 border-[#005768] bg-[#f7f9fc] p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                    Item {index + 1}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeContent([...path, index])}
                    className="rounded-full p-2 text-red-600 transition hover:bg-red-50"
                    aria-label={`Remove ${titleCase(label)} item ${index + 1}`}>
                    <Trash2 size={15} />
                  </button>
                </div>

                {renderValue([...path, index], index, item, depth + 1)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isContentObject(value)) {
      const entries = Object.entries(value);
      const key = pathKey(path);

      return (
        <div
          className={`rounded-2xl ${
            depth === 0
              ? "bg-transparent"
              : "border border-slate-100 bg-white p-3 shadow-sm sm:p-4"
          }`}>
          {depth > 0 && (
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#320056]">
                {titleCase(label)}
              </p>

              <button
                type="button"
                onClick={() => removeContent(path)}
                className="rounded-full p-2 text-red-600 transition hover:bg-red-50">
                <Trash2 size={15} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {entries.map(([field, item]) => (
              <div
                key={`${key}-${field}`}
                className={
                  isContentObject(item) || Array.isArray(item)
                    ? "md:col-span-2"
                    : ""
                }>
                {renderValue([...path, field], field, item, depth + 1)}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-[#f7f9fc] p-3 sm:flex-row">
            <input
              value={fieldDrafts[key] ?? ""}
              onChange={(event) =>
                setFieldDrafts((current) => ({
                  ...current,
                  [key]: event.target.value,
                }))
              }
              placeholder="Add new field name, e.g. subtitle"
              className="min-w-0 flex-1 rounded-xl border-none bg-white px-4 py-3 text-sm outline-none ring-1 ring-slate-100 focus:ring-[#320056]/25 sm:py-2"
            />

            <button
              type="button"
              onClick={() => addObjectField(path)}
              className="rounded-xl bg-[#005768] px-4 py-3 text-sm font-bold text-white sm:py-2">
              Add field
            </button>
          </div>
        </div>
      );
    }

    return renderPrimitive(path, label, value);
  }

  return (
    <div className="min-h-screen mt-15 sm:mt-0 overflow-x-hidden bg-[#f7f9fc] text-[#191c1e]">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 px-3 py-4 backdrop-blur-xl sm:px-6 sm:py-5 lg:px-10">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <h1 className="font-sans text-xl font-extrabold tracking-tight text-[#320056] sm:text-2xl">
              Pages Content Manager
            </h1>

            <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Create and edit every website page through form fields, not JSON.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-auto">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />

              <input
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-full border-none bg-[#e6e8eb] py-3 pl-10 pr-4 text-sm outline-none ring-1 ring-transparent transition focus:ring-[#320056]/20 sm:w-72"
                placeholder="Search pages..."
              />
            </div>

            <div className="hidden items-center gap-3 border-l border-slate-200 pl-5 lg:flex">
              <div className="text-right">
                <p className="text-sm font-extrabold text-[#320056]">
                  Admin User
                </p>

                <p className="text-[10px] font-black uppercase tracking-widest text-[#005768]">
                  Administrator
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#005768] text-sm font-black text-white ring-2 ring-[#320056]/10">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-5 px-3 py-5 sm:space-y-7 sm:px-6 sm:py-7 lg:px-10">
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-5">
          <div className="rounded-3xl bg-white p-4 shadow-sm sm:rounded-[1.4rem] sm:p-5 lg:col-span-3">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#320056]/5 px-4 py-2 text-sm font-bold text-[#320056]">
                  <span className="h-2 w-2 rounded-full bg-teal-500" />
                  {pages.length} Active Pages
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#320056]/5 px-4 py-2 text-sm font-bold text-[#320056]">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  {
                    pages.filter(
                      (page) =>
                        Object.keys(normaliseObject(page.content)).length === 0,
                    ).length
                  }{" "}
                  Empty Records
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                <button
                  onClick={loadPages}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
                  <RefreshCw size={16} /> Refresh
                </button>

                <button
                  onClick={resetForm}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#320056] to-[#4b0082] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#320056]/20 transition hover:scale-[1.02] active:scale-95">
                  <Plus size={16} /> Add New Page
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-4 rounded-3xl border border-[#005768]/10 bg-[#50d9fe]/10 p-4 sm:rounded-[1.4rem] sm:p-5 lg:justify-center">
            <CalendarDays className="shrink-0 text-[#005768]" size={24} />

            <div>
              <p className="text-[10px] font-black uppercase tracking-tight text-[#005768]">
                Last Update
              </p>

              <p className="text-sm font-extrabold text-slate-800">
                {updatedDate(selectedPage)}
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:gap-5">
          {loading ? (
            <div className="rounded-2xl bg-white p-6 text-sm font-semibold text-slate-500 sm:p-8">
              Loading editable pages...
            </div>
          ) : paginatedPages.length ? (
            paginatedPages.map((page) => {
              const isActive = selectedSlug === page.slug;
              const sections = Object.keys(normaliseObject(page.content));

              return (
                <article
                  key={page.id}
                  className={`group relative overflow-hidden rounded-2xl border-l-4 bg-white p-4 transition-all hover:shadow-xl hover:shadow-[#320056]/5 sm:p-5 ${
                    isActive
                      ? "border-[#005768] ring-2 ring-[#005768]/10"
                      : "border-slate-200"
                  }`}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                    <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-xl bg-[#e6e8eb] text-[#320056] sm:h-28 md:w-44">
                      {page.slug === "gallery" ? (
                        <ImageIcon size={38} />
                      ) : (
                        <FileText size={38} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="max-w-full truncate rounded bg-[#f0dbff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#320056]">
                          /{page.slug || "new-page"}
                        </span>

                        <span className="rounded bg-[#b3ebff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#005768]">
                          {sections.length} Sections
                        </span>
                      </div>

                      <h2 className="font-sans text-lg font-extrabold leading-tight text-[#320056] sm:text-xl">
                        {page.title}
                      </h2>

                      <p className="max-w-3xl text-sm leading-6 text-slate-500">
                        {page.seoDescription || pageDescription(page)}
                      </p>

                      <div className="flex flex-col gap-2 pt-1 text-xs font-semibold text-slate-400 sm:flex-row sm:flex-wrap sm:gap-5">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 size={14} /> Updated {updatedDate(page)}
                        </span>

                        <span className="inline-flex items-start gap-1">
                          <Layers3 className="mt-0.5 shrink-0" size={14} />

                          <span>
                            {sections.slice(0, 4).map(titleCase).join(", ") ||
                              "No sections yet"}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full justify-end gap-2 md:w-auto md:self-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSlug(page.slug);
                          hydrateForm(page);
                          setIsEditorOpen(true);
                          setStatus(`Editing ${page.title}.`);
                        }}
                        className="rounded-full p-3 text-[#320056] transition hover:bg-[#320056]/5"
                        title="Edit page">
                        <PencilLine size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => void deletePage(page.slug)}
                        className="rounded-full p-3 text-red-600 transition hover:bg-red-50"
                        title="Delete page">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <FileText
                    className="absolute -bottom-5 -right-5 text-[#320056] opacity-[0.03]"
                    size={96}
                  />
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl bg-white p-6 text-sm font-semibold text-slate-500 sm:p-8">
              No pages match your search.
            </div>
          )}
        </section>

        <footer className="flex flex-col gap-4 border-t border-slate-100 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <p className="text-sm font-semibold leading-6 text-slate-400">
            Showing{" "}
            <span className="text-slate-800">
              {sortedPages.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-
              {Math.min(currentPage * PAGE_SIZE, sortedPages.length)}
            </span>{" "}
            of <span className="text-slate-800">{sortedPages.length}</span>{" "}
            Website Pages
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100">
              <ChevronLeft size={18} />
            </button>

            {Array.from({length: totalPages}).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index + 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${
                  currentPage === index + 1
                    ? "bg-[#320056] text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-100"
                }`}>
                {index + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100">
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#320056]/20 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl sm:max-h-[92vh] sm:rounded-[1.5rem]">
            <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5 sm:py-5 lg:px-8">
              <div className="min-w-0">
                <h2 className="font-sans text-xl font-extrabold leading-tight text-[#320056] sm:text-2xl">
                  {selectedSlug ? `Edit ${form.title}` : "New Page Entry"}
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Use the form fields below to update the database content for
                  this page.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="self-end rounded-full p-2 text-slate-500 transition hover:bg-slate-100 sm:self-auto">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[calc(95vh-190px)] overflow-y-auto px-4 py-5 sm:max-h-[calc(92vh-170px)] sm:px-5 sm:py-6 lg:px-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-bold text-[#320056]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    Page Slug
                  </span>

                  <input
                    value={form.slug}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        slug: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
                    placeholder="home"
                  />
                </label>

                <label className="space-y-2 text-sm font-bold text-[#320056]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    Page Title
                  </span>

                  <input
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
                    placeholder="Home"
                  />
                </label>

                <label className="space-y-2 text-sm font-bold text-[#320056] md:col-span-2">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    SEO Title
                  </span>

                  <input
                    value={form.seoTitle}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        seoTitle: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
                  />
                </label>

                <label className="space-y-2 text-sm font-bold text-[#320056] md:col-span-2">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    SEO Description
                  </span>

                  <textarea
                    value={form.seoDescription}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        seoDescription: event.target.value,
                      }))
                    }
                    className="min-h-24 w-full rounded-xl border-none bg-[#f2f4f7] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#320056]/20"
                  />
                </label>
              </div>

              <div className="mt-6 space-y-5 sm:mt-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-sans text-lg font-extrabold text-[#320056]">
                      Editable Page Sections
                    </h3>

                    <p className="text-sm leading-6 text-slate-500">
                      Every nested field below maps directly to the page content
                      stored in PostgreSQL.
                    </p>
                  </div>
                </div>

                {renderValue([], "content", form.content, 0)}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5 lg:px-8">
              <p className="rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-medium leading-6 text-slate-600">
                {status || "Update fields and save changes to PostgreSQL."}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:flex sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="rounded-full px-6 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100">
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => void savePage()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#320056] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#320056]/20">
                  <Save size={16} /> Save Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
