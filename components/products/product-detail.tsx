"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Droplets,
  Feather,
  PackageCheck,
  Plus,
  ShieldCheck,
  Sparkles,
  Waves,
  type LucideIcon
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { common, type Locale, type Product, type ProductFeatureIcon } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

function text(value: Record<Locale, string>, locale: Locale) {
  return value[locale];
}

function comparableText(value: string) {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim().toLocaleLowerCase();
}

const sizeStyles = [
  "border-sky bg-sky text-primary",
  "border-mint bg-mint text-leaf",
  "border-lemon bg-lemon text-ink",
  "border-petal bg-petal text-blush",
  "border-lavender bg-lavender text-primary",
  "border-primary/15 bg-primary text-white"
];

const variantBadgeStyles = [
  "bg-blush text-white",
  "bg-leaf text-white",
  "bg-primary text-white",
  "bg-aqua text-white"
];

type SizeScaleTheme = Record<"eyebrow" | "dot" | "card" | "label" | "value" | "note", string>;

const sizeScaleThemes: Record<string, SizeScaleTheme> = {
  "baby-rexy": {
    eyebrow: "bg-sky text-primary ring-primary/10",
    dot: "bg-aqua",
    card: "border-primary/10 bg-gradient-to-br from-white via-sky/70 to-white hover:border-aqua/40",
    label: "text-primary",
    value: "bg-aqua/10 text-primary",
    note: "text-primary/70"
  },
  "hq-plus": {
    eyebrow: "bg-petal text-blush ring-blush/10",
    dot: "bg-blush",
    card: "border-blush/20 bg-gradient-to-br from-white via-petal/70 to-white hover:border-blush/40",
    label: "text-blush",
    value: "bg-blush/10 text-blush",
    note: "text-blush/70"
  },
  tizkar: {
    eyebrow: "bg-sky text-primary ring-primary/10",
    dot: "bg-blush",
    card: "border-primary/10 bg-gradient-to-br from-white via-sky/60 to-petal/40 hover:border-blush/40",
    label: "text-primary",
    value: "bg-blush/10 text-blush",
    note: "text-primary/70"
  },
  default: {
    eyebrow: "bg-primary/10 text-primary ring-primary/10",
    dot: "bg-primary",
    card: "border-primary/10 bg-white/90 hover:border-primary/20",
    label: "text-primary",
    value: "bg-primary/10 text-primary",
    note: "text-ink/70"
  }
};

const detailFeatureIconMap: Record<ProductFeatureIcon, LucideIcon> = {
  absorption: Droplets,
  comfort: Feather,
  dryness: Waves,
  fit: BadgeCheck,
  materials: Sparkles,
  packaging: PackageCheck,
  protection: ShieldCheck,
  softness: Feather
};

const productPageCopy = {
  sizesEyebrow: { en: "Sizes and formats", ar: "المقاسات والتنسيقات" },
  sizesTitle: { en: "Available options for this product", ar: "الخيارات المتوفرة ضمن هذا المنتج" },
  sizesSubtitle: {
    en: "A simple guide to the sizes, weights, and package formats available for this product.",
    ar: "دليل بسيط للمقاسات والأوزان وتنسيقات العبوات المتوفرة لهذا المنتج."
  },
  availableSizes: {
    en: "Available sizes",
    ar: "المقاسات المتوفرة"
  },
  faqEyebrow: {
    en: "Product FAQ",
    ar: "أسئلة المنتج"
  },
  featuresEyebrow: {
    en: "Product Features",
    ar: "مميزات المنتج"
  },
  featuresTitle: {
    en: "Designed for comfort, dryness, and dependable protection.",
    ar: "مصممة للراحة والجفاف والحماية الموثوقة."
  },
  featuresSubtitle: {
    en: "A closer look at the protection layers, surface comfort, and finishing details inside HQ+.",
    ar: "نظرة أقرب على طبقات الحماية ونعومة السطح وتفاصيل العناية داخل آتش كيو."
  },
  featuresCountLabel: {
    en: "care details",
    ar: "تفاصيل عناية"
  },
  option: {
    en: "Option",
    ar: "الخيار"
  }
} satisfies Record<string, Record<Locale, string>>;

