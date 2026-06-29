import type {
  AboutPageContent,
  AdmissionPageContent,
  ContactPageContent,
  FacilitiesPageContent,
  FacultyPageContent,
  FooterContent,
  GalleryPageContent,
  LandingPageContent,
  NavItem,
  NewsPageContent,
  PageContent,
  ProgrammesPageContent,
} from "@/types/cms";

export const navigationSeed: NavItem[] = [
  {label: "Home", href: "/", order: 1},
  {label: "About", href: "/about", order: 2},
  {label: "Programmes", href: "/programmes", order: 3},
  {label: "Admissions", href: "/admission", order: 4},
  {label: "Facilities", href: "/facilities", order: 5},
  {label: "Faculty", href: "/facstaff", order: 6},
  {label: "Gallery", href: "/gallery", order: 7},
  {label: "News", href: "/news", order: 8},
  {label: "Contact", href: "/contacts", order: 9},
];

export const footerSeed: FooterContent = {
  brandName: "EKINRIN-ADDE NURSING",
  tagline: "Healing through Knowledge and Faith.",
  addressLines: ["College Campus, Ekinrin-Adde,", "Kogi State, Nigeria"],
  phone: "+234 7038 301 203",
  email: "admissions@ekinrin-addenursing.edu.ng",
  bottomText:
    "© 2024 College of Nursing Science, Ekinrin-Adde. Healing through Knowledge and Faith.",
  quickLinks: [
    {
      title: "Quick Links",
      links: [
        {label: "Privacy Policy", href: "#"},
        {label: "Accreditation", href: "#"},
        {label: "Contact Us", href: "/contacts"},
        {label: "Alumni", href: "#"},
      ],
    },
    {
      title: "Programmes",
      links: [
        {label: "General Nursing", href: "/programmes"},
        {label: "Basic Midwifery", href: "/programmes"},
        {label: "Continuing Education", href: "/programmes"},
        {label: "Clinical Fellowships", href: "/programmes"},
      ],
    },
  ],
};

export const landingSeed: PageContent<LandingPageContent> = {
  slug: "home",
  title: "Home",
  seoTitle: "College of Nursing Science, Ekinrin-Adde",
  seoDescription: "Faith-driven nursing education with academic excellence.",
  content: {
    hero: {
      badge: "Faith & Science United",
      titleLines: ["Raising", "Competent &", "Christ-Centred", "Leaders"],
      highlightLine: "Compassionate,",
      description:
        "Welcome to the College of Nursing Science, Ekinrin-Adde. We blend rigorous academic standards with the healing touch of Christian faith to shape the future of healthcare.",
      primaryCta: {label: "Begin Your Journey", href: "/admission"},
      secondaryCta: {label: "Explore Programmes", href: "/programmes"},
      image: {src: "/banner-1.png", alt: "Nursing students"},
      floatingCard: {
        title: "Accredited Excellence",
        description:
          "Ranked among the top nursing institutions for clinical practice and character formation.",
      },
    },
    missionVision: {
      mission: {
        title: "Our Mission",
        body: "To provide world-class nursing education integrated with Christian values, empowering students to serve with scientific precision and the unconditional love of Christ in a diverse world.",
      },
      vision: {
        title: "Our Vision",
        body: "To raise a new generation of compassionate and competent nursing leaders equipped to transform healthcare systems through excellence, faith, and service.",
      },
    },
    programmes: {
      header: {
        title: "Our Professional Paths",
        description: "Specialized training for the future of healthcare",
        viewAllLabel: "View All Programmes",
        viewAllHref: "/programmes",
      },
      cards: [
        {
          title: "General Nursing",
          slug: "general-nursing-rn",
          category: "Nursing Science",
          duration: "3-Year Programme",
          description:
            "Comprehensive clinical training to become a compassionate Registered Nurse.",
          image: {src: "/path1.png", alt: "Nursing"},
          icon: "Stethoscope",
          ctaLabel: "Learn More",
        },
        {
          title: "Midwifery",
          slug: "post-basic-midwifery",
          category: "Midwifery",
          duration: "2-Year Programme",
          description:
            "Specialized care in maternal and newborn health with clinical expertise.",
          image: {src: "/path2.png", alt: "Midwifery"},
          icon: "UsersRound",
          ctaLabel: "Learn More",
        },
      ],
    },
    chronicles: {
      title: "Campus Chronicles",
      items: [
        {
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDZR2ZfxSl-DAbtiUlxD-xtOdHjsT0zKcbg-kXRLiaPmlGOZ5WvWGaJ3dbbNq-zOjdRumh3tiz09o8K55Wt67YCxLOG7eFMwZqgj_e4IcS_ePlT-cOeulwaHY1hoaARDGk_UUkijOZMBG55YQdiCe_7UbHgpcsc6aZQIAgRkDAPMI-luEuu0CFvfYJOTaVvXjQZKCPuNel-txnl3dzSMoYKZ3n_4tqriW7Ktn5Nhh2cmbUZYc8XPEn6mfMEm1nIrkbATOh2cZULefE",
          category: "Academic • June 15, 2024",
          title: "2024 Matriculation Ceremony Announced",
          slug: "2024-matriculation-ceremony-announced",
          desc: "Welcoming our newest batch of nursing students...",
          href: "/news",
        },
        {
          image:
            "https://images.unsplash.com/photo-1588776814546-ec7e1a7b2d3d?q=80&w=1200",
          category: "Faith • May 22, 2024",
          title: "Spiritual Wellness Retreat",
          slug: "spiritual-wellness-retreat",
          desc: "A time of reflection before entering healthcare practice...",
          href: "/news",
        },
        {
          image:
            "https://images.unsplash.com/photo-1581093458791-9f3c3900dfb4?q=80&w=1200",
          category: "Research • April 10, 2024",
          title: "Community Health Grant Awarded",
          slug: "community-health-grant-awarded",
          desc: "Advancing rural healthcare innovation...",
          href: "/news",
        },
      ],
    },
  },
};

