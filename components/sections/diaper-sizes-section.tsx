"use client";

import { diaperSizes, type Locale, type LocalizedString } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

const tableCopy = {
  eyebrow: { en: "Size Guide", ar: "دليل المقاسات" },
  title: { en: "Baby Diaper Sizes", ar: "مقاسات حفاضات الأطفال" },
  subtitle: {
    en: "Recommended baby weight for each diaper size.",
    ar: "الوزن المناسب للطفل حسب كل مقاس حفاض."
  },
  size: { en: "Size", ar: "المقاس" },
  name: { en: "Fit", ar: "الملاءمة" },
  weight: { en: "Baby weight", ar: "وزن الطفل" },
  kg: { en: "kg", ar: "كغ" }
} satisfies Record<string, LocalizedString>;

const sizeStyles = [
  "border-sky bg-sky text-primary",
  "border-mint bg-mint text-leaf",
  "border-lemon bg-lemon text-ink",
  "border-petal bg-petal text-blush",
  "border-lavender bg-lavender text-primary",
  "border-primary/15 bg-primary text-white"
];

export function DiaperSizesSection() {
  const { locale, isRtl } = useLanguage();

  return (
    <section className="section-pad bg-gradient-to-b from-white via-mist to-white">
      <div className="section-shell">
        <SectionHeading
          eyebrow={tableCopy.eyebrow}
          title={tableCopy.title}
          subtitle={tableCopy.subtitle}
        />

        <Reveal
          className={cn(
            "mx-auto mt-8 max-w-7xl overflow-hidden rounded-[24px] border border-primary/10 bg-white shadow-soft sm:mt-12 sm:rounded-[30px]",
            isRtl && "text-right"
          )}
        >
          <div className="h-2 bg-gradient-to-r from-aqua via-primary to-blush" />

          <div className="px-3 py-4 sm:px-5 sm:py-5">
            <div
              dir={isRtl ? "rtl" : "ltr"}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
            >
              {diaperSizes.map((item, index) => (
                <div
                  key={item.size}
                  className="rounded-[22px] border border-primary/10 bg-white px-3 py-4 text-center shadow-soft transition hover:bg-mist/65 sm:rounded-[28px] sm:px-4 sm:py-5"
                >
                  <div
                    className={cn(
                      "mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border text-2xl font-bold shadow-soft sm:h-20 sm:w-20 sm:rounded-[26px] sm:text-3xl",
                      sizeStyles[index % sizeStyles.length]
                    )}
                  >
                    {item.size}
                  </div>

                  <p className="mt-3 text-sm font-bold text-ink sm:mt-4 sm:text-lg">
                    {text(item.name, locale)}
                  </p>
                  <p className="mt-3 text-[10px] font-bold uppercase text-ink/45 sm:mt-4 sm:text-xs">
                    {text(tableCopy.weight, locale)}
                  </p>
                  <p className="mt-2 rounded-full bg-primary/10 px-3 py-2 text-base font-bold text-primary sm:px-4 sm:py-3 sm:text-2xl">
                    {item.range} {text(tableCopy.kg, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
