"use client";

import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import {
  BriefcaseBusiness,
  Check,
  FileText,
  ImageIcon,
  Newspaper,
  Plus,
  Save,
  Trash2,
  Upload,
  Users
} from "lucide-react";
import type { CmsContent, JobApplication, JobOpening } from "@/lib/cms";
import type { InsightItem, Locale, LocalizedString, Product, ProductFaq, ProductSize } from "@/lib/content";
import { imagePresets, type ImagePresetKey } from "@/lib/image-presets";
import { cn } from "@/lib/utils";

type Tab = "products" | "hero" | "news" | "blogs" | "jobs" | "about" | "applications";

const tabs: Array<{ id: Tab; label: string; icon: typeof FileText }> = [
  { id: "products", label: "Products", icon: FileText },
  { id: "hero", label: "Hero", icon: ImageIcon },
  { id: "news", label: "News", icon: Newspaper },
  { id: "blogs", label: "Blogs", icon: FileText },
  { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
  { id: "about", label: "About", icon: Users },
  { id: "applications", label: "Applications", icon: Check }
];

const blankLocalized: LocalizedString = { en: "", ar: "" };

function cloneLocalized(value?: LocalizedString): LocalizedString {
  return value ? { en: value.en ?? "", ar: value.ar ?? "" } : { ...blankLocalized };
}

function updateAt<T>(items: T[], index: number, updater: (item: T) => T) {
  return items.map((item, itemIndex) => (itemIndex === index ? updater(item) : item));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `item-${Date.now()}`;
}

function extensionForOutput(type: "image/png" | "image/jpeg") {
  return type === "image/png" ? ".png" : ".jpg";
}

async function standardizeImageFile(file: File, presetKey?: ImagePresetKey) {
  if (!presetKey || !file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file;
  }

  const preset = imagePresets[presetKey];
  const image = new Image();
  const objectUrl = URL.createObjectURL(file);

  try {
    image.src = objectUrl;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = preset.width;
    canvas.height = preset.height;

    const context = canvas.getContext("2d");
    if (!context) {
      return file;
    }

    if (preset.background === "white") {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, preset.width, preset.height);
    }

    const scale =
      preset.mode === "cover"
        ? Math.max(preset.width / image.naturalWidth, preset.height / image.naturalHeight)
        : Math.min(preset.width / image.naturalWidth, preset.height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const drawX = (preset.width - drawWidth) / 2;
    const drawY = (preset.height - drawHeight) / 2;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, drawX, drawY, drawWidth, drawHeight);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, preset.output, 0.92);
    });

    if (!blob) {
      return file;
    }

    const fileName = `${file.name.replace(/\.[^.]+$/, "")}-${preset.width}x${preset.height}${extensionForOutput(preset.output)}`;
    return new File([blob], fileName, { type: preset.output });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function newProduct(): Product {
  const fallbackImage = "/images/brands/drc-logo-transparent-cropped.png";

  return {
    slug: `product-${Date.now()}`,
    title: { en: "New Product", ar: "منتج جديد" },
    category: { en: "Product Category", ar: "فئة المنتج" },
    image: fallbackImage,
    cardImage: fallbackImage,
    bannerImage: "",
    logo: fallbackImage,
    excerpt: { en: "Short product summary.", ar: "ملخص قصير عن المنتج." },
    description: { en: "Detailed product description.", ar: "وصف تفصيلي للمنتج." },
    featured: false,
    sizes: [],
    faqs: []
  };
}

function newSize(): ProductSize {
  return {
    label: { en: "S", ar: "S" },
    value: { en: "Small", ar: "صغير" },
    note: { en: "Small", ar: "صغير" },
    description: { en: "Describe this option.", ar: "صف هذا الخيار." },
    image: ""
  };
}

function newFaq(): ProductFaq {
  return {
    question: { en: "Question?", ar: "السؤال؟" },
    answer: { en: "Answer.", ar: "الإجابة." }
  };
}

function newInsight(type: "news" | "blogs"): InsightItem {
  return {
    slug: `${type}-${Date.now()}`,
    image: "/people/Hero/Hero-3.png",
    href: "",
    source: { en: "DRC Group", ar: "DRC Group" },
    category: { en: type === "news" ? "Company News" : "Care Guide", ar: type === "news" ? "أخبار الشركة" : "دليل العناية" },
    date: { en: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), ar: new Date().toISOString().slice(0, 10) },
    title: { en: type === "news" ? "New company update" : "New blog article", ar: type === "news" ? "تحديث جديد من الشركة" : "مقال جديد" },
    description: { en: "Write a short preview.", ar: "اكتب ملخصا قصيرا." }
  };
}