export const aboutSeed: PageContent<AboutPageContent> = {
  slug: "about",
  title: "About",
  content: {
    hero: {
      eyebrow: "Established in Excellence",
      title: "Nurturing the Healers of Tomorrow.",
      description:
        "At the heart of Ekinrin-Adde, we bridge the gap between clinical precision and spiritual compassion. Our institution is dedicated to producing world-class nursing professionals guided by faith and science.",
      image: {src: "/about.png", alt: "Modern medical college campus building"},
    },
    missionVision: {
      mission: {
        title: "Our Mission",
        body: "To provide globally competitive nursing education that integrates rigorous academic scholarship with Christ-centered values, fostering professionals who serve with competence and compassion.",
      },
      vision: {
        title: "Our Vision",
        body: "To be a premier nursing institution recognized for transformative education, spiritual integrity, and a pioneering spirit in healthcare innovation across the African continent and beyond.",
      },
      story: {
        title: "A Legacy of Faith & Healing.",
        ctaLabel: "Explore Our History",
        intro:
          "Founded with a mandate to elevate nursing education in Nigeria, the College of Nursing Science, Ekinrin-Adde was born from a vision of community empowerment and spiritual service.",
        paragraphs: [
          "Our journey began with a simple belief: that healing is not just a medical process, but a spiritual calling. From our humble beginnings to our current status as a state-of-the-art learning hub, we have remained steadfast in our commitment to Ekinrin-Adde and the broader nursing community.",
          "Today, our alumni serve in leading medical facilities worldwide, carrying with them the distinctive blend of technical excellence and Christian ethics that defines an Ekinrin-Adde graduate.",
        ],
        images: [
          {src: "/mission1.png", alt: "Historical medical students"},
          {src: "/mission2.png", alt: "Modern nurse tools"},
        ],
      },
    },
    faith: {
      title: "Christ-Centered Education",
      description:
        "“For I will restore health to you and heal you of your wounds,” says the Lord. We believe that medical science is a vessel for God's restorative power. Our curriculum is infused with values of integrity, humility, and sacrificial service.",
      pillars: [
        {
          title: "Spiritual Mentorship",
          body: "Guiding students through regular chaplaincy support and faith forums.",
        },
        {
          title: "Ethical Integrity",
          body: "Upholding the highest moral standards in clinical practice and research.",
        },
        {
          title: "Service to All",
          body: "Treating every patient as a divine image-bearer with dignity and love.",
        },
      ],
    },
    leadership: {
      name: "Prof. Adedoyin Okunade",
      role: "Provost & Chief Administrator",
      title: "Welcome to the future of nursing leadership.",
      paragraphs: [
        "Our goal is not just to produce nurses who pass exams, but to nurture leaders who transform healthcare systems. Here at Ekinrin-Adde, we provide the environment where your clinical skills meet your heart's calling.",
        "We invite you to join our community of luminous scholars, where every lesson is a step toward healing the world.",
      ],
      portrait: {src: "/leader.png", alt: "Provost portrait"},
      signature: {src: "/signature.webp", alt: "Signature"},
    },
  },
};