function ProductSizeScale({
  product,
  sizes,
  locale,
  isRtl,
  className
}: {
  product: Product;
  sizes: NonNullable<Product["sizes"]>;
  locale: Locale;
  isRtl: boolean;
  className?: string;
}) {
  const theme = sizeScaleThemes[product.slug] ?? sizeScaleThemes.default;
  const sizeCount = sizes.length;
  const gridClass =
    sizeCount === 2
      ? "grid-cols-2"
      : sizeCount === 3
        ? "grid-cols-1 min-[360px]:grid-cols-3"
        : sizeCount === 4
          ? "grid-cols-2 sm:grid-cols-4"
          : sizeCount >= 6
            ? "grid-cols-2 min-[390px]:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3";
  const widthClass =
    sizeCount === 2
      ? "max-w-[440px]"
      : sizeCount === 4
        ? "max-w-[720px] lg:max-w-[680px]"
        : "max-w-[560px] lg:max-w-[540px]";
  const cardSizeClass =
    sizeCount === 2
      ? "min-h-[104px] sm:min-h-[126px] sm:p-5"
      : sizeCount === 4
        ? "min-h-[92px] sm:min-h-[112px] sm:p-3.5"
        : "min-h-[96px] sm:min-h-[118px] sm:p-4";
  const labelSizeClass =
    sizeCount === 2
      ? "text-2xl sm:text-3xl"
      : sizeCount === 4
        ? "text-2xl sm:text-3xl"
        : "text-3xl sm:text-4xl";
  const stackSizeValue = sizeCount <= 4;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={cn("w-full justify-self-center", widthClass, className)}>
      <div className={cn("mb-3 flex items-center gap-2 sm:mb-4", isRtl ? "justify-end flex-row-reverse" : "justify-start")}>
        <span className={cn("h-2.5 w-2.5 rounded-full", theme.dot)} />
        <p className={cn("rounded-full px-3.5 py-2 text-sm font-bold ring-1 sm:px-4 sm:text-base", theme.eyebrow)}>
          {text(productPageCopy.availableSizes, locale)}
        </p>
      </div>
      <div
        className={cn(
          "grid gap-2.5 rounded-[28px] border border-primary/10 bg-white/65 p-2.5 shadow-[0_18px_50px_rgba(16,32,51,0.06)] backdrop-blur sm:gap-3 sm:p-3",
          gridClass,
          isRtl && "text-right"
        )}
      >
        {sizes.map((size) => {
          const value = text(size.value, locale);
          const note = text(size.note ?? size.label, locale);
          const showNote = comparableText(note) !== comparableText(value);

          return (
            <article
              key={`${size.label.en}-${size.value.en}`}
              className={cn(
                "relative overflow-hidden rounded-[20px] border p-3 transition duration-300 sm:rounded-[22px]",
                cardSizeClass,
                theme.card
              )}
            >
              <div
                className={cn(
                  "flex gap-3",
                  stackSizeValue ? "flex-col" : "items-start justify-between",
                  stackSizeValue ? (isRtl ? "items-end" : "items-start") : undefined
                )}
              >
                <span className={cn("font-bold leading-none", labelSizeClass, theme.label)}>
                  {text(size.label, locale)}
                </span>
                <span className={cn("inline-flex max-w-full rounded-full px-2.5 py-1.5 text-sm font-bold leading-tight sm:px-3 sm:text-base", theme.value)}>
                  {value}
                </span>
              </div>

              {showNote && (
                <p className={cn("mt-3 text-sm font-bold leading-6 sm:mt-4 sm:text-base", theme.note)}>
                  {note}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ProductFaqList({
  product,
  faqs,
  locale,
  isRtl
}: {
  product: Product;
  faqs: NonNullable<Product["faqs"]>;
  locale: Locale;
  isRtl: boolean;
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const faqTitle = product.faqTitle
    ? text(product.faqTitle, locale)
    : locale === "en"
      ? `Quick answers about ${text(product.title, locale)}.`
      : `إجابات سريعة حول ${text(product.title, locale)}.`;

  return (
    <section className="section-pad bg-white">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="soft-pill inline-flex">{text(productPageCopy.faqEyebrow, locale)}</p>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-primary sm:text-4xl">
            {faqTitle}
          </h2>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:mt-10 sm:gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.article
                layout
                key={item.question.en}
                className={cn(
                  "overflow-hidden rounded-[22px] border bg-white shadow-soft transition-colors duration-300 sm:rounded-[28px]",
                  isOpen ? "border-primary/25 bg-gradient-to-br from-white via-sky/55 to-white" : "border-border"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  dir={isRtl ? "rtl" : "ltr"}
                  className={cn(
                    "focus-ring flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-sky/45 sm:gap-4 sm:px-7 sm:py-5",
                    isRtl && "text-right"
                  )}
                  aria-expanded={isOpen}
                >
                  <span className={cn("flex-1 text-base font-bold leading-7 text-ink sm:text-xl sm:leading-8", isRtl && "text-right")}>{text(item.question, locale)}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] bg-primary text-white shadow-soft sm:h-12 sm:w-12 sm:rounded-[22px]">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.08 : 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 24 }}
                    >
                      <Plus className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ type: "spring", stiffness: 360, damping: 34 }}
                    >
                      <div className={cn("px-4 pb-4 sm:px-7 sm:pb-6", isRtl && "text-right")}>
                        <div className={cn("rounded-[20px] border border-primary/10 bg-white/85 p-4 text-base leading-8 text-ink/65 shadow-soft sm:rounded-[24px] sm:p-5 sm:text-lg sm:leading-9", isRtl && "text-right")}>
                          {text(item.answer, locale)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductDetailFeatures({
  product,
  features,
  locale,
  isRtl
}: {
  product: Product;
  features: NonNullable<Product["detailFeatures"]>;
  locale: Locale;
  isRtl: boolean;
}) {
  return (
    <section className="bg-white py-12 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div
          dir="ltr"
          className={cn(
            "grid gap-8 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.35fr)] lg:items-start lg:gap-14",
            isRtl && "lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.8fr)]"
          )}
        >
          <aside
            dir={isRtl ? "rtl" : "ltr"}
            className={cn("lg:sticky lg:top-28", isRtl ? "text-right lg:col-start-2 lg:row-start-1" : "text-left lg:col-start-1")}
          >
            <div
              dir="ltr"
              className={cn("grid grid-cols-[auto_auto] items-center gap-3", isRtl ? "justify-end" : "justify-start")}
            >
              <span className="relative h-12 w-20 shrink-0">
                <Image src={product.logo} alt="" fill sizes="80px" className="object-contain" />
              </span>
              <div dir={isRtl ? "rtl" : "ltr"} className={cn(isRtl ? "text-right" : "text-left")}>
                <p className="text-sm font-bold text-primary/70">{text(productPageCopy.featuresEyebrow, locale)}</p>
                <p className="text-base font-bold text-primary">{text(product.title, locale)}</p>
              </div>
            </div>

            <h2 className={cn("mt-7 max-w-lg text-3xl font-bold leading-tight text-primary sm:text-4xl", isRtl && "ml-auto")}>
              {text(productPageCopy.featuresTitle, locale)}
            </h2>
            <p className={cn("mt-4 max-w-xl text-base leading-8 text-ink/65", isRtl && "ml-auto")}>
              {text(productPageCopy.featuresSubtitle, locale)}
            </p>

            <div className={cn("mt-7 border-y border-primary/10 py-4", isRtl ? "text-right" : "flex items-center gap-4")}>
              <p className="text-4xl font-bold leading-none text-primary">{features.length}</p>
              <p className={cn("max-w-36 text-sm font-bold leading-6 text-ink/55", isRtl && "mt-1 max-w-none")}>
                {text(productPageCopy.featuresCountLabel, locale)}
              </p>
            </div>
          </aside>

          <div
            dir={isRtl ? "rtl" : "ltr"}
            className={cn(
              "grid min-w-0 border-t border-primary/10 sm:grid-cols-2 sm:gap-x-10",
              isRtl ? "text-right lg:col-start-1 lg:row-start-1" : "lg:col-start-2"
            )}
          >
            {features.map((feature, index) => {
              const Icon = detailFeatureIconMap[feature.icon] ?? BadgeCheck;

              return (
                <article
                  key={feature.title.en}
                  className={cn(
                    "group border-b border-primary/10 py-5 sm:py-6",
                    isRtl && "text-right"
                  )}
                >
                  <div className={cn("flex items-start gap-4", isRtl && "flex-row-reverse")}>
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-primary/45">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-1 text-lg font-bold leading-7 text-ink">
                        {text(feature.title, locale)}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-ink/62">
                        {text(feature.description, locale)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const hasSizes = Boolean(product.sizes?.length);
  const sizeCount = product.sizes?.length ?? 0;
  const hasSizeImages = Boolean(product.sizes?.some((size) => size.image));
  const heroImage = product.bannerImage || product.image || product.cardImage || product.logo || "/images/brands/drc-logo-transparent-cropped.png";
  const bannerSize = product.bannerSize ?? { width: 2075, height: 328 };
  const hasDetailFeatures = Boolean(product.detailFeatures?.length);
  const introContent = (
    <div dir={isRtl ? "rtl" : "ltr"} className={cn("max-w-3xl", isRtl ? "ml-auto text-right" : "text-left")}>
      <p className="inline-flex rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-primary shadow-soft">
        {text(product.category, locale)}
      </p>
      <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:mt-5 sm:text-6xl">{text(product.title, locale)}</h1>
      <p className={cn("mt-4 max-w-2xl whitespace-pre-line text-base leading-7 text-ink/70 sm:mt-6 sm:text-xl sm:leading-9", isRtl && "ml-auto")}>{text(product.description, locale)}</p>
      <Link
        href="/#contact"
        className={cn(
          "focus-ring mt-6 inline-flex h-12 items-center gap-2 rounded-[20px] bg-primary px-5 text-sm font-bold text-white shadow-soft hover:bg-primary/90 sm:mt-8 sm:h-14 sm:rounded-[24px] sm:px-6 sm:text-base",
          isRtl && "flex-row-reverse"
        )}
      >
        {text(common.contactUs, locale)}
        <ArrowIcon className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="bg-white">
      <section
        className={cn(
          "border-b border-border bg-mist pb-12 sm:pb-24 lg:pb-28",
          product.bannerImage ? "pt-32 sm:pt-[10.5rem]" : "pt-32 sm:pt-52"
        )}
      >
        {product.bannerImage && (
          <div dir="ltr" className="w-full overflow-hidden">
            <Image
              src={heroImage}
              alt={text(product.title, locale)}
              width={bannerSize.width}
              height={bannerSize.height}
              priority
              sizes="100vw"
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        <div className={cn("section-shell grid lg:grid-cols-2 lg:items-center", product.bannerImage ? "gap-0" : "gap-10", isRtl && "text-right")}>
          {product.bannerImage ? (
            <div
              dir="ltr"
              className={cn(
                "grid content-center items-center gap-8 py-8 sm:min-h-[36rem] sm:gap-12 sm:py-12 lg:col-span-2 lg:min-h-[32rem] lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)] lg:py-10",
                isRtl && "lg:grid-cols-[minmax(420px,560px)_minmax(0,1fr)]"
              )}
            >
              <div className={cn(isRtl ? "lg:order-2" : "lg:order-1")}>{introContent}</div>
              {product.sizes && (
                <div className={cn("grid gap-5 self-center", isRtl ? "lg:order-1" : "lg:order-2")}>
                  <ProductSizeScale
                    product={product}
                    sizes={product.sizes}
                    locale={locale}
                    isRtl={isRtl}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={cn(isRtl && "lg:order-2")}>
              {introContent}
              {product.sizes && (
                <ProductSizeScale
                  product={product}
                  sizes={product.sizes}
                  locale={locale}
                  isRtl={isRtl}
                  className="mt-8"
                />
              )}
            </div>
          )}
          {!product.bannerImage && (
            <div
              dir="ltr"
              className={cn(
                "relative mx-auto w-full max-w-[560px]",
                isRtl && "lg:order-1"
              )}
            >
              <div className="relative aspect-square">
                <Image
                  src={heroImage}
                  alt={text(product.title, locale)}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {hasSizes && (
        <section className="soft-pattern py-12 sm:py-20 lg:py-24">
          <div className="section-shell">
              <div dir={isRtl ? "rtl" : "ltr"}>
                <div className="mx-auto max-w-4xl text-center">
                  <p className="soft-pill inline-flex">{text(productPageCopy.sizesEyebrow, locale)}</p>
                  <h2 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl">
                    {text(product.optionsTitle ?? productPageCopy.sizesTitle, locale)}
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink/65 sm:text-lg sm:leading-8">
                    {text(product.optionsSubtitle ?? productPageCopy.sizesSubtitle, locale)}
                  </p>
                </div>

                {hasSizeImages ? (
                  <div
                    className={cn(
                      "mt-7 grid gap-x-5 gap-y-8 sm:mt-10 sm:grid-cols-2 sm:gap-y-10",
                      sizeCount === 4
                        ? "lg:grid-cols-4"
                        : sizeCount === 2
                          ? "mx-auto max-w-5xl lg:grid-cols-2"
                          : "lg:grid-cols-3"
                    )}
                  >
                    {product.sizes?.map((size, index) => {
                      const badgeStyle = variantBadgeStyles[index % variantBadgeStyles.length];
                      const title = text(size.note ?? size.label, locale);
                      const value = text(size.value, locale);
                      const showValue = value !== title;

                      return (
                        <article
                          key={`${size.label.en}-${size.value.en}`}
                          className={cn(
                            "group",
                            isRtl && "text-right"
                          )}
                        >
                          <div className="relative aspect-square overflow-hidden rounded-[28px] border border-primary/10 bg-white shadow-soft transition duration-300 group-hover:-translate-y-1 group-hover:border-primary/25 sm:rounded-[34px]">
                            <span
                              className={cn(
                                "absolute top-4 z-10 inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-bold shadow-soft",
                                badgeStyle,
                                isRtl ? "left-4" : "right-4"
                              )}
                            >
                              {text(size.label, locale)}
                            </span>
                            <div className="absolute inset-x-10 bottom-8 h-8 rounded-full bg-primary/10 blur-xl" />
                            {size.image && (
                              <Image
                                src={size.image}
                                alt={`${text(product.title, locale)} ${text(size.label, locale)}`}
                                fill
                                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                className={cn(
                                  "object-contain transition duration-300",
                                  product.slug === "hq-plus"
                                    ? "scale-[1.2] p-0 group-hover:scale-[1.24] sm:scale-[1.24] sm:group-hover:scale-[1.28]"
                                    : product.slug === "tizkar"
                                      ? "scale-[1.26] p-0 group-hover:scale-[1.32] sm:scale-[1.32] sm:group-hover:scale-[1.38]"
                                    : "p-3 group-hover:scale-[1.05] sm:p-5"
                                )}
                              />
                            )}
                          </div>
                          <div className="px-1 pt-4 sm:pt-5">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className={cn("text-xl font-bold leading-7 text-ink sm:text-2xl sm:leading-8", isRtl && "text-right")}>{title}</h3>
                              {showValue && (
                                <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
                                  {value}
                                </span>
                              )}
                            </div>
                            <p className="mt-3 text-sm leading-7 text-ink/65 sm:min-h-24 sm:text-base sm:leading-8">
                              {size.description ? text(size.description, locale) : value}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className={cn(
                      "mx-auto mt-6 max-w-7xl overflow-hidden rounded-[24px] border border-primary/10 bg-white shadow-soft sm:mt-8 sm:rounded-[30px]",
                      isRtl && "text-right"
                    )}
                  >
                    <div className="h-2 bg-gradient-to-r from-aqua via-primary to-blush" />

                    <div className="px-3 py-4 sm:px-5 sm:py-5">
                      <div
                        dir={isRtl ? "rtl" : "ltr"}
                        className={cn(
                          "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4",
                          sizeCount > 4
                            ? "lg:grid-cols-6"
                            : sizeCount === 3
                              ? "lg:grid-cols-3"
                              : "lg:grid-cols-4"
                        )}
                      >
                        {product.sizes?.map((size, index) => (
                          <article
                            key={`${size.label.en}-${size.value.en}`}
                            className="rounded-[22px] border border-primary/10 bg-white px-3 py-4 text-center shadow-soft transition hover:bg-mist/65 sm:rounded-[28px] sm:px-4 sm:py-5"
                          >
                            <div
                              className={cn(
                                "mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border text-2xl font-bold shadow-soft sm:h-20 sm:w-20 sm:rounded-[26px] sm:text-3xl",
                                sizeStyles[index % sizeStyles.length]
                              )}
                            >
                              {text(size.label, locale)}
                            </div>

                            {size.note && (
                              <p className="mt-3 text-sm font-bold text-ink sm:mt-4 sm:text-lg">
                                {text(size.note, locale)}
                              </p>
                            )}
                            <p className="mt-3 text-[10px] font-bold uppercase text-ink/45 sm:mt-4 sm:text-xs">
                              {text(productPageCopy.option, locale)}
                            </p>
                            <p className="mt-2 rounded-full bg-primary/10 px-3 py-2 text-base font-bold text-primary sm:px-4 sm:py-3 sm:text-2xl">
                              {text(size.value, locale)}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
          </div>
        </section>
      )}

      {hasDetailFeatures && product.detailFeatures ? (
        <ProductDetailFeatures product={product} features={product.detailFeatures} locale={locale} isRtl={isRtl} />
      ) : null}

      {product.faqs?.length ? (
        <ProductFaqList product={product} faqs={product.faqs} locale={locale} isRtl={isRtl} />
      ) : null}
    </main>
  );
}
