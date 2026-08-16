"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  common,
  featuredProductSlugs,
  type Locale,
  type LocalizedString
} from "@/lib/content";
import { getVisibleProducts } from "@/lib/cms";
import { ProductBrandLogos, ProductCardMedia } from "@/components/products/product-media";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

export function ProductsSection() {
  const { locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const content = useCms();
  const visibleProducts = getVisibleProducts(content);
  const manuallyFeatured = visibleProducts.filter((product) => product.featured);
  const featured = (manuallyFeatured.length
    ? manuallyFeatured
    : visibleProducts.filter((product) => featuredProductSlugs.includes(product.slug))).slice(0, 3);

  return (
    <section id="products" className="section-pad soft-pattern">
      <div className="section-shell">
        <SectionHeading
          eyebrow={{ en: "Our Products", ar: "منتجاتنا" }}
          title={{
            en: "Featured hygiene brands for home and professional care.",
            ar: "علامات عناية صحية مميزة للمنزل والاستخدام المهني."
          }}
          subtitle={{
            en: "Explore a focused selection from DRC Group's portfolio, designed around comfort, softness, and practical everyday protection.",
            ar: "استكشف مجموعة مختارة من منتجات DRC المصممة حول الراحة والنعومة والحماية اليومية العملية."
          }}
        />

        <div className="mt-8 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal
              as="article"
              delay={index * 0.07}
              key={product.slug}
              className={cn("friendly-card overflow-hidden", isRtl && "text-right")}
            >
              <div className="relative aspect-square bg-gradient-to-br from-white via-sky to-petal">
                <ProductCardMedia
                  product={product}
                  alt={text(product.title, locale)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  imageClassName="p-4 transition duration-300 hover:scale-[1.04] sm:p-5"
                />
              </div>
              <div className="border-t border-border p-4 sm:p-6">
                <div className={cn("mb-3 flex items-center gap-3 sm:mb-4", isRtl && "flex-row-reverse")}>
                  <ProductBrandLogos
                    product={product}
                    className={cn("h-10 shrink-0 sm:h-12", product.logos?.length ? "w-32 sm:w-40" : "w-16 sm:w-20")}
                    sizes="80px"
                  />
                  <span className="rounded-[22px] bg-mint px-3 py-1 text-sm font-bold text-primary">
                    {text(product.category, locale)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-ink sm:text-2xl">{text(product.title, locale)}</h3>
                <p className="mt-2 text-sm leading-7 text-ink/65 sm:mt-3 sm:min-h-28 sm:text-base sm:leading-8">
                  {text(product.excerpt, locale)}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className={cn(
                    "focus-ring mt-4 inline-flex h-10 items-center gap-2 rounded-[18px] text-sm font-bold text-primary transition hover:text-blush sm:mt-5 sm:h-12 sm:rounded-[22px] sm:text-base",
                    isRtl && "flex-row-reverse"
                  )}
                >
                  {text(common.moreInfo, locale)}
                  <ArrowIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-12">
          <Link
            href="/products"
            className={cn(
              "focus-ring inline-flex h-12 items-center gap-2 rounded-[20px] bg-primary px-5 text-sm font-bold text-white shadow-soft transition hover:bg-primary/90 sm:h-14 sm:rounded-[24px] sm:px-7 sm:text-base",
              isRtl && "flex-row-reverse"
            )}
          >
            {text(common.exploreMore, locale)}
            <ArrowIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