export const facultySeed: PageContent<FacultyPageContent> = {
  slug: "facstaff",
  title: "Faculty & Staff",
  content: {
    header: {
      eyebrow: "Faculty & Administration",
      title: "Meet the educators and administrators shaping tomorrow’s nurses.",
      description:
        "Browse faculty, clinical mentors, and administrative staff by specialty or category.",
    },
    categories: [
      "All Staff",
      "Nursing Faculty",
      "Administration",
      "Clinical Research",
    ],
    staff: [
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
    ],
  },
};

export const gallerySeed: PageContent<GalleryPageContent> = {
  slug: "gallery",
  title: "Gallery",
  content: {
    hero: {
      eyebrow: "Campus Moments",
      title: "Gallery of Life at Ekinrin-Adde",
      description:
        "Explore clinical training, campus life, ceremonies, and community outreach.",
    },
    filters: [
      "All Moments",
      "Clinical Excellence",
      "Campus Life",
      "Graduation & Events",
    ],
    items: [
      {
        id: 1,
        title: "Simulation Lab Practice",
        category: "Clinical Excellence",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAQTAUGHYCPd_svvCBPC8JtlfC72VJBU0kTwlsCrLty5arMXkDbjUn9EQp3NOxP0FcKszsS9RmxJvNB6kMrKZZnUrTc9j6V1qAWxUx5avgndjO5BUoer2EWyr3m55ihfOB41kAYJmgw40qaP3x1m9v2Jm4wFn73dCt1pEDd9AXGGOgHZd4oVRWC0RZN2Dl7WzbtzzpGy2ZhF-FMFEfOfKxC3wXBk_0A0WQNIYigpbi4KKuRn_ttwUB52WnJVZWSdl9R_8O6GfvAlUA",
        alt: "Simulation lab",
        icon: "Stethoscope",
        className: "md:col-span-8",
        imageClassName: "aspect-[4/3] sm:aspect-[16/9]",
        featured: true,
        hasAccent: true,
      },
      {
        id: 2,
        title: "Study Circles at the Commons",
        category: "Campus Life",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC45sVmP5VNVaVQ47R0HMNUiqOgzxjZ9J2djREVhKusRyrHRUPQ1i2ZZc_JijNfPvuRDBvfpcrqtjyjLKA9u_TK9lckSsoOQOgZjwN-imZOMXk0kSynetCv8R1tedNaFea6KaPLy0OYYPdkg7QgOBSRxgrTVDT810YacI2Dj4en58EmD1hO-SxG8lALLd8pgLW3_ELC2nxWMg7TCnhnxf1M9oFdC6Xw_FxPm54mrNg5eGIURS4OoKk6-nK9PMdTPCQESFDs0q682YY",
        alt: "Study circles",
        icon: "School",
        className: "md:col-span-4",
        imageClassName: "aspect-[4/3] sm:aspect-square",
      },
      {
        id: 3,
        title: "Class of 2024 Pinning Ceremony",
        category: "Graduation & Events",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDWh2GqTajer2Y7EM6rTGfrXmWsIirGQKH0M2HqITQEy5GWmGu60rphmlbT2B8wJfPdpuiTtMZfH2n3ipNN9wxPgjmg9RGhEPd-63gBtsqIP8uC-Wdydru8e3e_fhGh63NSX4t_Splll20dvyf6soDI0dHDcvc732zb0MOQ3XVny4TRnrx0YeTbr-5BO52_d8Hyc-lCBuDCPQx26NW7eZcGku_SqpOqmxHLhYpMc8QeDsBhCPM3O38sWxd2fT0X7TA-QbgZLWHUPtg",
        alt: "Pinning ceremony",
        icon: "GraduationCap",
        className: "md:col-span-4",
        imageClassName: "aspect-[4/3] sm:aspect-[3/4]",
      },
    ],
    featuredLibrary: {
      title: "The Florence Nightingale Memorial Library",
      category: "Academic Facilities",
      description:
        "A sanctuary for research and academic excellence, housing the regions most comprehensive collection of medical literature.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpl21ldNRFyO_LK3KQOHmLnJ6CHgqvgMPpK6cJzoMz1qx6mrwR-demHHwJXuN9IQlVdHy19y-ciawe5me1y2ZB2dmIlLxSsI7ui2boEuimfakm-QhqVkgKJks35mwDJvUUxR36MBIpmrixknCQ20rvNKMuz9BKrgUwPbTqu_9c_VUKA4tmAEzc5d2a5kT5IDnuC5PoAwU_Rv_qehSc7MBEhYCsVKwvO569Vgdo5e-AqF4RMos3r3IY8DCdULTz8Hz8o0arBD0bXc0",
      alt: "Library",
      icon: "LibraryBig",
    },
    cta: {
      title: "Become Part of the Story",
      description:
        "Every moment on campus contributes to a deeper journey of service, excellence, and faith.",
      primaryLabel: "Apply Now",
      secondaryLabel: "View Admissions",
    },
  },
};

