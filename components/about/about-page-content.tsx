"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Droplets,
  Factory,
  HeartHandshake,
  Layers3,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import type { Locale, LocalizedString, Product } from "@/lib/content";
import { cn } from "@/lib/utils";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

const pageCopy = {
  storyEyebrow: { en: "Who We Are", ar: "من نحن" },
  promise: { en: "Explore the DRC care portfolio", ar: "استعرض محفظة عناية DRC" },
  valuesEyebrow: { en: "Our Values", ar: "قيمنا" },
  valuesTitle: {
    en: "Clear principles behind every product decision.",
    ar: "مبادئ واضحة خلف كل قرار في المنتج."
  },
  portfolioEyebrow: { en: "Brand Portfolio", ar: "محفظة العلامات" },
  portfolioTitle: {
    en: "Specialized brands, one practical care system.",
    ar: "علامات متخصصة ضمن منظومة عناية عملية واحدة."
  },
  portfolioSubtitle: {
    en: "Each brand has a distinct role, from baby diapers and sanitary pads to tissues and adult-care products.",
    ar: "لكل علامة دور واضح، من حفاضات الأطفال والفوط النسائية إلى المحارم ومنتجات العناية بكبار السن."
  },
  ecosystemEyebrow: { en: "How We Think", ar: "طريقة عملنا" },
  ecosystemTitle: {
    en: "A product ecosystem designed for fast decisions and dependable use.",
    ar: "منظومة منتجات مصممة لاختيارات سهلة واستخدام موثوق."
  },
  ecosystemBody: {
    en: "The portfolio is organized around familiar life moments: caring for a baby, choosing reliable period care, keeping homes clean, and supporting adult-care routines.",
    ar: "تنظم محفظة المنتجات حول لحظات يومية مألوفة: العناية بالطفل، اختيار حماية نسائية موثوقة، الحفاظ على نظافة المنزل، ودعم روتين العناية بكبار السن."
  },
  exploreProducts: { en: "Explore Products", ar: "استعرض المنتجات" }
} satisfies Record<string, LocalizedString>;

const values = [
  {
    icon: HeartHandshake,
    title: { en: "Human Care First", ar: "العناية بالإنسان أولا" },
    body: {
      en: "Products are shaped around comfort, cleanliness, and confidence for the people who use them every day.",
      ar: "تصمم المنتجات حول الراحة والنظافة والثقة للأشخاص الذين يستخدمونها يوميا."
    }
  },
  {
    icon: ShieldCheck,
    title: { en: "Protection You Can Rely On", ar: "حماية يمكن الاعتماد عليها" },
    body: {
      en: "Absorption, leakage control, softness, and fit are treated as measurable product promises.",
      ar: "الامتصاص ومنع التسريب والنعومة والملاءمة وعود أساسية قابلة للقياس في المنتج."
    }
  },
  {
    icon: Factory,
    title: { en: "Quality in the Details", ar: "الجودة في التفاصيل" },
    body: {
      en: "Material choice, finishing, packaging, and format clarity all support a cleaner care routine.",
      ar: "اختيار المواد والتشطيب والتغليف ووضوح التنسيقات عناصر تدعم روتين عناية أنظف."
    }
  },
  {
    icon: Sparkles,
    title: { en: "Simple Everyday Confidence", ar: "ثقة يومية بسيطة" },
    body: {
      en: "The portfolio is made to be practical, easy to understand, and simple to choose.",
      ar: "المحفظة مصممة لتكون عملية وواضحة وسهلة الاختيار."
    }
  }
] satisfies Array<{ icon: LucideIcon; title: LocalizedString; body: LocalizedString }>;

const brandCopy: Record<string, { name: LocalizedString; category: LocalizedString }> = {
  "baby-rexy": {
    name: { en: "New Baby Rexy", ar: "نيو بيبي ريكسي" },
    category: { en: "Baby diapers", ar: "حفاضات الأطفال" }
  },
  "hq-plus": {
    name: { en: "HQ+", ar: "HQ+" },
    category: { en: "Sanitary pads", ar: "الفوط النسائية" }
  },
  tizkar: {
    name: { en: "Tizkar", ar: "Tizkar" },
    category: { en: "Facial tissues", ar: "محارم الوجه" }
  },
  fantash: {
    name: { en: "Fantash", ar: "Fantash" },
    category: { en: "Baby diapers", ar: "حفاضات الأطفال" }
  },
  pinotex: {
    name: { en: "Pinotex", ar: "Pinotex" },
    category: { en: "Adult diapers", ar: "حفاضات كبار السن" }
  },
  avia: {
    name: { en: "Avia", ar: "Avia" },
    category: { en: "Adult diapers", ar: "حفاضات كبار السن" }
  }
};