function newJob(): JobOpening {
  return {
    id: `job-${Date.now()}`,
    title: { en: "New Job Opening", ar: "وظيفة جديدة" },
    department: { en: "Department", ar: "القسم" },
    location: { en: "Location", ar: "الموقع" },
    type: { en: "Full time", ar: "دوام كامل" },
    summary: { en: "Describe the role.", ar: "صف الوظيفة." },
    requirements: [{ en: "Add a requirement.", ar: "أضف متطلبا." }],
    active: true,
    createdAt: new Date().toISOString()
  };
}

export function AdminDashboard({ initialContent }: { initialContent: CmsContent }) {
  const [content, setContent] = useState<CmsContent>(initialContent);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  async function saveContent() {
    setSaving(true);
    setStatus("");

    try {
      const response = await fetch("/api/cms", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error ?? "Unable to save content.");
      }

      const saved = await response.json() as CmsContent;
      setContent(saved);
      setStatus("Saved. Public pages will read this content on refresh.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save content.");
    } finally {
      setSaving(false);
    }
  }

  async function loadApplications() {
    setStatus("");

    try {
      const response = await fetch("/api/applications", {
        headers: { "x-admin-password": password }
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error ?? "Unable to load applications.");
      }

      setApplications(await response.json() as JobApplication[]);
      setStatus("Applications loaded.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to load applications.");
    }
  }

  return (
    <main className="min-h-screen bg-mist text-ink">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <header className="rounded-[28px] bg-primary p-5 text-white sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase text-white/70">DRC Group</p>
              <h1 className="mt-2 text-3xl font-bold sm:text-5xl">Control Panel</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/78 sm:text-base">
                Manage public website content, product assets, hero images, blogs, news, careers, and applications.
              </p>
            </div>
            <div className="grid gap-2 sm:min-w-[320px]">
              <label className="text-sm font-bold text-white/80">Admin password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Set ADMIN_PASSWORD in production"
                className="h-12 rounded-[18px] border border-white/20 bg-white/10 px-4 text-base font-semibold text-white outline-none placeholder:text-white/45 focus:border-white"
              />
            </div>
          </div>
        </header>

        <div className="sticky top-0 z-20 -mx-4 bg-mist/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex flex-col gap-3 rounded-[24px] border border-primary/10 bg-white p-2 shadow-[0_16px_45px_rgba(16,32,51,0.08)] lg:flex-row lg:items-center lg:justify-between">
            <nav className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "inline-flex h-11 shrink-0 items-center gap-2 rounded-[18px] px-4 text-sm font-bold transition",
                      activeTab === tab.id ? "bg-primary text-white" : "text-ink/65 hover:bg-mist"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {status && <p className="text-sm font-bold text-primary">{status}</p>}
              <button
                type="button"
                onClick={saveContent}
                disabled={saving}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[18px] bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-60"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        {activeTab === "products" && <ProductsEditor content={content} setContent={setContent} password={password} />}
        {activeTab === "hero" && <HeroEditor content={content} setContent={setContent} password={password} />}
        {activeTab === "news" && <InsightsEditor type="news" content={content} setContent={setContent} password={password} />}
        {activeTab === "blogs" && <InsightsEditor type="blogs" content={content} setContent={setContent} password={password} />}
        {activeTab === "jobs" && <JobsEditor content={content} setContent={setContent} />}
        {activeTab === "about" && <AboutEditor content={content} setContent={setContent} />}
        {activeTab === "applications" && (
          <ApplicationsPanel applications={applications} password={password} onLoad={loadApplications} />
        )}
      </div>
    </main>
  );
}