export const newsSeed: PageContent<NewsPageContent> = {
  slug: "news",
  title: "News",
  content: {
    hero: {
      eyebrow: "The Luminous Scholar Journal",
      title: "Latest News & Updates",
      description:
        "Stay informed about academic milestones, campus events, faith gatherings, and clinical initiatives.",
    },
    categories: [
      "All Updates",
      "Academic",
      "Faith",
      "Campus News",
      "Clinical Practice",
    ],
    featuredStory: {
      category: "Academic",
      date: "Oct 24, 2024",
      title:
        "Advancing Nursing Excellence: New Clinical Simulation Lab Inauguration",
      slug: "advancing-nursing-excellence-new-clinical-simulation-lab-inauguration",
      description:
        "The College of Nursing Science, Ekinrin-Adde reaches a new milestone with the unveiling of a multi-million naira state-of-the-art simulation facility designed to bridge the gap between theory and bedside practice.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB3a7Vvan6vnPk5-HbTOMhHpi9pw8nTKJgqFEYRoH0_UpqaQtyL254iEaRGTGXP597QvB4-qq6hNPeGnKtgjIDHCrrSt9A2-jOvBCg3kIVvdmEeA-74dQt3kdKvMgCOg-dUs9-a39SFVYsP669Gb_RWF1sdVU-cxSMWGmRxPi5JVpqiQIQqSae7fo53GwvhrxuFn4B9w40Zx8oapo5HoRE1K-VJfTlOl3q4bhdwxKh8AmmQzP92G_br42Ljvvj-xueshmBpcWuW0-A",
    },
    retreatCard: {
      title: "Upcoming Spiritual Retreat: Healing the Healer",
      description:
        "Join us for a weekend of prayer and meditation as we focus on the spiritual well-being of our future nursing leaders.",
    },
    keyDates: [
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
    ],
    updates: [
      {
        id: 1,
        category: "Campus News",
        date: "October 20, 2024",
        title: "Digital Library Upgrade: Expanded Medical Journals Access",
        slug: "digital-library-upgrade-expanded-medical-journals-access",
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
        slug: "evening-of-grace-faculty-and-students-prayer-night",
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
        slug: "community-outreach-impacting-ekinrin-adde-local-communities",
        excerpt:
          "Over 200 residents received free medical screenings during our recent student-led community health outreach program.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDtTzoKfUAsHUvuxqfAFebWMiHXqXH4He7jneug1k6J76I_m1Mth7wUndw1C0ipBDmw_I0YYXOWZ6bC_UD1ywAKGpifGljsN3msXT2JjcQYvl0xs_BoAsJdPiDFfTOUAl4sUWgNu0lbB2fg6xhH7ADPmtHX1XFQel4wh9x_rkaNZG4Mp6Tt8qvhC0sfmQ4zPXlLhW6tZrJISxEDTo085KsNkAJ_QkawswkgFEFwJxYgInz8tGUQGtgaWo1L3CI5sXWJPEXE_p5wpf0",
        accent: "border-teal-500",
      },
    ],
  },
};

