"use client";

import {useEffect, useMemo, useState} from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  ImageIcon,
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
  content: Record<string, unknown>;
  updatedAt?: string;
};

type ItemRecord = Record<string, unknown>;
type Path = Array<string | number>;

type CollectionManagerProps = {
  pageSlug: string;
  collectionPath: string[];
  title: string;
  subtitle: string;
  itemLabel: string;
  searchPlaceholder: string;
  newItem: ItemRecord;
  titleKey?: string;
  descriptionKey?: string;
  imageKey?: string;
  primaryTagKey?: string;
  secondaryTagKey?: string;
  emptyText?: string;
};

const PAGE_SIZE = 4;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getAtPath(root: Record<string, unknown>, path: string[]): unknown {
  let current: unknown = root;

  for (const key of path) {
    if (!isRecord(current)) return undefined;
    current = current[key];
  }

  return current;
}

function setAtPath(
  root: Record<string, unknown>,
  path: string[],
  value: unknown,
) {
  const copy = clone(root);
  let current: Record<string, unknown> = copy;

  path.forEach((key, index) => {
    if (index === path.length - 1) {
      current[key] = value;
      return;
    }

    if (!isRecord(current[key])) current[key] = {};
    current = current[key] as Record<string, unknown>;
  });

  return copy;
}

function titleCase(input: string | number) {
  return String(input)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function updatedDate(page?: SitePageRecord | null) {
  if (!page?.updatedAt) return "Not saved yet";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(page.updatedAt));
}

function pathKey(path: Path) {
  return path.join(".");
}

function imageAltFromFileName(fileName: string) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function isImageField(field: string, value: unknown) {
  const name = field.toLowerCase();

  return (
    name === "image" ||
    name === "src" ||
    name.includes("image") ||
    name.includes("photo") ||
    name.includes("portrait") ||
    name.includes("avatar") ||
    (typeof value === "string" && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(value))
  );
}

function getItemText(item: ItemRecord, key = "title") {
  const value = item[key];
  return typeof value === "string" && value.trim() ? value : "Untitled item";
}

function getItemDescription(item: ItemRecord, key = "description") {
  const value =
    item[key] ?? item.excerpt ?? item.desc ?? item.note ?? item.role;
  return typeof value === "string" && value.trim()
    ? value
    : "No description yet.";
}

function updateByPath(
  item: ItemRecord,
  path: Path,
  value: unknown,
): ItemRecord {
  const copy = clone(item);
  let current: unknown = copy;

  path.forEach((segment, index) => {
    const isLast = index === path.length - 1;

    if (isLast) {
      if (Array.isArray(current) && typeof segment === "number") {
        current[segment] = value;
      }

      if (isRecord(current) && typeof segment === "string") {
        current[segment] = value;
      }

      return;
    }

    if (Array.isArray(current) && typeof segment === "number") {
      current = current[segment];
    } else if (isRecord(current) && typeof segment === "string") {
      current = current[segment];
    }
  });

  return copy;
}

function removeByPath(item: ItemRecord, path: Path): ItemRecord {
  const copy = clone(item);
  const parentPath = path.slice(0, -1);
  const last = path[path.length - 1];

  let parent: unknown = copy;

  for (const segment of parentPath) {
    if (Array.isArray(parent) && typeof segment === "number") {
      parent = parent[segment];
    } else if (isRecord(parent) && typeof segment === "string") {
      parent = parent[segment];
    }
  }

  if (Array.isArray(parent) && typeof last === "number") parent.splice(last, 1);
  if (isRecord(parent) && typeof last === "string") delete parent[last];

  return copy;
}

function emptyArrayItem(items: unknown[]) {
  const sample = items[items.length - 1];

  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (isRecord(sample)) {
    return Object.fromEntries(Object.keys(sample).map((key) => [key, ""]));
  }

  return "";
}

