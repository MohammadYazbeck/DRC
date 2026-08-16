"use client";

import {
  BadgeCheck,
  Boxes,
  Droplets,
  Feather,
  ShieldCheck,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { whyFeatures, type Locale, type LocalizedString } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  shield: ShieldCheck,
  feather: Feather,
  users: UsersRound,
  boxes: Boxes,
  badge: BadgeCheck
};

const nodeStyles = [
  "from-aqua to-primary",
  "from-primary to-[#6f7df6]",
  "from-blush to-primary",
  "from-leaf to-aqua",
  "from-[#7b61ff] to-blush",
  "from-ink to-primary"
];

const orbitPositions = [
  "lg:left-[calc(50%+145px)] lg:top-6",
  "lg:left-[calc(50%+215px)] lg:top-[210px]",
  "lg:left-[calc(50%+145px)] lg:bottom-6",
  "lg:right-[calc(50%+145px)] lg:bottom-6",
  "lg:right-[calc(50%+215px)] lg:top-[210px]",
  "lg:right-[calc(50%+145px)] lg:top-6"
];

const circleLines: Record<Locale, string[]> = {
  en: ["WHY", "OUR", "PRODUCTS?"],
  ar: ["لماذا", "منتجاتنا؟"]
};

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

export function WhyProductsSection() {
  const { locale, isRtl } = useLanguage();

  return (
    <section className="section-pad soft-pattern">
      <div className="section-shell">
        <Reveal
          className={cn(
            "relative mx-auto max-w-[82rem] rounded-[28px] bg-mist/70 px-3 py-6 sm:rounded-[36px] sm:px-6 sm:py-8 lg:min-h-[610px] lg:overflow-hidden lg:bg-white lg:px-0 lg:py-0",
            isRtl && "text-right"
          )}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div className="relative z-10 mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-primary via-[#496fd6] to-aqua text-center text-white shadow-pop sm:h-80 sm:w-80 lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[320px] lg:w-[320px] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <div className="px-4 sm:px-6">
              {circleLines[locale].map((line) => (
                <p key={line} className="text-2xl font-bold leading-tight sm:text-5xl">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:hidden">
            {whyFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon] ?? BadgeCheck;

              return (
                <article
                  key={feature.title.en}
                  className={cn("rounded-[22px] border border-primary/10 bg-white p-4 shadow-soft sm:rounded-[30px] sm:p-5", isRtl && "text-right")}
                >
                  <div className={cn("flex items-start gap-4", isRtl && "flex-row-reverse")}>
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-pop sm:h-14 sm:w-14",
                        nodeStyles[index % nodeStyles.length]
                      )}
                    >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink sm:text-xl">{text(feature.title, locale)}</h3>
                      <p className="mt-1.5 text-sm leading-7 text-ink/62 sm:mt-2 sm:text-base sm:leading-8">{text(feature.description, locale)}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hidden lg:block">
            {whyFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon] ?? BadgeCheck;
              const isRightSide = index < 3;

              return (
                <article
                  key={feature.title.en}
                  className={cn(
                    "group absolute w-[300px] rounded-[28px] border border-primary/10 bg-white/95 p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-pop",
                    orbitPositions[index],
                    isRightSide ? "pl-12" : "pr-12",
                    isRtl && "text-right"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1/2 h-px w-10 -translate-y-1/2 bg-border",
                      isRightSide ? "-left-10" : "-right-10"
                    )}
                  />
                  <div
                    className={cn(
                      "absolute top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-pop transition group-hover:scale-105",
                      nodeStyles[index % nodeStyles.length],
                      isRightSide ? "-left-7" : "-right-7"
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <h3 className="text-xl font-bold text-ink">
                    {text(feature.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-ink/62">
                    {text(feature.description, locale)}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