export const programmesSeed: PageContent<ProgrammesPageContent> = {
  slug: "programmes",
  title: "Programmes",
  content: {
    hero: {
      titleLines: ["Our Academic", "Programmes"],
      description:
        "At Ekinrin-Adde, we blend clinical precision with compassionate care. Explore our specialized nursing tracks designed to shape the future of healthcare.",
    },
    featuredProgramme: {
      eyebrow: "Core Faculty",
      titleLines: ["General Nursing", "(RN)"],
      slug: "general-nursing-rn",
      description:
        "Our flagship program providing comprehensive training in medical-surgical, pediatric, and psychiatric nursing. Accredited by the Nursing and Midwifery Council of Nigeria.",
      duration: "3 Years (6 Semesters)",
      requirementsTitle: "Entry Requirements",
      requirements: [
        "5 O'Level credits (English, Maths, Bio, Chem, Phys)",
        "Minimum age of 17 years at the time of application",
        "Successful performance in entrance examination and interview",
      ],
    },
    programmes: [
      {
        title: "Post-Basic Midwifery",
        slug: "post-basic-midwifery",
        duration: "18 Months",
        description:
          "Specialized training focusing on maternal and neonatal health.",
        noteTitle: "PREREQUISITE",
        note: "Must be a Registered Nurse with a valid license.",
      },
      {
        title: "Public Health Nursing",
        slug: "public-health-nursing",
        duration: "2 Years",
        description: "Bridging individual care with community health systems.",
        noteTitle: "REQUIREMENT",
        note: "RN + 1 year experience.",
      },
      {
        title: "Community Health",
        slug: "community-health",
        duration: "2 Years",
        description: "Focused on grassroots healthcare delivery.",
        noteTitle: "ADMISSION",
        note: "SSCE with science credits.",
      },
      {
        title: "Perioperative Nursing",
        slug: "perioperative-nursing",
        duration: "12 Months",
        description: "Advanced surgical and theatre management training.",
        noteTitle: "RESTRICTION",
        note: "Registered Nurses only.",
      },
    ],
    clinicalTraining: {
      eyebrow: "Hands-on Experience",
      title: "Clinical Training & Partnerships",
      description:
        "Theory meets practice in real-world medical environments. Our students rotate through leading medical institutions, ensuring they graduate with the confidence and competence required by modern healthcare standards.",
      partners: [
        {name: "Kogi State Specialist Hospital", icon: "Cross"},
        {name: "Federal Medical Centre, Lokoja", icon: "BriefcaseMedical"},
        {name: "ECWA Hospital, Egbe", icon: "Asterisk"},
      ],
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo7gV_YaNOZSWrjbfu13GVVSnJ1oPHDoMQjILBwoLNlclgwR5Ozd7rKOQU8XyGuxJ3JTh3bLbeWKmS_XiS_rqyyIIZ_te9xKOqVw3hSs_kAkevDMjT0_I_m2_udfcFW9h9Zsfv9P0kVJnp1Ds4kW1cLfcG3Q_kEr-D4HvrD5f4N4BsHVlnLdQTwV3SiUjTtY2QYmLHk4ZPvK6BF1vkFAkDXzCGvvqcfzzQjDvY6c4I_mgVZITzzNNXL-xUVycOPhrIJYyi-dipMa8",
        alt: "Modern medical simulation lab with nursing students practicing clinical techniques",
      },
      quote:
        "Healing through Knowledge and Faith is not just our motto, it's our clinical standard.",
    },
    cta: {
      title: "Ready to Begin Your Journey?",
      description:
        "Join a community of scholars dedicated to excellence in nursing. Applications are currently open for the 2024/2025 academic session.",
      primary: {label: "Apply Now", href: "/admission"},
      secondary: {label: "Download Brochure", href: "#"},
    },
  },
};

