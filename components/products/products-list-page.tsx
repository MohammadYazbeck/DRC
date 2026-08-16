"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { common, type Locale, type LocalizedString } from "@/lib/content";
import { getVisibleProducts } from "@/lib/cms";
import { ProductBrandLogos, ProductCardMedia } from "@/components/products/product-media";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

const productsPageCopy = {
  eyebrow: {
    en: "All Products",
    ar: "كل المنتجات"
  },
  title: {
    en: "DRC product portfolio.",
    ar: "مجموعة منتجات DRC."
  },
  subtitle: {
    en: "Browse DRC Group's hygienic and personal-care products by brand, category, and product line.",
    ar: "استعرض منتجات DRC للعناية الصحية والشخصية حسب العلامة التجارية والفئة وخط المنتج."
  }
} satisfies Record<string, LocalizedString>;

export function ProductsListPage() {
  const { locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const content = useCms();
  const visibleProducts = getVisibleProducts(content);

  return (
    <main className="bg-white">
      <section className="bg-mist pb-12 pt-32 sm:pb-24 sm:pt-52 lg:pb-28">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center">
            <p className="soft-pill inline-flex">{text(productsPageCopy.eyebrow, locale)}</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:mt-5 sm:text-6xl">
              {text(productsPageCopy.title, locale)}
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink/70 sm:mt-5 sm:text-xl sm:leading-9">
              {text(productsPageCopy.subtitle, locale)}
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <article
                key={product.slug}
                className={cn(
                  "overflow-hidden rounded-[26px] border border-primary/10 bg-white shadow-soft transition-colors hover:border-primary/25",
                  isRtl && "text-right"
                )}
              >
                <div className="relative aspect-square bg-gradient-to-br from-white via-sky to-petal">
                  <ProductCardMedia
                    product={product}
                    alt={text(product.title, locale)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    imageClassName="p-4 sm:p-6"
                  />
                </div>

                <div className="border-t border-primary/10 p-4 sm:p-6">
                  <div className={cn("flex items-center gap-4", isRtl && "flex-row-reverse")}>
                    <ProductBrandLogos
                      product={product}
                      className={cn("h-10 shrink-0 sm:h-14", product.logos?.length ? "w-32 sm:w-44" : "w-20 sm:w-24")}
                      sizes="96px"
                    />
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                      {text(product.category, locale)}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-ink sm:mt-5 sm:text-3xl">{text(product.title, locale)}</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65 sm:mt-3 sm:min-h-20 sm:text-base sm:leading-8">
                    {text(product.excerpt, locale)}
                  </p>

                  <Link
                    href={`/products/${product.slug}`}
                    className={cn(
                      "focus-ring mt-4 inline-flex h-10 items-center gap-2 rounded-[18px] text-sm font-bold text-primary transition hover:text-blush sm:mt-6 sm:h-12 sm:rounded-[22px] sm:text-base",
                      isRtl && "flex-row-reverse"
                    )}
                  >
                    {text(common.moreInfo, locale)}
                    <ArrowIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
