export type NavItem = {
  label: string;
  href: string;
  order: number;
  isVisible?: boolean;
};

export type FooterLinkGroup = {
  title: string;
  links: {label: string; href: string}[];
};

export type FooterContent = {
  brandName: string;
  tagline: string;
  addressLines: string[];
  phone: string;
  email: string;
  bottomText: string;
  quickLinks: FooterLinkGroup[];
};

export type PageContent<T = Record<string, unknown>> = {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  content: T;
};

export type LandingProgrammePreview = {
  header: {title: string; description: string; viewAllLabel: string; viewAllHref: string};
  cards: Array<{
    title: string;
    slug?: string;
    href?: string;
    category: string;
    duration: string;
    description: string;
    image: {src: string; alt: string};
    icon?: string;
    ctaLabel: string;
  }>;
};

export type LandingPageContent = {
  hero: {
    badge: string;
    titleLines: string[];
    highlightLine: string;
    description: string;
    primaryCta: {label: string; href: string};
    secondaryCta: {label: string; href: string};
    image: {src: string; alt: string};
    floatingCard: {title: string; description: string};
  };
  missionVision: {
    mission: {title: string; body: string};
    vision: {title: string; body: string};
  };
  whyChoose?: unknown;
  programmes?: LandingProgrammePreview;
  chronicles: {
    title: string;
    items: Array<{
      category: string;
      title: string;
      slug?: string;
      desc: string;
      body?: string[];
      image: string;
      alt?: string;
      href?: string;
    }>;
  };
};

export type SimpleHero = {
  eyebrow: string;
  title: string;
  description: string;
  image?: {src: string; alt: string};
};

export type AboutPageContent = {
  hero: SimpleHero;
  missionVision: {
    mission: {title: string; body: string};
    vision: {title: string; body: string};
    story: {
      title: string;
      ctaLabel: string;
      intro: string;
      paragraphs: string[];
      images: {src: string; alt: string}[];
    };
  };
  faith: {
    title: string;
    description: string;
    pillars: {title: string; body: string}[];
  };
  leadership: {
    name: string;
    role: string;
    title: string;
    paragraphs: string[];
    portrait: {src: string; alt: string};
    signature: {src: string; alt: string};
  };
};

export type FacultyPageContent = {
  header: {eyebrow: string; title: string; description: string};
  categories: string[];
  staff: Array<{
    id: number;
    name: string;
    role: string;
    category: string;
    email: string;
    description: string;
    image: string;
    alt: string;
    featured?: boolean;
    published?: boolean;
  }>;
  cta?: {title: string; description: string; buttonLabel: string; href: string};
};

export type GalleryPageContent = {
  hero: {eyebrow: string; title: string; description: string};
  filters: string[];
  items: Array<{
    id: number;
    title: string;
    category: string;
    image: string;
    alt: string;
    icon: string;
    className?: string;
    imageClassName?: string;
    featured?: boolean;
    hasAccent?: boolean;
    published?: boolean;
  }>;
  featuredLibrary: {
    title: string;
    category: string;
    description: string;
    image: string;
    alt: string;
    icon: string;
  };
  cta: {title: string; description: string; primaryLabel: string; secondaryLabel: string};
};

export type NewsPageContent = {
  hero: {eyebrow: string; title: string; description: string};
  categories: string[];
  featuredStory: {category: string; date: string; title: string; slug?: string; description: string; body?: string[]; image: string; alt?: string; href?: string};
  retreatCard: {title: string; description: string};
  keyDates: Array<{month: string; day: string; title: string; location: string}>;
  updates: Array<{id: number; category: string; date: string; title: string; slug?: string; excerpt: string; body?: string[]; image: string; alt?: string; accent: string; href?: string; published?: boolean}>;
};

export type ProgrammesPageContent = {
  hero: {titleLines: string[]; description: string};
  featuredProgramme: {
    eyebrow: string;
    titleLines: string[];
    description: string;
    duration: string;
    requirementsTitle: string;
    requirements: string[];
    slug?: string;
    body?: string[];
  };
  programmes: Array<{
    title: string;
    slug?: string;
    href?: string;
    duration: string;
    description: string;
    body?: string[];
    noteTitle: string;
    note: string;
    image?: string;
    alt?: string;
    published?: boolean;
  }>;
  clinicalTraining: {
    eyebrow: string;
    title: string;
    description: string;
    partners: Array<{name: string; icon: string}>;
    image: {src: string; alt: string};
    quote: string;
  };
  cta: {
    title: string;
    description: string;
    primary: {label: string; href: string};
    secondary: {label: string; href: string};
  };
};

export type AdmissionPageContent = {
  hero: {
    badge: string;
    titleLines: string[];
    highlight: string;
    description: string;
    image: {src: string; alt: string};
    quote: string;
  };
  journey: {
    title: string;
    description: string;
    steps: Array<{number: string; icon: string; title: string; description: string; published?: boolean}>;
  };
  requirements: {
    title: string;
    cardTitle: string;
    cardDescription: string;
    subjects: string[];
    footnote: string;
    ageLimit: {title: string; intro: string; range: string; outro: string};
  };
  applicationForm: {
    title: string;
    description: string;
    programmeOptions: string[];
    checkboxLabel: string;
    submitLabel: string;
  };
  faq: {
    title: string;
    items: Array<{question: string; answer: string}>;
    contactCard: {title: string; phone: string; note: string};
  };
  footer?: {resourcesTitle: string; resources: string[]};
};

export type FacilitiesPageContent = {
  hero: {
    eyebrow: string;
    titleLines: string[];
    description: string;
    image: {src: string; alt: string};
  };
  partnerships: {
    title: string;
    description: string;
    items: Array<{icon: string; title: string; description: string}>;
  };
  campusFacilities: {
    title: string;
    description: string;
    featured: {
      tag?: string;
      title: string;
      description: string;
      image: string;
      alt?: string;
      slug?: string;
      body?: string[];
      chips: string[];
    };
    items: Array<{title: string; slug?: string; href?: string; description: string; body?: string[]; image: string; alt?: string; linkText?: string}>;
    clinic: {
      title: string;
      slug?: string;
      description: string;
      body?: string[];
      image: string;
      alt?: string;
      benefits: string[];
    };
  };
  healingMinistry: {
    title: string;
    description: string;
    pillars: Array<{icon: string; label: string}>;
  };
};

export type ContactPageContent = {
  hero: {eyebrow: string; titleLines: string[]; description: string};
  infoCard: {title: string; items: Array<{icon: string; title: string; lines: string[]}>};
  officeHours: {title: string; items: Array<{label: string; value: string; valueClassName?: string}>};
  form: {
    title: string;
    description: string;
    inquiryOptions: Array<{label: string; value: string}>;
    submitLabel: string;
  };
  map: {
    image: {src: string; alt: string};
    title: string;
    description: string;
    directionLabel: string;
    directionHref: string;
  };
};