export const admissionSeed: PageContent<AdmissionPageContent> = {
  slug: "admission",
  title: "Admissions",
  content: {
    hero: {
      badge: "Admissions Open 2024/2025",
      titleLines: ["Shape the Future", "of"],
      highlight: "Healing",
      description:
        "Join a community where academic excellence meets spiritual compassion. Our nursing programs are designed to equip you with clinical precision and a heart for service.",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTgEnwDOXAfEypps_Z-rszRRzlraGpTjBPw1_ICQ05FTEXh-u9T4z2Qa2vfdw3Uqne58LezX0tZa-yQCSTi0r2eno0L4t31ecv7kuasprtQBTgWYjBgIK3NLLjn_dNw5PazXcs21kjHUziAe7aMAWXNjvzeKUz5c3NzG1WQyIz_imyYQu-qHpcLQbKJaUc-jX24yYb_AVLAPuIlYozYJPJk-OclRjh0a_-7PxrR0YvOURm-66F6dypEYKB6EuzgVzZpTPxIY23-Gg",
        alt: "Modern nursing students practicing in a medical simulation lab",
      },
      quote: "Healing through Knowledge and Faith.",
    },
    journey: {
      title: "The Admission Journey",
      description:
        "A transparent four-step process from applicant to nursing scholar.",
      steps: [
        {
          number: "01",
          icon: "FilePen",
          title: "Application",
          description:
            "Submit your credentials and personal details through our online portal.",
        },
        {
          number: "02",
          icon: "BookText",
          title: "Entrance Exam",
          description:
            "CBT-based assessment covering Science, English, and General Knowledge.",
        },
        {
          number: "03",
          icon: "Users",
          title: "Oral Interview",
          description:
            "A personal meeting with the faculty board to discuss your passion and ethics.",
        },
        {
          number: "04",
          icon: "GraduationCap",
          title: "Admission",
          description:
            "Final verification of documents and issuance of the admission letter.",
        },
      ],
    },
    requirements: {
      title: "General Requirements",
      cardTitle: "Academic Qualifications",
      cardDescription:
        "Candidates must possess at least five (5) O'Level credits in the following subjects:",
      subjects: [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
      ],
      footnote: "WAEC / NECO / NABTEB accepted (Max 2 sittings)",
      ageLimit: {
        title: "Age Limit",
        intro: "Applicants must be between",
        range: "17 - 35",
        outro: "years of age at the time of application.",
      },
    },
    applicationForm: {
      title: "Apply Now",
      description:
        "Please ensure all information provided matches your official academic documents.",
      programmeOptions: [
        "General Nursing (3 Years)",
        "Basic Midwifery (3 Years)",
        "Post-Basic Nursing (18 Months)",
      ],
      checkboxLabel:
        "I certify that the information provided is accurate and I agree to the admission terms.",
      submitLabel: "Submit Application",
    },
    faq: {
      title: "Common Questions",
      items: [
        {
          question: "Is the college accredited?",
          answer:
            "Yes, CNS Ekinrin-Adde is fully accredited by the Nursing and Midwifery Council of Nigeria (NMCN).",
        },
        {
          question: "What is the cut-off mark?",
          answer:
            "Our entrance exam cut-off varies yearly, but candidates are generally expected to score above 60% to be considered for an interview.",
        },
        {
          question: "Can I combine O'Level results?",
          answer:
            "Yes, we accept a maximum combination of two sittings from WAEC, NECO, or NABTEB.",
        },
        {
          question: "Is there a hostel facility?",
          answer:
            "Yes, the college provides modern, secure, and conducive on-campus accommodation for all nursing students.",
        },
      ],
      contactCard: {
        title: "Need More Help?",
        phone: "+234 7038 301 203",
        note: "Speak with our admissions team for clarifications on requirements and deadlines.",
      },
    },
    footer: {
      resourcesTitle: "Resources",
      resources: ["Privacy Policy", "Accreditation", "Contact Us", "Alumni"],
    },
  },
};

