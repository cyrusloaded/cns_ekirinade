export const newsCategories = [
  "All Updates",
  "Academic",
  "Faith",
  "Campus News",
  "Clinical Practice",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export const featuredStory = {
  category: "Academic",
  date: "Oct 24, 2024",
  title:
    "Advancing Nursing Excellence: New Clinical Simulation Lab Inauguration",
  description:
    "The College of Nursing Science, Ekinrin-Adde reaches a new milestone with the unveiling of a multi-million naira state-of-the-art simulation facility designed to bridge the gap between theory and bedside practice.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3a7Vvan6vnPk5-HbTOMhHpi9pw8nTKJgqFEYRoH0_UpqaQtyL254iEaRGTGXP597QvB4-qq6hNPeGnKtgjIDHCrrSt9A2-jOvBCg3kIVvdmEeA-74dQt3kdKvMgCOg-dUs9-a39SFVYsP669Gb_RWF1sdVU-cxSMWGmRxPi5JVpqiQIQqSae7fo53GwvhrxuFn4B9w40Zx8oapo5HoRE1K-VJfTlOl3q4bhdwxKh8AmmQzP92G_br42Ljvvj-xueshmBpcWuW0-A",
};

export const retreatCard = {
  title: "Upcoming Spiritual Retreat: Healing the Healer",
  description:
    "Join us for a weekend of prayer and meditation as we focus on the spiritual well-being of our future nursing leaders.",
};

export const keyDates = [
  {
    month: "NOV",
    day: "12",
    title: "Mid-Semester Clinical Assessments",
    location: "General Ward 4, 8:00 AM",
  },
  {
    month: "NOV",
    day: "18",
    title: "Annual Health & Wellness Fair",
    location: "Community Sports Complex",
  },
];

export type UpdateItem = {
  id: number;
  category: NewsCategory | "Clinical";
  date: string;
  title: string;
  excerpt: string;
  image: string;
  accent: string;
};

export const updates: UpdateItem[] = [
  {
    id: 1,
    category: "Campus News",
    date: "October 20, 2024",
    title: "Digital Library Upgrade: Expanded Medical Journals Access",
    excerpt:
      "Students now have unlimited access to over 5,000 premium medical journals through our new partnership with global research networks.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAylW1Jv-pWFoCRt2TwGzuV2j2J2vKCoHxOJW-RqU_0-zeTQdIER-eqrUy3C_VK7k7FiKzzoD1hb67QuMeUjCg5lIUow2010IgzJ87qOQ58ScG6raTAmLFBXtFc9yCo_xK2AmZdWbeVlOy7qaj5FXbw9JOCxhDKCU6A8ePQpJVXXIc1Xo1uNoOWJ3ixQIqq81ARhx7_N1A1kvYY1TdOcJU40m2Cd-iaWMZihXlUa8-b5SUDkAqtbgtiWuBDDqrsDdgSU0-nIdoaszY",
    accent: "border-secondary",
  },
  {
    id: 2,
    category: "Faith",
    date: "October 15, 2024",
    title: "Evening of Grace: Faculty and Students Prayer Night",
    excerpt:
      "A beautiful evening of fellowship and worship as the college community gathered to dedicate the new semester to the Almighty.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSMhh3R1-Ce1nSgH9uBpJkHsyaaT8is4c7KMtTSxPN4nTalsYK7o4nGeUqzxhNMsrkRq6r--PCeST59_62YXKoFixFj_Y74ebeX2YmGw5BlJWr9sAo48qkn7kNnBk0i7cyWws339HK0cOuNOEiV0mXkThNjSTE1BxJtLobCSJo9_uBQkVEIzfsN_2bfSBQTOkQ8SEkPTwMuFd6-Elrcr72vz2Zy8oSznX4X9-uvpYeuGSmZax7bys9ImK-YAbHZ2yx-1O0b8W2VIg",
    accent: "border-primary",
  },
  {
    id: 3,
    category: "Clinical Practice",
    date: "October 08, 2024",
    title: "Community Outreach: Impacting Ekinrin-Adde Local Communities",
    excerpt:
      "Over 200 residents received free medical screenings during our recent student-led community health outreach program.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtTzoKfUAsHUvuxqfAFebWMiHXqXH4He7jneug1k6J76I_m1Mth7wUndw1C0ipBDmw_I0YYXOWZ6bC_UD1ywAKGpifGljsN3msXT2JjcQYvl0xs_BoAsJdPiDFfTOUAl4sUWgNu0lbB2fg6xhH7ADPmtHX1XFQel4wh9x_rkaNZG4Mp6Tt8qvhC0sfmQ4zPXlLhW6tZrJISxEDTo085KsNkAJ_QkawswkgFEFwJxYgInz8tGUQGtgaWo1L3CI5sXWJPEXE_p5wpf0",
    accent: "border-teal-500",
  },
];