function ProductsEditor({
  content,
  setContent,
  password
}: {
  content: CmsContent;
  setContent: Dispatch<SetStateAction<CmsContent>>;
  password: string;
}) {
  const [selectedProductSlug, setSelectedProductSlug] = useState(content.products[0]?.slug ?? "");
  const selectedIndex = content.products.findIndex((product) => product.slug === selectedProductSlug);
  const fallbackIndex = content.products.length ? 0 : -1;
  const activeIndex = selectedIndex >= 0 ? selectedIndex : fallbackIndex;
  const product = activeIndex >= 0 ? content.products[activeIndex] : undefined;

  function updateProduct(index: number, updater: (product: Product) => Product) {
    setContent((current) => ({
      ...current,
      products: updateAt(current.products, index, updater)
    }));
  }

  function addProduct() {
    const productToAdd = newProduct();
    setContent((current) => ({ ...current, products: [...current.products, productToAdd] }));
    setSelectedProductSlug(productToAdd.slug);
  }

  function deleteProduct(index: number) {
    const nextProducts = content.products.filter((_, itemIndex) => itemIndex !== index);
    const nextSelection = nextProducts[Math.min(index, nextProducts.length - 1)]?.slug ?? "";
    setContent((current) => ({
      ...current,
      products: current.products.filter((_, itemIndex) => itemIndex !== index)
    }));
    setSelectedProductSlug(nextSelection);
  }

  function updateSelectedProduct(updater: (product: Product) => Product) {
    if (activeIndex < 0) {
      return;
    }

    updateProduct(activeIndex, updater);
  }

  return (
    <section className="grid gap-4">
      <ToolbarTitle
        title="Products"
        description="Select one product, then control its logo, name, descriptions, card image, banner, available options, and FAQ."
        actionLabel="Add Product"
        onAction={addProduct}
      />

      {!product ? (
        <Panel title="No Products">
          <p className="text-sm font-semibold text-ink/60">Add a product to start editing the product catalog.</p>
        </Panel>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-[28px] border border-primary/10 bg-white p-3 shadow-[0_16px_45px_rgba(16,32,51,0.06)] lg:sticky lg:top-28">
            <label className="grid gap-2 text-sm font-bold text-ink/70 lg:hidden">
              Select product
              <select
                value={product.slug}
                onChange={(event) => setSelectedProductSlug(event.target.value)}
                className="h-12 rounded-[18px] border border-primary/10 bg-mist px-4 text-base font-bold text-ink outline-none focus:border-primary"
              >
                {content.products.map((item) => (
                  <option key={item.slug} value={item.slug}>{item.title.en || item.slug}</option>
                ))}
              </select>
            </label>

            <div className="hidden gap-2 lg:grid">
              <p className="px-2 pb-2 text-xs font-bold uppercase text-ink/45">Select product</p>
              {content.products.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelectedProductSlug(item.slug)}
                  className={cn(
                    "flex items-center gap-3 rounded-[20px] p-3 text-left transition",
                    item.slug === product.slug ? "bg-primary text-white" : "hover:bg-mist"
                  )}
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[16px] bg-white">
                    <img src={item.logo || item.cardImage || item.image || "/images/brands/drc-logo-transparent-cropped.png"} alt="" className="h-full w-full object-contain p-1.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{item.title.en || item.slug}</span>
                    <span className={cn("block truncate text-xs font-semibold", item.slug === product.slug ? "text-white/70" : "text-ink/45")}>
                      {item.category.en || item.slug}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <Panel key={`${product.slug}-${activeIndex}`} title={product.title.en || "Product"} subtitle={`/products/${product.slug}`}>
          <div className="grid gap-4 lg:grid-cols-2">
            <TextField
              label="Slug"
              value={product.slug}
              onChange={(value) => {
                const nextSlug = slugify(value);
                setSelectedProductSlug(nextSlug);
                updateSelectedProduct((item) => ({ ...item, slug: nextSlug }));
              }}
            />
            <div className="flex items-end gap-3">
              <Toggle
                label="Featured on homepage"
                checked={Boolean(product.featured)}
                onChange={(checked) => updateSelectedProduct((item) => ({ ...item, featured: checked }))}
              />
              <button
                type="button"
                onClick={() => deleteProduct(activeIndex)}
                className="inline-flex h-11 items-center gap-2 rounded-[18px] border border-blush/30 px-4 text-sm font-bold text-blush hover:bg-petal"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete Product
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <LocalizedField label="Name" value={product.title} onChange={(value) => updateSelectedProduct((item) => ({ ...item, title: value }))} />
            <LocalizedField label="Category" value={product.category} onChange={(value) => updateSelectedProduct((item) => ({ ...item, category: value }))} />
            <LocalizedField label="Short Description" value={product.excerpt} multiline onChange={(value) => updateSelectedProduct((item) => ({ ...item, excerpt: value }))} />
            <LocalizedField label="Full Description" value={product.description} multiline onChange={(value) => updateSelectedProduct((item) => ({ ...item, description: value }))} />
            <LocalizedField label="Available Options Title" value={cloneLocalized(product.optionsTitle)} onChange={(value) => updateSelectedProduct((item) => ({ ...item, optionsTitle: value }))} />
            <LocalizedField label="Available Options Subtitle" value={cloneLocalized(product.optionsSubtitle)} multiline onChange={(value) => updateSelectedProduct((item) => ({ ...item, optionsSubtitle: value }))} />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <UploadField label="Logo" preset="logo" value={product.logo} password={password} onChange={(value) => updateSelectedProduct((item) => ({ ...item, logo: value }))} />
            <UploadField label="Card Image" preset="productCard" value={product.cardImage ?? product.image} password={password} onChange={(value) => updateSelectedProduct((item) => ({ ...item, cardImage: value, image: item.image || value }))} />
            <UploadField label="Banner" preset="productBanner" value={product.bannerImage ?? ""} password={password} onChange={(value) => updateSelectedProduct((item) => ({ ...item, bannerImage: value }))} />
          </div>

          <NestedHeader
            title="Available Options"
            onAdd={() => updateSelectedProduct((item) => ({ ...item, sizes: [...(item.sizes ?? []), newSize()] }))}
          />
          <div className="grid gap-3">
            {(product.sizes ?? []).map((size, sizeIndex) => (
              <OptionEditor
                key={`${size.label.en}-${sizeIndex}`}
                size={size}
                password={password}
                onDelete={() => updateSelectedProduct((item) => ({ ...item, sizes: (item.sizes ?? []).filter((_, itemIndex) => itemIndex !== sizeIndex) }))}
                onChange={(updater) => updateSelectedProduct((item) => ({ ...item, sizes: updateAt(item.sizes ?? [], sizeIndex, updater) }))}
              />
            ))}
          </div>

          <NestedHeader
            title="FAQ"
            onAdd={() => updateSelectedProduct((item) => ({ ...item, faqs: [...(item.faqs ?? []), newFaq()] }))}
          />
          <div className="grid gap-3">
            {(product.faqs ?? []).map((faq, faqIndex) => (
              <FaqEditor
                key={`${faq.question.en}-${faqIndex}`}
                faq={faq}
                onDelete={() => updateSelectedProduct((item) => ({ ...item, faqs: (item.faqs ?? []).filter((_, itemIndex) => itemIndex !== faqIndex) }))}
                onChange={(updater) => updateSelectedProduct((item) => ({ ...item, faqs: updateAt(item.faqs ?? [], faqIndex, updater) }))}
              />
            ))}
          </div>
          </Panel>
        </div>
      )}
    </section>
  );
}

