export type StaffCategory =
  | "All Staff"
  | "Nursing Faculty"
  | "Administration"
  | "Clinical Research";

export type StaffMember = {
  id: number;
  name: string;
  role: string;
  category: Exclude<StaffCategory, "All Staff">;
  email: string;
  description: string;
  image: string;
  alt: string;
  featured?: boolean;
};

export const categories: StaffCategory[] = [
  "All Staff",
  "Nursing Faculty",
  "Administration",
  "Clinical Research",
];

export const facultyStaff: StaffMember[] = [
  {
    id: 1,
    name: "Dr. Elizabeth Ojo",
    role: "Dean of Nursing",
    category: "Nursing Faculty",
    email: "e.ojo@cns-ekinrin.edu",
    featured: true,
    description:
      "Specializing in Critical Care Nursing with over 20 years of experience in both academic leadership and intensive care practice.",
    alt: "Professional portrait of a female nurse educator in clinical attire",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfyEMJz9Sn7RVw3pMDlfEYmKwCI3I29jO6A6Ppy_497aFKzeiyYCnmpm84fcvDaW8c2N3GOh2qG00jC79jZ3cB7hGlaC-m4HDGcB7p9t23R25gftg1biXEpRpL4crDKq5bt5TxITYy23Etq3qmiO76qyFFbS5yH1iftSAjgcf2FZph0zKx2v6qDlrXQB--NPktB8CYTVW7HtgQvqrLSfPG5d4_gTg3P8XSCTpGVWLWmOUvR0AvF8o-vGgfJUzU6-RId_MyGY8kcGI",
  },
  {
    id: 2,
    name: "Prof. Samuel Adebayo",
    role: "Head of Sciences",
    category: "Clinical Research",
    email: "s.adebayo@cns-ekinrin.edu",
    description:
      "Leading our Anatomy and Physiology department, Professor Adebayo integrates spiritual wellness with biological precision.",
    alt: "Professional male doctor in medical white coat",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgIofLaoxsSzCr3hW6CgUXCQKdEeLoTKeLbOMSs3bEvuy7O7dMNaKZP-qzrJH8tqf04pxvgcgd-vKqgylMpk0nenBuCbOoPhdj2GvbjEJvTAbHjvHEKHgF9AKP33ywXl8dKEOzQmdMTmF0b74tNoxV5z8a7VIQZhgr9hXSWTXmINyjlBtOph5Oe1oJkpdzHSXfP7wlarmObn32U8ZYExpDMp8mkBPtmunclSqLXhZi_qlzF9rjoWIV2h7HGZwF2ZNwK9Phu-eH5CQ",
  },
  {
    id: 3,
    name: "Mrs. Sarah Williams",
    role: "Clinical Instructor",
    category: "Nursing Faculty",
    email: "s.williams@cns-ekinrin.edu",
    description:
      "Dedicated to pediatric nursing excellence and mentoring students through their first clinical placements.",
    alt: "Professional female medical researcher in a modern laboratory setting",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJTrzdFuv4Xo9KKqXog5aSZ9h0bzw-InhlxxM0U-cUQea3cEsmN0mnSXNa-LE-V4QAxu9_6vq_rowwBZ1ebFCXkZO9kedRRI74jKMqZTm-I4K8A05158_02VXRSvtOZrp3oFRgFSYCn3Sy7lD9Zymce6hA9V6ItPdz3q767jSYRc_6tz7QGcLXr6DpFADZGNV_e6dkCjoR-i0ZfI4xvBqoSJnAlzxB1saB1Zy6WSo9n4VXhDVzVK66G2ZYxAs5yNPYUiR5_C6hC9k",
  },
  {
    id: 4,
    name: "Mr. James Folorunsho",
    role: "Registrar",
    category: "Administration",
    email: "registrar@cns-ekinrin.edu",
    description:
      "Managing academic records and student progression with precision and administrative excellence.",
    alt: "Mature professional male healthcare administrator",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcwa_nA2KP1wRuykPF5VDc5Fvn69FxDfmnUD8xjKK8EekIXjC4QRxcppslwmRXEYq5t3-zSSb6zdiBt_E93E0i1ycJSWmsG8GTeOItxI2ldFCUERY9Zf-eLjczpyxnyROog_Z2qfi9uZUF1pmgZn-4tn7kR58fVwXQTNmr6Z7wIDsZvsvent60vD6ycuQg4EW9Y0Cxtn9JN5p7Oh-r0I4dGGBwy1jCDMKtLURKLYA51-iax2seBrDJqMQLYBmDfS0fEdtvf3TrhvI",
  },
  {
    id: 5,
    name: "Dr. Martha Gabriel",
    role: "Senior Lecturer",
    category: "Clinical Research",
    email: "m.gabriel@cns-ekinrin.edu",
    description:
      "An expert in Community Health Nursing, Dr. Martha focuses on rural healthcare delivery and epidemiology.",
    alt: "Smiling female medical professor with silver hair",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyIszB3Nvx0dmTJ_uASWrsckQq8Y-BlqwWourpHEsa_1LAEC7j-EBFPe2idN5iL4W272gcepOQYRFP37W8Z4uF9M2uRU62fKPFBcH-AC1b9ZWIizGyM-9rpm7DVsx0wesHaW3yvXvd9yT4TtLJ-hiztlMd11lOtrIvqukXmm_O1MUI13BfUkqHfxjX2WU1KnBd7YL14tfOoxL85tbCzRXT1Yxx9rW0ZdXCdfUP8zX-Q8PswmAhpf_9zxTDXX1h-e1w6rlgyBGYCnE",
  },
];
