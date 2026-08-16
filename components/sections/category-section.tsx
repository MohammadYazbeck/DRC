"use client";

import { categories, type Locale, type LocalizedString } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

const heading = {
  en: "Our Categories",
  ar: "فئاتنا"
} satisfies LocalizedString;

const subtitle = {
  en: "Explore DRC's main hygiene and personal-care product families.",
  ar: "استكشف الفئات الرئيسية لمنتجات العناية الصحية والشخصية من DRC."
} satisfies LocalizedString;

const eyebrow = {
  en: "Choose by Category",
  ar: "اختر حسب الفئة"
} satisfies LocalizedString;

export function CategorySection() {
  const { locale, isRtl } = useLanguage();

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="section-shell">
        <div className="mx-auto text-center">
          <p className="mb-3 inline-flex rounded-[22px] bg-sky px-4 py-2 text-xs font-bold uppercase text-primary sm:text-sm">
            {text(eyebrow, locale)}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {text(heading, locale)}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink/65 sm:text-lg">
            {text(subtitle, locale)}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal
              as="article"
              key={category.title.en}
              delay={index * 0.04}
              className={cn(
                "group flex min-h-[132px] flex-col items-center justify-center rounded-[22px] border border-primary/10 bg-gradient-to-b from-white to-sky/55 p-4 text-center shadow-soft transition duration-300 hover:border-primary/20 sm:min-h-[172px] sm:rounded-[28px] sm:p-5 sm:hover:-translate-y-1 sm:hover:shadow-pop",
                isRtl && "text-right"
              )}
            >
              <img
                src={category.art}
                alt=""
                className="h-14 w-14 object-contain transition duration-300 group-hover:scale-105 sm:h-24 sm:w-24 sm:group-hover:-translate-y-1"
                loading="lazy"
              />

              <h3 className="mt-3 text-lg font-bold leading-tight text-primary sm:mt-4 sm:text-2xl">
                {text(category.title, locale)}
              </h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