const carePillars = [
  {
    icon: Droplets,
    title: { en: "Absorption", ar: "امتصاص" },
    body: { en: "Dryness and leakage support are central to the product experience.", ar: "الجفاف ودعم الحماية من التسريب جزء أساسي من تجربة المنتج." }
  },
  {
    icon: UsersRound,
    title: { en: "Life Stages", ar: "مراحل الحياة" },
    body: { en: "Products for babies, women, adults, seniors, and households.", ar: "منتجات للأطفال والنساء والبالغين وكبار السن والمنازل." }
  },
  {
    icon: PackageCheck,
    title: { en: "Clear Formats", ar: "تنسيقات واضحة" },
    body: { en: "Sizes and categories are organized to make choosing easier.", ar: "المقاسات والفئات منظمة لتسهيل الاختيار." }
  },
  {
    icon: BadgeCheck,
    title: { en: "Brand Trust", ar: "ثقة العلامة" },
    body: { en: "A focused family of brands with defined roles and product promises.", ar: "عائلة مركزة من العلامات بأدوار ووعود واضحة." }
  }
] satisfies Array<{ icon: LucideIcon; title: LocalizedString; body: LocalizedString }>;

function productLabel(product: Product, locale: Locale) {
  return text(brandCopy[product.slug]?.name ?? product.title, locale);
}

function productCategory(product: Product, locale: Locale) {
  return text(brandCopy[product.slug]?.category ?? product.category, locale);
}

