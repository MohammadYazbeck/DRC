import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultCmsContent, type CmsContent, type JobApplication } from "@/lib/cms";

const dataDir = path.join(process.cwd(), "data");
const cmsFile = path.join(dataDir, "cms-content.json");
const applicationsFile = path.join(dataDir, "job-applications.json");

function cloneDefaultContent(): CmsContent {
  return JSON.parse(JSON.stringify(defaultCmsContent)) as CmsContent;
}

function ensureLocalized(value: unknown, fallback: { en: string; ar: string }) {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const candidate = value as Partial<{ en: unknown; ar: unknown }>;
  return {
    en: typeof candidate.en === "string" ? candidate.en : fallback.en,
    ar: typeof candidate.ar === "string" ? candidate.ar : fallback.ar
  };
}

export function normalizeCmsContent(input: unknown): CmsContent {
  const fallback = cloneDefaultContent();
  if (!input || typeof input !== "object") {
    return fallback;
  }

  const data = input as Partial<CmsContent>;

  return {
    hero: {
      title: ensureLocalized(data.hero?.title, fallback.hero.title),
      subtitle: ensureLocalized(data.hero?.subtitle, fallback.hero.subtitle)
    },
    heroSlides: Array.isArray(data.heroSlides) && data.heroSlides.length ? data.heroSlides : fallback.heroSlides,
    about: {
      eyebrow: ensureLocalized(data.about?.eyebrow, fallback.about.eyebrow),
      title: ensureLocalized(data.about?.title, fallback.about.title),
      description: ensureLocalized(data.about?.description, fallback.about.description),
      metrics: Array.isArray(data.about?.metrics) ? data.about.metrics : fallback.about.metrics
    },
    products: Array.isArray(data.products) ? data.products : fallback.products,
    blogs: Array.isArray(data.blogs) ? data.blogs : fallback.blogs,
    news: Array.isArray(data.news) ? data.news : fallback.news,
    jobs: Array.isArray(data.jobs) ? data.jobs : fallback.jobs
  };
}

export async function getCmsContent(): Promise<CmsContent> {
  try {
    const raw = await readFile(cmsFile, "utf8");
    return normalizeCmsContent(JSON.parse(raw));
  } catch {
    return cloneDefaultContent();
  }
}

export async function saveCmsContent(content: CmsContent) {
  const normalized = normalizeCmsContent(content);
  await mkdir(dataDir, { recursive: true });
  await writeFile(cmsFile, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  return normalized;
}

export async function getJobApplications(): Promise<JobApplication[]> {
  try {
    const raw = await readFile(applicationsFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveJobApplication(application: JobApplication) {
  await mkdir(dataDir, { recursive: true });
  const applications = await getJobApplications();
  const next = [application, ...applications];
  await writeFile(applicationsFile, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  return application;
}
