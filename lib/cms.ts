import {
  about,
  blogs,
  hero,
  heroSlides,
  news,
  products,
  type InsightItem,
  type LocalizedString,
  type Product
} from "@/lib/content";

export type JobOpening = {
  id: string;
  title: LocalizedString;
  department: LocalizedString;
  location: LocalizedString;
  type: LocalizedString;
  summary: LocalizedString;
  requirements: LocalizedString[];
  active: boolean;
  createdAt: string;
};

export type JobApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  resumeUrl?: string;
  createdAt: string;
};

export type CmsContent = {
  hero: typeof hero;
  heroSlides: typeof heroSlides;
  about: typeof about;
  products: Product[];
  blogs: InsightItem[];
  news: InsightItem[];
  jobs: JobOpening[];
};

export const defaultJobs: JobOpening[] = [
  {
    id: "production-quality-specialist",
    title: { en: "Production Quality Specialist", ar: "اختصاصي جودة إنتاج" },
    department: { en: "Quality", ar: "الجودة" },
    location: { en: "Syria", ar: "سوريا" },
    type: { en: "Full time", ar: "دوام كامل" },
    summary: {
      en: "Support product quality checks, hygiene standards, and documentation across DRC production lines.",
      ar: "دعم فحوصات جودة المنتج ومعايير النظافة والتوثيق ضمن خطوط إنتاج DRC."
    },
    requirements: [
      { en: "Experience in quality control or manufacturing environments.", ar: "خبرة في ضبط الجودة أو بيئات التصنيع." },
      { en: "Strong attention to detail and documentation.", ar: "اهتمام عال بالتفاصيل والتوثيق." }
    ],
    active: true,
    createdAt: "2026-08-10T00:00:00.000Z"
  }
];

export const defaultCmsContent: CmsContent = {
  hero,
  heroSlides,
  about,
  products: products.filter((product) => !product.hidden),
  blogs: blogs as InsightItem[],
  news: news as InsightItem[],
  jobs: defaultJobs
};

export function getVisibleProducts(content: Pick<CmsContent, "products">) {
  return content.products.filter((product) => !product.hidden);
}

export function getProductBySlug(content: Pick<CmsContent, "products">, slug: string) {
  return getVisibleProducts(content).find((product) => product.slug === slug || product.aliases?.includes(slug));
}

export function getBrandLogosFromProducts(content: Pick<CmsContent, "products">) {
  return getVisibleProducts(content)
    .filter((product) => product.logo)
    .map((product) => ({
      name: product.title.en,
      src: product.logo
    }));
}