export function AboutPageContent() {
  const { locale, isRtl } = useLanguage();
  const { about, products } = useCms();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const visibleProducts = products.filter((product) => !product.hidden);
  const featuredProducts = visibleProducts.filter((product) => brandCopy[product.slug]).slice(0, 6);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-white pb-10 pt-28 sm:pb-16 sm:pt-44 lg:pb-20">
        <div className="absolute inset-x-0 top-0 h-40 bg-mist" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-primary/10" aria-hidden="true" />

        <div className={cn("section-shell relative grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14", isRtl && "text-right")}>
          <Reveal>
            <p className="soft-pill inline-flex">{text(pageCopy.storyEyebrow, locale)}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
              {text(about.title, locale)}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-ink/70 sm:text-xl sm:leading-9">
              {text(about.description, locale)}
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
              {about.metrics.map((metric) => (
                <div
                  key={metric.value}
                  className="rounded-[999px] border border-primary/10 bg-white px-4 py-3 shadow-[0_14px_32px_rgba(16,32,51,0.07)] sm:px-5"
                >
                  <span className="text-2xl font-bold leading-none text-primary sm:text-3xl">{metric.value}</span>
                  <span className="mx-2 text-primary/25">/</span>
                  <span className="text-xs font-bold text-ink/60 sm:text-sm">{text(metric.label, locale)}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div dir="ltr" className="relative">
              <div className="relative min-h-[27rem] overflow-hidden rounded-[34px] bg-primary sm:min-h-[36rem] lg:min-h-[39rem]">
                <Image
                  src="/images/standardized/hero/hero-2.jpg"
                  alt="DRC hygiene care"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className={cn("object-cover", isRtl && "-scale-x-100")}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/88 via-primary/20 to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-12">
        <div className={cn("section-shell", isRtl && "text-right")}>
          <div className="grid gap-6 border-y border-primary/10 py-8 lg:grid-cols-[0.64fr_1.36fr] lg:items-center lg:gap-10">
            <div>
              <p className="text-sm font-bold uppercase text-primary/70">{text(pageCopy.portfolioEyebrow, locale)}</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-ink sm:text-4xl">
                {text(pageCopy.portfolioTitle, locale)}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-ink/65 sm:text-base sm:leading-8">
                {text(pageCopy.portfolioSubtitle, locale)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group flex min-h-36 flex-col items-center justify-between rounded-[24px] border border-primary/10 bg-white px-3 py-4 text-center shadow-[0_14px_34px_rgba(16,32,51,0.06)] transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-soft"
                >
                  <div className="relative h-14 w-full max-w-28 sm:h-16">
                    <Image
                      src={product.logo}
                      alt={productLabel(product, locale)}
                      fill
                      sizes="140px"
                      className="object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-3 block">
                    <span className="block text-sm font-bold text-primary">{productLabel(product, locale)}</span>
                    <span className="mt-1 block text-[11px] font-bold leading-4 text-ink/45">{productCategory(product, locale)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="soft-pattern py-12 sm:py-20 lg:py-24">
        <div className={cn("section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14", isRtl && "text-right")}>
          <Reveal className={cn(isRtl && "lg:order-2")}>
            <p className="soft-pill inline-flex">{text(pageCopy.ecosystemEyebrow, locale)}</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-5xl">
              {text(pageCopy.ecosystemTitle, locale)}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-ink/70 sm:text-lg sm:leading-9">
              {text(pageCopy.ecosystemBody, locale)}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {carePillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.title.en}
                    className={cn(
                      "flex min-h-36 gap-3 rounded-[24px] border border-primary/10 bg-white p-4 shadow-[0_12px_30px_rgba(16,32,51,0.05)]",
                      isRtl && "flex-row-reverse"
                    )}
                  >
                    <span className={cn(
                      "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] text-primary",
                      index % 3 === 0 ? "bg-lemon" : index % 3 === 1 ? "bg-mint" : "bg-sky"
                    )}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-lg font-bold text-ink">{text(pillar.title, locale)}</span>
                      <span className="mt-1 block text-sm leading-6 text-ink/65">{text(pillar.body, locale)}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.12} className={cn(isRtl && "lg:order-1")}>
            <div className="relative">
              <div className="absolute inset-4 rounded-[38px] bg-white/45" aria-hidden="true" />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {featuredProducts.slice(0, 4).map((product) => (
                  <article
                    key={product.slug}
                    className="overflow-hidden rounded-[26px] border border-primary/10 bg-white p-3 shadow-[0_16px_38px_rgba(16,32,51,0.08)]"
                  >
                    <div className="relative aspect-square rounded-[22px] bg-mist/70">
                      <Image
                        src={product.cardImage || product.image}
                        alt={productLabel(product, locale)}
                        fill
                        sizes="(min-width: 1024px) 260px, 44vw"
                        className="object-contain p-2 sm:p-3"
                      />
                    </div>
                    <div className={cn("mt-2 min-w-0", isRtl && "text-right")}>
                      <h3 className="truncate text-base font-bold text-ink sm:text-lg">{productLabel(product, locale)}</h3>
                      <p className="truncate text-xs font-bold text-primary/65 sm:text-sm">{productCategory(product, locale)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-20 lg:py-24">
        <div className={cn("section-shell grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16", isRtl && "text-right")}>
          <Reveal>
            <p className="soft-pill inline-flex">{text(pageCopy.valuesEyebrow, locale)}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-primary sm:text-5xl">
              {text(pageCopy.valuesTitle, locale)}
            </h2>
            <Link
              href="/products"
              className={cn(
                "focus-ring mt-7 inline-flex h-12 items-center gap-2 rounded-[20px] bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary/90 sm:h-14 sm:rounded-[24px] sm:px-7 sm:text-base",
                isRtl && "flex-row-reverse"
              )}
            >
              {text(pageCopy.exploreProducts, locale)}
              <ArrowIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <article
                    key={value.title.en}
                    className={cn(
                      "relative min-h-64 overflow-hidden rounded-[26px] border border-primary/10 bg-white p-5 shadow-[0_14px_34px_rgba(16,32,51,0.06)] transition hover:-translate-y-1 hover:shadow-soft sm:p-6",
                      index % 2 === 0 ? "before:bg-mint" : "before:bg-sky",
                      "before:absolute before:inset-x-0 before:top-0 before:h-1.5"
                    )}
                  >
                    <div className={cn("flex items-center justify-between gap-4", isRtl && "flex-row-reverse")}>
                      <span
                        className={cn(
                          "inline-flex h-14 w-14 items-center justify-center rounded-[20px] text-primary",
                          index % 2 === 0 ? "bg-mint" : "bg-sky"
                        )}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-bold text-primary/35">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-ink sm:text-2xl">{text(value.title, locale)}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink/65 sm:text-base sm:leading-8">{text(value.body, locale)}</p>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-primary py-8 text-white sm:py-10">
        <div className={cn("section-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between", isRtl && "text-right sm:flex-row-reverse")}>
          <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse")}>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-[20px] bg-white/12">
              <Layers3 className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="max-w-2xl text-xl font-bold leading-8 sm:text-2xl">
              {text(pageCopy.promise, locale)}
            </p>
          </div>
          <Link
            href="/#contact"
            className={cn(
              "focus-ring inline-flex h-12 shrink-0 items-center gap-2 rounded-[20px] bg-white px-5 text-sm font-bold text-primary transition hover:bg-sky sm:h-14 sm:rounded-[24px] sm:px-7 sm:text-base",
              isRtl && "flex-row-reverse"
            )}
          >
            {locale === "en" ? "Contact Us" : "تواصل معنا"}
            <ArrowIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
