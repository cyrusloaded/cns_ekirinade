import type {FacilitiesPageContent, LandingPageContent, NewsPageContent, ProgrammesPageContent} from "@/types/cms";
import {slugify} from "@/lib/slug";
import {publishedItems} from "@/lib/visibility";

export type DetailContentItem = {
  slug: string;
  title: string;
  eyebrow?: string;
  category?: string;
  date?: string;
  duration?: string;
  image?: string;
  imageAlt?: string;
  description: string;
  body: string[];
  meta?: Array<{label: string; value: string}>;
  backHref: string;
  backLabel: string;
};

function paragraphs(value?: string | string[]): string[] {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

export function getNewsDetailItems(content: NewsPageContent): DetailContentItem[] {
  const featuredTitle = content.featuredStory.title;
  const featuredSlug = content.featuredStory.slug || slugify(featuredTitle);

  const featured: DetailContentItem = {
    slug: featuredSlug,
    title: featuredTitle,
    eyebrow: "Featured Story",
    category: content.featuredStory.category,
    date: content.featuredStory.date,
    image: content.featuredStory.image,
    imageAlt: content.featuredStory.alt || featuredTitle,
    description: content.featuredStory.description,
    body: paragraphs(content.featuredStory.body).length
      ? paragraphs(content.featuredStory.body)
      : [
          content.featuredStory.description,
          "This story highlights the College of Nursing Science, Ekinrin-Adde's commitment to academic excellence, clinical confidence, and compassionate service.",
          "Students, staff, and partners continue to work together to strengthen healthcare education and community impact.",
        ],
    meta: [
      {label: "Category", value: content.featuredStory.category},
      {label: "Published", value: content.featuredStory.date},
    ],
    backHref: "/news",
    backLabel: "Back to News",
  };

  const updates = publishedItems(content.updates).map((item) => ({
    slug: item.slug || slugify(item.title),
    title: item.title,
    eyebrow: "News Update",
    category: item.category,
    date: item.date,
    image: item.image,
    imageAlt: item.alt || item.title,
    description: item.excerpt,
    body: paragraphs(item.body).length
      ? paragraphs(item.body)
      : [
          item.excerpt,
          "Read the full update from the College community as we continue documenting important academic, spiritual, and clinical milestones.",
          "This update is part of our ongoing commitment to keeping students, parents, alumni, and partners informed.",
        ],
    meta: [
      {label: "Category", value: item.category},
      {label: "Published", value: item.date},
    ],
    backHref: "/news",
    backLabel: "Back to News",
  }));

  return [featured, ...updates];
}

export function getChronicleDetailItems(content: LandingPageContent): DetailContentItem[] {
  return content.chronicles.items.map((item) => ({
    slug: item.slug || slugify(item.title),
    title: item.title,
    eyebrow: "Campus Chronicle",
    category: item.category,
    image: item.image,
    imageAlt: item.alt || item.title,
    description: item.desc,
    body: paragraphs(item.body).length
      ? paragraphs(item.body)
      : [
          item.desc,
          "This campus chronicle captures an important moment in the life of the College of Nursing Science, Ekinrin-Adde.",
          "The story reflects our ongoing commitment to academic excellence, faith formation, community service, and professional growth.",
        ],
    meta: [{label: "Category", value: item.category}],
    backHref: "/news",
    backLabel: "Back to News",
  }));
}

export function getProgrammeDetailItems(content: ProgrammesPageContent): DetailContentItem[] {
  const featuredTitle = content.featuredProgramme.titleLines.join(" ").trim();
  const featuredSlug = content.featuredProgramme.slug || slugify(featuredTitle);

  const featured: DetailContentItem = {
    slug: featuredSlug,
    title: featuredTitle,
    eyebrow: content.featuredProgramme.eyebrow,
    duration: content.featuredProgramme.duration,
    description: content.featuredProgramme.description,
    body: paragraphs(content.featuredProgramme.body).length
      ? paragraphs(content.featuredProgramme.body)
      : [
          content.featuredProgramme.description,
          `${content.featuredProgramme.requirementsTitle}: ${content.featuredProgramme.requirements.join("; ")}.`,
          "This programme prepares students through classroom learning, supervised clinical exposure, professional discipline, and compassionate service.",
        ],
    meta: [
      {label: "Duration", value: content.featuredProgramme.duration},
      {label: "Programme Type", value: content.featuredProgramme.eyebrow},
    ],
    backHref: "/programmes",
    backLabel: "Back to Programmes",
  };

  const programmes = publishedItems(content.programmes).map((item) => ({
    slug: item.slug || slugify(item.title),
    title: item.title,
    eyebrow: item.noteTitle,
    duration: item.duration,
    description: item.description,
    body: paragraphs(item.body).length
      ? paragraphs(item.body)
      : [
          item.description,
          `${item.noteTitle}: ${item.note}.`,
          "The programme is structured to help learners build professional competence, ethical judgment, and practical confidence for healthcare service.",
        ],
    meta: [
      {label: "Duration", value: item.duration},
      {label: item.noteTitle, value: item.note},
    ],
    backHref: "/programmes",
    backLabel: "Back to Programmes",
  }));

  return [featured, ...programmes];
}

export function getFacilityDetailItems(content: FacilitiesPageContent): DetailContentItem[] {
  const items: DetailContentItem[] = [];

  items.push({
    slug: content.campusFacilities.featured.slug || slugify(content.campusFacilities.featured.title),
    title: content.campusFacilities.featured.title,
    eyebrow: content.campusFacilities.featured.tag || "Featured Facility",
    image: content.campusFacilities.featured.image,
    imageAlt: content.campusFacilities.featured.alt || content.campusFacilities.featured.title,
    description: content.campusFacilities.featured.description,
    body: paragraphs(content.campusFacilities.featured.body).length
      ? paragraphs(content.campusFacilities.featured.body)
      : [
          content.campusFacilities.featured.description,
          `Key features include: ${content.campusFacilities.featured.chips.join(", ")}.`,
          "This facility supports the College's mission of blending rigorous learning with hands-on healthcare preparation.",
        ],
    meta: content.campusFacilities.featured.chips.map((chip) => ({label: "Feature", value: chip})),
    backHref: "/facilities",
    backLabel: "Back to Facilities",
  });

  content.campusFacilities.items.forEach((item) => {
    items.push({
      slug: item.slug || slugify(item.title),
      title: item.title,
      eyebrow: "Campus Facility",
      image: item.image,
      imageAlt: item.alt || item.title,
      description: item.description,
      body: paragraphs(item.body).length
        ? paragraphs(item.body)
        : [
            item.description,
            "This facility contributes to a learning environment where students are supported academically, clinically, and spiritually.",
          ],
      backHref: "/facilities",
      backLabel: "Back to Facilities",
    });
  });

  items.push({
    slug: content.campusFacilities.clinic.slug || slugify(content.campusFacilities.clinic.title),
    title: content.campusFacilities.clinic.title,
    eyebrow: "Student Support",
    image: content.campusFacilities.clinic.image,
    imageAlt: content.campusFacilities.clinic.alt || content.campusFacilities.clinic.title,
    description: content.campusFacilities.clinic.description,
    body: paragraphs(content.campusFacilities.clinic.body).length
      ? paragraphs(content.campusFacilities.clinic.body)
      : [
          content.campusFacilities.clinic.description,
          `Benefits include: ${content.campusFacilities.clinic.benefits.join(", ")}.`,
        ],
    meta: content.campusFacilities.clinic.benefits.map((benefit) => ({label: "Benefit", value: benefit})),
    backHref: "/facilities",
    backLabel: "Back to Facilities",
  });

  return items;
}