export const facilitiesSeed: PageContent<FacilitiesPageContent> = {
  slug: "facilities",
  title: "Facilities",
  content: {
    hero: {
      eyebrow: "Excellence in Practice",
      titleLines: ["Clinical Training", "& Facilities"],
      description:
        "Bridging the gap between academic theory and clinical mastery through world-class simulations and elite hospital partnerships.",
      image: {src: "/lab.png", alt: "Students in the nursing simulation lab"},
    },
    partnerships: {
      title: "Elite Clinical Partnerships",
      description:
        "Our students gain hands-on experience at premier healthcare institutions across the region, ensuring exposure to diverse patient demographics and specialized medical conditions.",
      items: [
        {
          icon: "SquarePlus",
          title: "Kogi State Specialist Hospital",
          description:
            "Primary clinical rotation site offering exposure to advanced surgery and intensive care units.",
        },
        {
          icon: "ClipboardPlus",
          title: "Federal Medical Centre",
          description:
            "Comprehensive training in internal medicine, pediatrics, and specialized diagnostic services.",
        },
        {
          icon: "Baby",
          title: "Maternal & Child Center",
          description:
            "Specialized rotations in midwifery, neonatal care, and community health outreach.",
        },
        {
          icon: "Sprout",
          title: "Regional Wellness Institute",
          description:
            "Dedicated placements for psychiatric nursing and holistic mental health practice.",
        },
      ],
    },
    campusFacilities: {
      title: "World-Class Campus Facilities",
      description:
        "Providing an environment that fosters intellectual growth and practical expertise.",
      featured: {
        tag: "Medical Excellence",
        title: "High-Fidelity Simulation Lab",
        slug: "high-fidelity-simulation-lab",
        description:
          "Equipped with state-of-the-art mannequins that respond physiologically to student interventions, creating a safe yet realistic environment for high-stakes clinical training.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAxWT78yTsQm2Gy9qnF_nSyxkMxww0vl32ikFtWmq1gzhK_SjnJa487rxn0DDqFn-rUrtppKb3o_lqbAeJYvMTfcDgD1aR_E4SyUmA2FwgmrD1cCNv6Hx2FWWakUBBXGzGsFZTIOlG3oTdvGDZMoZ-U9HF5dBBlsp24RF54NwpYdnVNonMgsoPaMpZu2cBD2Wekppiy5_-p3fQk60nGbwO2A_KypZ8OcCZO2wJKH6VjJV89-pmEAo4W_BK8TcAAevlp08Apn9t2aYY",
        chips: [
          "Vital Signs Monitoring",
          "Surgical Scenarios",
          "Emergency Response",
        ],
      },
      items: [
        {
          title: "E-Resource Library",
          slug: "e-resource-library",
          description:
            "Access to thousands of medical journals, e-books, and global databases including PubMed and Cochrane Library.",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB43Zr1g5QuqlWSbb8203ygydQXoxNG_w706wRgzabGVCnZxD9Gxk_JiX5ZmBZmnBBfYkbxHF6YhzK661TW4EZJxT26ODQSncbUN8ViUQ529-nfTSIVaJACUoGMUVgBAWUdwT-g0-8jh5r0KfKpFtZBr9C-Z_oLvFTpWhx1nRuYRMu9meHKZIx4lHsehVIMZ2I32uNfyQtdCk9I6WAEfwDBDXZ0SG_vluaYITYk-WsTkyfVPakOO35_cH4Gt1ejiTej0899hYVgNsQ",
          linkText: "Browse Collection",
        },
        {
          title: "Smart Auditoriums",
          slug: "smart-auditoriums",
          description:
            "Interactive lecture halls featuring immersive AV systems and ergonomic seating designed for intensive academic engagement.",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBv40t5mzElO7GiL_i_Fh1eFPyls208FD1M1_O704v2QGaVAQoUcXgyNz_dh3vaGDSbaw4aBxccTifX0n_rmiGRmllQ9Kk4HopnMwlTUKL5mgY9iDlFSZOUh2FrtCQmPzH56sMSqdb8d5lb6szapyJoDySibedu_VbPl-20IqElMWeqf_UMwVR7V0iY3TbiOR6XwyNKamcMu4o98k8VQiCU_RefNwVGI8EtlUBE9rtEBJwAAfdoFY3Qw7t4jVZqiVTswPGjn4ZeQ2s",
        },
      ],
      clinic: {
        title: "On-Campus Clinic",
        slug: "on-campus-clinic",
        description:
          "A fully functional clinic where students shadow senior nurses and assist in primary healthcare delivery for the local community.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBao7Yq_S6gAzhvAutJblhfSEy43SE92cN4GnsienpoJdTu9NbuW2acFubI52H-kK6O9a8axknaAD_lymmE-7Si6GKYJdeV-xHOPMA6MRPGDvmwZ-rsIMukFv9U2VSqY0jwqRs_Hk9yZjne7IxhUgTAokxicFWKR3n529c9PkAu_tfIfycSpN1zc9kmAIC4tFxsRSr1QYzX6WKXX7dDppmPIsk1Q560r_KfrmK5Ncz_O0kiTO37o3kNfa1okRG75UEAa8UyvegB3s4",
        benefits: ["24/7 Access", "Pro-Bono Care"],
      },
    },
    healingMinistry: {
      title: "The Healing Ministry",
      description:
        "Our facilities aren't just about technical precision. We incorporate quiet reflection spaces and spiritual counseling centers, recognizing that true nursing science is the intersection of clinical skill and compassionate spirit.",
      pillars: [
        {icon: "Heart", label: "Compassionate Care"},
        {icon: "GraduationCap", label: "Reflection Spaces"},
        {icon: "Sparkles", label: "Spiritual Growth"},
      ],
    },
  },
};