function HeroEditor({
  content,
  setContent,
  password
}: {
  content: CmsContent;
  setContent: Dispatch<SetStateAction<CmsContent>>;
  password: string;
}) {
  return (
    <section className="grid gap-4">
      <ToolbarTitle title="Hero" description="Control hero heading, subtitle, and carousel images." />
      <Panel title="Hero Copy">
        <div className="grid gap-4 lg:grid-cols-2">
          <LocalizedField label="Main Title" value={content.hero.title} onChange={(title) => setContent((current) => ({ ...current, hero: { ...current.hero, title } }))} />
          <LocalizedField label="Subtitle" value={content.hero.subtitle} multiline onChange={(subtitle) => setContent((current) => ({ ...current, hero: { ...current.hero, subtitle } }))} />
        </div>
      </Panel>

      <Panel title="Slides">
        <NestedHeader
          title="Hero Slides"
          onAdd={() => setContent((current) => ({
            ...current,
            heroSlides: [
              ...current.heroSlides,
              {
                id: `slide-${Date.now()}`,
                image: { en: "", ar: "" },
                label: { en: "Slide", ar: "شريحة" },
                title: { en: "Slide title", ar: "عنوان الشريحة" }
              }
            ]
          }))}
        />
        <div className="grid gap-4">
          {content.heroSlides.map((slide, index) => (
            <div key={`${slide.id}-${index}`} className="rounded-[24px] border border-primary/10 bg-mist p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <TextField label="ID" value={slide.id} onChange={(id) => setContent((current) => ({ ...current, heroSlides: updateAt(current.heroSlides, index, (item) => ({ ...item, id: slugify(id) })) }))} />
                <UploadField label="English Image" preset="hero" value={slide.image.en} password={password} onChange={(en) => setContent((current) => ({ ...current, heroSlides: updateAt(current.heroSlides, index, (item) => ({ ...item, image: { ...item.image, en } })) }))} />
                <UploadField label="Arabic Image" preset="hero" value={slide.image.ar} password={password} onChange={(ar) => setContent((current) => ({ ...current, heroSlides: updateAt(current.heroSlides, index, (item) => ({ ...item, image: { ...item.image, ar } })) }))} />
                <LocalizedField label="Slide Label" value={slide.label} onChange={(label) => setContent((current) => ({ ...current, heroSlides: updateAt(current.heroSlides, index, (item) => ({ ...item, label })) }))} />
                <LocalizedField label="Slide Title" value={slide.title} onChange={(title) => setContent((current) => ({ ...current, heroSlides: updateAt(current.heroSlides, index, (item) => ({ ...item, title })) }))} />
              </div>
              <button
                type="button"
                onClick={() => setContent((current) => ({ ...current, heroSlides: current.heroSlides.filter((_, itemIndex) => itemIndex !== index) }))}
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-[18px] text-sm font-bold text-blush hover:bg-petal"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete Slide
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function InsightsEditor({
  type,
  content,
  setContent,
  password
}: {
  type: "news" | "blogs";
  content: CmsContent;
  setContent: Dispatch<SetStateAction<CmsContent>>;
  password: string;
}) {
  const items = content[type];

  function updateItem(index: number, updater: (item: InsightItem) => InsightItem) {
    setContent((current) => ({
      ...current,
      [type]: updateAt(current[type], index, updater)
    }));
  }

  return (
    <section className="grid gap-4">
      <ToolbarTitle
        title={type === "news" ? "News" : "Blogs"}
        description="Control cards shown on the homepage tab and the full listing pages."
        actionLabel={`Add ${type === "news" ? "News" : "Blog"}`}
        onAction={() => setContent((current) => ({ ...current, [type]: [...current[type], newInsight(type)] }))}
      />

      {items.map((item, index) => (
        <Panel key={`${item.slug}-${index}`} title={item.title.en || "Article"} subtitle={item.href}>
          <div className="grid gap-4 lg:grid-cols-2">
            <TextField label="Slug" value={item.slug} onChange={(slug) => updateItem(index, (current) => ({ ...current, slug: slugify(slug) }))} />
            <TextField label="External Link" value={item.href ?? ""} onChange={(href) => updateItem(index, (current) => ({ ...current, href }))} />
            <LocalizedField label="Source" value={cloneLocalized(item.source)} onChange={(source) => updateItem(index, (current) => ({ ...current, source }))} />
            <LocalizedField label="Category" value={item.category} onChange={(category) => updateItem(index, (current) => ({ ...current, category }))} />
            <LocalizedField label="Date" value={cloneLocalized(item.date)} onChange={(date) => updateItem(index, (current) => ({ ...current, date }))} />
            <UploadField label="Thumbnail" preset="insight" value={item.image} password={password} onChange={(image) => updateItem(index, (current) => ({ ...current, image }))} />
            <LocalizedField label="Title" value={item.title} onChange={(title) => updateItem(index, (current) => ({ ...current, title }))} />
            <LocalizedField label="Description" value={item.description} multiline onChange={(description) => updateItem(index, (current) => ({ ...current, description }))} />
          </div>
          <button
            type="button"
            onClick={() => setContent((current) => ({ ...current, [type]: current[type].filter((_, itemIndex) => itemIndex !== index) }))}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-[18px] text-sm font-bold text-blush hover:bg-petal"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </button>
        </Panel>
      ))}
    </section>
  );
}

function JobsEditor({
  content,
  setContent
}: {
  content: CmsContent;
  setContent: Dispatch<SetStateAction<CmsContent>>;
}) {
  function updateJob(index: number, updater: (job: JobOpening) => JobOpening) {
    setContent((current) => ({ ...current, jobs: updateAt(current.jobs, index, updater) }));
  }

  return (
    <section className="grid gap-4">
      <ToolbarTitle
        title="Jobs"
        description="Create and manage public career openings. Active jobs appear on the Careers page."
        actionLabel="Add Job"
        onAction={() => setContent((current) => ({ ...current, jobs: [...current.jobs, newJob()] }))}
      />

      {content.jobs.map((job, index) => (
        <Panel key={`${job.id}-${index}`} title={job.title.en || "Job"} subtitle={job.active ? "Active" : "Hidden"}>
          <div className="grid gap-4 lg:grid-cols-2">
            <TextField label="Job ID" value={job.id} onChange={(id) => updateJob(index, (current) => ({ ...current, id: slugify(id) }))} />
            <Toggle label="Active" checked={job.active} onChange={(active) => updateJob(index, (current) => ({ ...current, active }))} />
            <LocalizedField label="Title" value={job.title} onChange={(title) => updateJob(index, (current) => ({ ...current, title }))} />
            <LocalizedField label="Department" value={job.department} onChange={(department) => updateJob(index, (current) => ({ ...current, department }))} />
            <LocalizedField label="Location" value={job.location} onChange={(location) => updateJob(index, (current) => ({ ...current, location }))} />
            <LocalizedField label="Type" value={job.type} onChange={(jobType) => updateJob(index, (current) => ({ ...current, type: jobType }))} />
            <LocalizedField label="Summary" value={job.summary} multiline onChange={(summary) => updateJob(index, (current) => ({ ...current, summary }))} />
          </div>

          <NestedHeader title="Requirements" onAdd={() => updateJob(index, (current) => ({ ...current, requirements: [...current.requirements, { ...blankLocalized }] }))} />
          <div className="grid gap-3">
            {job.requirements.map((requirement, requirementIndex) => (
              <div key={`${requirement.en}-${requirementIndex}`} className="grid gap-3 rounded-[20px] border border-primary/10 bg-mist p-3 lg:grid-cols-[1fr_auto]">
                <LocalizedField
                  label={`Requirement ${requirementIndex + 1}`}
                  value={requirement}
                  onChange={(value) => updateJob(index, (current) => ({ ...current, requirements: updateAt(current.requirements, requirementIndex, () => value) }))}
                />
                <button
                  type="button"
                  onClick={() => updateJob(index, (current) => ({ ...current, requirements: current.requirements.filter((_, itemIndex) => itemIndex !== requirementIndex) }))}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[18px] text-sm font-bold text-blush hover:bg-petal lg:self-end"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setContent((current) => ({ ...current, jobs: current.jobs.filter((_, itemIndex) => itemIndex !== index) }))}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-[18px] text-sm font-bold text-blush hover:bg-petal"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete Job
          </button>
        </Panel>
      ))}
    </section>
  );
}

function AboutEditor({
  content,
  setContent
}: {
  content: CmsContent;
  setContent: Dispatch<SetStateAction<CmsContent>>;
}) {
  return (
    <section className="grid gap-4">
      <ToolbarTitle title="About" description="Control the About section and About page intro content." />
      <Panel title="About Copy">
        <div className="grid gap-4 lg:grid-cols-2">
          <LocalizedField label="Eyebrow" value={content.about.eyebrow} onChange={(eyebrow) => setContent((current) => ({ ...current, about: { ...current.about, eyebrow } }))} />
          <LocalizedField label="Title" value={content.about.title} onChange={(title) => setContent((current) => ({ ...current, about: { ...current.about, title } }))} />
          <LocalizedField label="Description" value={content.about.description} multiline onChange={(description) => setContent((current) => ({ ...current, about: { ...current.about, description } }))} />
        </div>

        <NestedHeader
          title="Metrics"
          onAdd={() => setContent((current) => ({
            ...current,
            about: {
              ...current.about,
              metrics: [...current.about.metrics, { value: "1+", label: { en: "New metric", ar: "مؤشر جديد" } }]
            }
          }))}
        />
        <div className="grid gap-3">
          {content.about.metrics.map((metric, index) => (
            <div key={`${metric.value}-${index}`} className="grid gap-3 rounded-[20px] border border-primary/10 bg-mist p-3 lg:grid-cols-[180px_1fr_auto]">
              <TextField label="Value" value={metric.value} onChange={(value) => setContent((current) => ({ ...current, about: { ...current.about, metrics: updateAt(current.about.metrics, index, (item) => ({ ...item, value })) } }))} />
              <LocalizedField label="Label" value={metric.label} onChange={(label) => setContent((current) => ({ ...current, about: { ...current.about, metrics: updateAt(current.about.metrics, index, (item) => ({ ...item, label })) } }))} />
              <button
                type="button"
                onClick={() => setContent((current) => ({ ...current, about: { ...current.about, metrics: current.about.metrics.filter((_, itemIndex) => itemIndex !== index) } }))}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[18px] text-sm font-bold text-blush hover:bg-petal lg:self-end"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function ApplicationsPanel({
  applications,
  password,
  onLoad
}: {
  applications: JobApplication[];
  password: string;
  onLoad: () => void;
}) {
  async function downloadResume(application: JobApplication) {
    if (!application.resumeUrl) {
      return;
    }

    const response = await fetch(application.resumeUrl, {
      headers: { "x-admin-password": password }
    });

    if (!response.ok) {
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${application.name || "resume"}-${application.id}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="grid gap-4">
      <ToolbarTitle
        title="Applications"
        description="Review career applications submitted from the public Careers page."
        actionLabel="Load Applications"
        onAction={onLoad}
      />
      <Panel title={`${applications.length} Applications`}>
        <div className="divide-y divide-primary/10">
          {applications.map((application) => (
            <article key={application.id} className="py-4">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-ink">{application.name}</h3>
                  <p className="mt-1 text-sm font-bold text-primary">{application.jobTitle}</p>
                  <p className="mt-2 text-sm text-ink/65">{application.email} / {application.phone}</p>
                </div>
                <p className="text-sm font-semibold text-ink/45">{new Date(application.createdAt).toLocaleString()}</p>
              </div>
              {application.message && <p className="mt-3 text-sm leading-7 text-ink/65">{application.message}</p>}
              {application.resumeUrl && (
                <button type="button" onClick={() => void downloadResume(application)} className="mt-3 inline-flex text-sm font-bold text-primary underline">
                  Download resume
                </button>
              )}
            </article>
          ))}
          {!applications.length && <p className="py-6 text-sm font-semibold text-ink/60">Enter the admin password and load applications.</p>}
        </div>
      </Panel>
    </section>
  );
}

function OptionEditor({
  size,
  password,
  onChange,
  onDelete
}: {
  size: ProductSize;
  password: string;
  onChange: (updater: (size: ProductSize) => ProductSize) => void;
  onDelete: () => void;
}) {
  return (
    <div className="grid gap-3 rounded-[20px] border border-primary/10 bg-mist p-3 lg:grid-cols-2">
      <LocalizedField label="Label" value={size.label} onChange={(label) => onChange((item) => ({ ...item, label }))} />
      <LocalizedField label="Value" value={size.value} onChange={(value) => onChange((item) => ({ ...item, value }))} />
      <LocalizedField label="Title / Note" value={cloneLocalized(size.note)} onChange={(note) => onChange((item) => ({ ...item, note }))} />
      <UploadField label="Option Image" preset="productOption" value={size.image ?? ""} password={password} onChange={(image) => onChange((item) => ({ ...item, image }))} />
      <div className="lg:col-span-2">
        <LocalizedField label="Description" value={cloneLocalized(size.description)} multiline onChange={(description) => onChange((item) => ({ ...item, description }))} />
      </div>
      <button type="button" onClick={onDelete} className="inline-flex h-10 items-center gap-2 rounded-[18px] text-sm font-bold text-blush hover:bg-petal">
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        Delete Option
      </button>
    </div>
  );
}

function FaqEditor({
  faq,
  onChange,
  onDelete
}: {
  faq: ProductFaq;
  onChange: (updater: (faq: ProductFaq) => ProductFaq) => void;
  onDelete: () => void;
}) {
  return (
    <div className="grid gap-3 rounded-[20px] border border-primary/10 bg-mist p-3 lg:grid-cols-2">
      <LocalizedField label="Question" value={faq.question} onChange={(question) => onChange((item) => ({ ...item, question }))} />
      <LocalizedField label="Answer" value={faq.answer} multiline onChange={(answer) => onChange((item) => ({ ...item, answer }))} />
      <button type="button" onClick={onDelete} className="inline-flex h-10 items-center gap-2 rounded-[18px] text-sm font-bold text-blush hover:bg-petal">
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        Delete FAQ
      </button>
    </div>
  );
}

function LocalizedField({
  label,
  value,
  onChange,
  multiline = false
}: {
  label: string;
  value: LocalizedString;
  onChange: (value: LocalizedString) => void;
  multiline?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-bold text-ink/70">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <TextField label="English" value={value.en} multiline={multiline} onChange={(en) => onChange({ ...value, en })} />
        <TextField label="Arabic" value={value.ar} multiline={multiline} dir="rtl" onChange={(ar) => onChange({ ...value, ar })} />
      </div>
    </div>
  );
}

function UploadField({
  label,
  preset,
  value,
  password,
  onChange
}: {
  label: string;
  preset?: ImagePresetKey;
  value: string;
  password: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const presetDetails = preset ? imagePresets[preset] : undefined;

  async function upload(file: File) {
    if (!password) {
      setError("Enter admin password before uploading.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      const uploadFile = await standardizeImageFile(file, preset);
      formData.append("file", uploadFile);
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: formData
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error ?? "Upload failed.");
      }

      const result = await response.json() as { url: string };
      onChange(result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <div>
        <label className="text-sm font-bold text-ink/70">{label}</label>
        {presetDetails && (
          <p className="mt-1 text-xs font-bold text-primary/60">
            Standard: {presetDetails.width}x{presetDetails.height}px / {presetDetails.mode}
          </p>
        )}
      </div>
      {value && (
        <div className="relative h-32 overflow-hidden rounded-[18px] border border-primary/10 bg-white">
          <img src={value} alt="" className="h-full w-full object-contain p-2" />
        </div>
      )}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="/images/example.png or uploaded URL"
        className="h-11 rounded-[16px] border border-primary/10 bg-white px-3 text-sm font-semibold text-ink outline-none transition focus:border-primary"
      />
      <div className="flex flex-wrap gap-2">
        <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[16px] bg-primary px-4 text-sm font-bold text-white hover:bg-primary/90">
          <Upload className="h-4 w-4" aria-hidden="true" />
          {uploading ? "Uploading..." : "Upload"}
          <input
            type="file"
            accept="image/*,.svg"
            disabled={uploading}
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void upload(file);
              }
              event.currentTarget.value = "";
            }}
          />
        </label>
        <button type="button" onClick={() => onChange("")} className="h-10 rounded-[16px] border border-primary/10 px-4 text-sm font-bold text-ink/65 hover:bg-mist">
          Clear
        </button>
      </div>
      {error && <p className="text-sm font-bold text-blush">{error}</p>}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  dir = "ltr"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  dir?: "ltr" | "rtl";
}) {
  const className = "rounded-[16px] border border-primary/10 bg-white px-3 text-sm font-semibold text-ink outline-none transition placeholder:text-ink/35 focus:border-primary";

  return (
    <label className="grid gap-1.5 text-xs font-bold uppercase text-ink/45">
      {label}
      {multiline ? (
        <textarea
          dir={dir}
          value={value}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
          className={cn(className, "min-h-28 py-3 normal-case")}
        />
      ) : (
        <input
          dir={dir}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(className, "h-11 normal-case")}
        />
      )}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="inline-flex h-11 items-center gap-3 rounded-[18px] border border-primary/10 bg-white px-4 text-sm font-bold text-ink/70">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-primary"
      />
      {label}
    </label>
  );
}

function ToolbarTitle({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-[24px] border border-primary/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-ink/60">{description}</p>
      </div>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="inline-flex h-11 items-center justify-center gap-2 rounded-[18px] bg-primary px-5 text-sm font-bold text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" aria-hidden="true" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[28px] border border-primary/10 bg-white p-4 shadow-[0_16px_45px_rgba(16,32,51,0.06)] sm:p-6">
      <div className="mb-5 border-b border-primary/10 pb-4">
        <h3 className="text-xl font-bold text-ink sm:text-2xl">{title}</h3>
        {subtitle && <p className="mt-1 break-all text-sm font-semibold text-ink/45">{subtitle}</p>}
      </div>
      <div className="grid gap-5">{children}</div>
    </article>
  );
}

function NestedHeader({
  title,
  onAdd
}: {
  title: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-primary/10 pt-5">
      <h4 className="text-lg font-bold text-primary">{title}</h4>
      <button type="button" onClick={onAdd} className="inline-flex h-10 items-center gap-2 rounded-[16px] bg-sky px-4 text-sm font-bold text-primary hover:bg-primary hover:text-white">
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add
      </button>
    </div>
  );
}