export default function CollectionManager({
  pageSlug,
  collectionPath,
  title,
  subtitle,
  itemLabel,
  searchPlaceholder,
  newItem,
  titleKey = "title",
  descriptionKey = "description",
  imageKey = "image",
  primaryTagKey = "category",
  secondaryTagKey = "duration",
  emptyText,
}: CollectionManagerProps) {
  const [page, setPage] = useState<SitePageRecord | null>(null);
  const [items, setItems] = useState<ItemRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<ItemRecord>(newItem);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [status, setStatus] = useState("Loading content...");
  const [uploadingField, setUploadingField] = useState("");

  async function load() {
    setStatus("Loading content...");

    const response = await fetch(`/api/cms/${pageSlug}`, {cache: "no-store"});

    if (!response.ok) {
      setStatus(`Could not load ${title}.`);
      return;
    }

    const data = (await response.json()) as SitePageRecord;
    const collection = getAtPath(data.content, collectionPath);

    setPage(data);
    setItems(Array.isArray(collection) ? collection.filter(isRecord) : []);
    setStatus(`${title} loaded.`);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSlug, collectionPath.join(".")]);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const list = [...items];

    if (!term) return list;

    return list.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(term),
    );
  }, [items, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const activeCount = items.filter((item) => item.published !== false).length;
  const pendingCount = items.length - activeCount;

  function openCreate() {
    setEditingIndex(null);
    setDraft({...clone(newItem), published: true});
    setIsEditorOpen(true);
    setStatus(`Creating a new ${itemLabel.toLowerCase()}.`);
  }

  function openEdit(item: ItemRecord) {
    const originalIndex = items.indexOf(item);

    setEditingIndex(originalIndex);
    setDraft(clone(item));
    setIsEditorOpen(true);
    setStatus(`Editing ${getItemText(item, titleKey)}.`);
  }

  function closeEditor() {
    setEditingIndex(null);
    setDraft(newItem);
    setIsEditorOpen(false);
  }

  async function saveCollection(
    nextItems: ItemRecord[],
    successMessage: string,
  ) {
    if (!page) return;

    const nextContent = setAtPath(page.content, collectionPath, nextItems);

    const response = await fetch(`/api/cms/${page.slug}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        slug: page.slug,
        title: page.title,
        seoTitle: page.seoTitle ?? "",
        seoDescription: page.seoDescription ?? "",
        content: nextContent,
      }),
    });

    if (!response.ok) {
      setStatus("Could not save changes.");
      return;
    }

    const saved = (await response.json()) as SitePageRecord;
    const collection = getAtPath(saved.content, collectionPath);

    setPage(saved);
    setItems(Array.isArray(collection) ? collection.filter(isRecord) : []);
    setStatus(successMessage);
  }

  async function saveDraft() {
    const nextItems = [...items];

    if (editingIndex === null) nextItems.unshift(draft);
    else nextItems[editingIndex] = draft;

    await saveCollection(
      nextItems,
      `${getItemText(draft, titleKey)} saved and ${
        draft.published === false ? "kept as draft" : "published"
      }.`,
    );

    closeEditor();
  }

  async function deleteItem(item: ItemRecord) {
    const index = items.indexOf(item);

    if (index < 0) return;

    const confirmed = window.confirm(`Delete ${getItemText(item, titleKey)}?`);

    if (!confirmed) return;

    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);

    await saveCollection(nextItems, `${getItemText(item, titleKey)} deleted.`);
  }

  async function togglePublish(item: ItemRecord) {
    const index = items.indexOf(item);

    if (index < 0) return;

    const nextItems = [...items];

    nextItems[index] = {...item, published: item.published === false};

    await saveCollection(
      nextItems,
      `${getItemText(item, titleKey)} ${
        nextItems[index].published === false ? "unpublished" : "published"
      }.`,
    );
  }

  async function uploadImage(path: Path, file: File | null) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus("Please choose a valid image file.");
      return;
    }

    const key = pathKey(path);
    const formData = new FormData();

    formData.append("file", file);
    setUploadingField(key);
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

      let nextDraft = updateByPath(draft, path, data.url);
      const last = path[path.length - 1];

      if (typeof last === "string") {
        const parentPath = path.slice(0, -1);
        const altPath = [...parentPath, "alt"];
        nextDraft = updateByPath(
          nextDraft,
          altPath,
          imageAltFromFileName(file.name),
        );
      }

      setDraft(nextDraft);
      setStatus("Image uploaded. Alt text was created as editable text.");
    } finally {
      setUploadingField("");
    }
  }

  function renderField(path: Path, label: string | number, value: unknown) {
    const inputClass =
      "w-full rounded-xl border-none bg-[#f2f4f7] px-3 py-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition focus:ring-[#320056]/25 sm:px-4";

    if (Array.isArray(value)) {
      return (
        <div className="rounded-2xl border border-slate-100 bg-white p-3 md:col-span-2 sm:p-4">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#320056]">
              {titleCase(label)}
            </p>

            <button
              type="button"
              onClick={() =>
                setDraft((current) =>
                  updateByPath(current, path, [
                    ...value,
                    emptyArrayItem(value),
                  ]),
                )
              }
              className="rounded-full bg-[#320056] px-4 py-2 text-xs font-bold text-white">
              Add item
            </button>
          </div>

          <div className="space-y-3">
            {value.map((child, index) => (
              <div
                key={`${pathKey(path)}-${index}`}
                className="rounded-xl bg-[#f7f9fc] p-3">
                <div className="mb-2 flex justify-between">
                  <span className="text-xs font-bold text-slate-400">
                    Item {index + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setDraft((current) =>
                        removeByPath(current, [...path, index]),
                      )
                    }
                    className="text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>

                {isRecord(child)
                  ? renderObject([...path, index], child)
                  : renderField([...path, index], index, child)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isRecord(value)) return renderObject(path, value);

    if (typeof value === "boolean") {
      return (
        <label className="flex items-center justify-between gap-4 rounded-xl bg-[#f7f9fc] px-3 py-3 text-sm font-bold text-[#320056] sm:px-4">
          <span>{titleCase(label)}</span>

          <input
            type="checkbox"
            checked={value}
            onChange={(event) =>
              setDraft((current) =>
                updateByPath(current, path, event.target.checked),
              )
            }
            className="h-5 w-5 rounded border-slate-300 text-[#320056]"
          />
        </label>
      );
    }

    if (isImageField(String(label), value)) {
      const imageValue = typeof value === "string" ? value : "";
      const key = pathKey(path);

      return (
        <div className="space-y-3 rounded-2xl bg-[#f7f9fc] p-3 text-sm font-bold text-[#320056] sm:p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
              {titleCase(label)}
            </span>

            <ImageIcon size={16} className="text-[#005768]" />
          </div>

          {imageValue ? (
            <img
              src={imageValue}
              alt={String(draft.alt || title)}
              className="h-36 w-full rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-36 items-center justify-center rounded-xl bg-white text-slate-300">
              <ImageIcon />
            </div>
          )}

          <label className="block cursor-pointer rounded-xl border border-dashed border-[#005768]/30 bg-white px-4 py-4 text-center text-xs font-extrabold text-[#320056] hover:bg-[#50d9fe]/10">
            {uploadingField === key
              ? "Uploading image..."
              : "Choose image from device"}

            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploadingField === key}
              onChange={(event) =>
                void uploadImage(path, event.target.files?.[0] ?? null)
              }
            />
          </label>

          <input
            value={imageValue}
            onChange={(event) =>
              setDraft((current) =>
                updateByPath(current, path, event.target.value),
              )
            }
            className={inputClass}
            placeholder="Saved image path"
          />
        </div>
      );
    }

    const valueText = value == null ? "" : String(value);
    const isLong =
      valueText.length > 70 ||
      /description|body|excerpt|statement|note|quote|objective/i.test(
        String(label),
      );

    return (
      <label className="space-y-2 text-sm font-bold text-[#320056]">
        <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
          {titleCase(label)}
        </span>

        {isLong ? (
          <textarea
            value={valueText}
            onChange={(event) =>
              setDraft((current) =>
                updateByPath(current, path, event.target.value),
              )
            }
            className={`${inputClass} min-h-28`}
          />
        ) : (
          <input
            value={valueText}
            onChange={(event) =>
              setDraft((current) =>
                updateByPath(current, path, event.target.value),
              )
            }
            className={inputClass}
          />
        )}
      </label>
    );
  }

  function renderObject(path: Path, object: ItemRecord) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Object.entries(object).map(([key, value]) => (
          <div
            key={`${pathKey(path)}-${key}`}
            className={
              isRecord(value) || Array.isArray(value) ? "md:col-span-2" : ""
            }>
            {renderField([...path, key], key, value)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-15 sm:mt-0 overflow-x-hidden bg-[#f7f9fc] text-[#191c1e]">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 px-3 py-4 backdrop-blur-xl sm:px-6 sm:py-5 lg:px-10">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <h1 className="font-sans text-xl font-extrabold tracking-tight text-[#320056] sm:text-2xl">
              {title}
            </h1>

            <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              {subtitle}
            </p>
          </div>

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
              placeholder={searchPlaceholder}
            />
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
                  {activeCount} Published {itemLabel}s
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#320056]/5 px-4 py-2 text-sm font-bold text-[#320056]">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  {pendingCount} Drafts
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                <button
                  onClick={load}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
                  <RefreshCw size={16} /> Refresh
                </button>

                <button
                  onClick={openCreate}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#320056] to-[#4b0082] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#320056]/20">
                  <Plus size={16} /> Add New {itemLabel}
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
                {updatedDate(page)}
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:gap-5">
          {paginatedItems.length ? (
            paginatedItems.map((item) => {
              const image = item[imageKey];
              const primaryTag = item[primaryTagKey];
              const secondaryTag = item[secondaryTagKey];

              return (
                <article
                  key={`${getItemText(item, titleKey)}-${items.indexOf(item)}`}
                  className="group relative overflow-hidden rounded-2xl border-l-4 border-[#005768] bg-white p-4 transition-all hover:shadow-xl hover:shadow-[#320056]/5 sm:p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                    <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e6e8eb] text-[#320056] sm:h-28 md:w-44">
                      {typeof image === "string" && image ? (
                        <img
                          src={image}
                          alt={String(item.alt || getItemText(item, titleKey))}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <ImageIcon size={38} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {typeof primaryTag === "string" && primaryTag && (
                          <span className="rounded bg-[#f0dbff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#320056]">
                            {primaryTag}
                          </span>
                        )}

                        {typeof secondaryTag === "string" && secondaryTag && (
                          <span className="rounded bg-[#b3ebff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#005768]">
                            {secondaryTag}
                          </span>
                        )}

                        <span
                          className={`rounded px-2 py-1 text-[10px] font-black uppercase tracking-widest ${
                            item.published === false
                              ? "bg-amber-100 text-amber-700"
                              : "bg-teal-100 text-teal-700"
                          }`}>
                          {item.published === false ? "Draft" : "Published"}
                        </span>
                      </div>

                      <h2 className="font-sans text-lg font-extrabold leading-tight text-[#320056] sm:text-xl">
                        {getItemText(item, titleKey)}
                      </h2>

                      <p className="line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {getItemDescription(item, descriptionKey)}
                      </p>
                    </div>

                    <div className="flex w-full justify-end gap-2 md:w-auto md:self-center">
                      <button
                        type="button"
                        onClick={() => void togglePublish(item)}
                        className="rounded-full p-3 text-[#005768] transition hover:bg-[#005768]/5"
                        title={
                          item.published === false ? "Publish" : "Unpublish"
                        }>
                        {item.published === false ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="rounded-full p-3 text-[#320056] transition hover:bg-[#320056]/5"
                        title={`Edit ${itemLabel}`}>
                        <PencilLine size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => void deleteItem(item)}
                        className="rounded-full p-3 text-red-600 transition hover:bg-red-50"
                        title={`Delete ${itemLabel}`}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl bg-white p-6 text-sm font-semibold text-slate-500 sm:p-8">
              {emptyText || `No ${itemLabel.toLowerCase()} records found.`}
            </div>
          )}
        </section>

        <footer className="flex flex-col gap-4 border-t border-slate-100 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <p className="text-sm font-semibold leading-6 text-slate-400">
            Showing{" "}
            <span className="text-slate-800">
              {filteredItems.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-
              {Math.min(currentPage * PAGE_SIZE, filteredItems.length)}
            </span>{" "}
            of <span className="text-slate-800">{filteredItems.length}</span>{" "}
            {itemLabel}s
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setCurrentPage((pageNumber) => Math.max(1, pageNumber - 1))
              }
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
                setCurrentPage((pageNumber) =>
                  Math.min(totalPages, pageNumber + 1),
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100">
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>

        <div className="rounded-2xl bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-600 shadow-sm">
          {status}
        </div>
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#320056]/20 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl sm:max-h-[92vh] sm:rounded-[1.5rem]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-5 sm:py-5 lg:px-8">
              <div className="min-w-0">
                <h2 className="font-sans text-xl font-extrabold leading-tight text-[#320056] sm:text-2xl">
                  {editingIndex === null
                    ? `New ${itemLabel}`
                    : `Edit ${itemLabel}`}
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Create, update, publish, and save this content item to
                  PostgreSQL.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditor}
                className="shrink-0 rounded-full p-2 text-slate-500 transition hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[calc(95vh-190px)] overflow-y-auto px-4 py-5 sm:max-h-[calc(92vh-170px)] sm:px-5 sm:py-6 lg:px-8">
              {renderObject([], draft)}
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5 lg:px-8">
              <p className="rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-medium leading-6 text-slate-600">
                {status}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:flex sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="rounded-full px-6 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100">
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => void saveDraft()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#320056] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#320056]/20">
                  <Save size={16} /> Save {itemLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