export const contactsSeed: PageContent<ContactPageContent> = {
  slug: "contacts",
  title: "Contacts",
  content: {
    hero: {
      eyebrow: "Connect with our institution",
      titleLines: ["Get in Touch", "With Excellence."],
      description:
        "Whether you are a prospective student, a visiting professional, or a member of the community, our team is here to provide clinical precision and compassionate support.",
    },
    infoCard: {
      title: "Clinical Inquiry",
      items: [
        {
          icon: "MapPin",
          title: "Main Campus",
          lines: ["Km 4, Kabba-Ilorin Road, Ekinrin-Adde, Kogi State, Nigeria"],
        },
        {
          icon: "Mail",
          title: "Email Us",
          lines: [
            "info@cns-ekinrinadde.edu.ng",
            "admissions@cns-ekinrinadde.edu.ng",
          ],
        },
        {
          icon: "Phone",
          title: "Direct Line",
          lines: ["+234 (0) 803 123 4567", "+234 (0) 701 987 6543"],
        },
      ],
    },
    officeHours: {
      title: "Office Hours",
      items: [
        {label: "Monday - Friday", value: "8:00 AM - 4:00 PM"},
        {label: "Clinical Rotations", value: "24 Hours / 7 Days"},
        {
          label: "Weekend Inquiries",
          value: "Closed",
          valueClassName: "text-secondary",
        },
      ],
    },
    form: {
      title: "Send a Message",
      description:
        "Please complete the form below and our administrative team will respond within 24-48 business hours.",
      inquiryOptions: [
        {label: "General Information", value: "general-information"},
        {label: "Admission Process", value: "admission-process"},
        {label: "Clinical Placement", value: "clinical-placement"},
        {label: "Facility Tour", value: "facility-tour"},
        {label: "Transcripts & Records", value: "transcripts-records"},
      ],
      submitLabel: "Submit Inquiry",
    },
    map: {
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsI3LJUFqFX-juVGR4DC-zqwSAruLqqnCzkggH8XovxI6Jg1rrAkm7xlBw89v-U1UGu_dMyi9lNg1F7FdUwpcBDfffmlfKANMi-LHWpuZbG0WzI7wfaqHVn4znPZc0xW0VhNZ5Rogu5E8lM6Ug6vA92qEXVIaHriYeNIqhaQU-PoLk6hqn9t9l-RkEaXg8iTA8Ppfzq9yetnJg6oZ3Y8k7mCX_5G1gUS_SV-OZ8qJCQ8vBABzuyI9XQr23V2XJaYj_hqYBgHACgFI",
        alt: "Location Map",
      },
      title: "Visit Our Campus",
      description:
        "Discover the state-of-the-art clinical laboratories and modern learning environments in the heart of Ekinrin-Adde.",
      directionLabel: "Get Directions",
      directionHref: "#",
    },
  },
};

export const pageSeedMap = {
  home: landingSeed,
  about: aboutSeed,
  facstaff: facultySeed,
  gallery: gallerySeed,
  news: newsSeed,
  programmes: programmesSeed,
  admission: admissionSeed,
  facilities: facilitiesSeed,
  contacts: contactsSeed,
} as const;
