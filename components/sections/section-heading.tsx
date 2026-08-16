"use client";

import type { Locale, LocalizedString } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: LocalizedString;
  title: LocalizedString;
  subtitle?: LocalizedString;
  align?: "start" | "center";
};

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  const { locale, isRtl } = useLanguage();
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-4xl",
        centered && "mx-auto text-center",
        !centered && isRtl && "text-right"
      )}
    >
      {eyebrow && (
        <p className="mb-4 inline-flex rounded-[22px] bg-petal px-4 py-2 text-sm font-bold uppercase text-primary">
          {text(eyebrow, locale)}
        </p>
      )}
      <h2 className="text-3xl font-bold leading-tight text-ink sm:text-5xl">
        {text(title, locale)}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-7 text-ink/68 sm:mt-5 sm:text-xl sm:leading-9">
          {text(subtitle, locale)}
        </p>
      )}
    </div>
  );
}
