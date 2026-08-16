"use client";

import { type Locale, type LocalizedString } from "@/lib/content";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

export function AboutSection() {
  const { locale, isRtl } = useLanguage();
  const { about } = useCms();

  return (
    <section id="about" className="section-pad border-b border-border bg-white">
      <div className={cn("section-shell grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10", isRtl && "lg:grid-flow-col-dense")}>
        <Reveal className={cn(isRtl && "text-right lg:col-start-2")}>
          <p className="mb-4 inline-flex rounded-[22px] bg-sky px-4 py-2 text-sm font-bold uppercase text-primary">
            {text(about.eyebrow, locale)}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-ink sm:text-5xl">
            {text(about.title, locale)}
          </h2>
        </Reveal>
        <Reveal delay={0.12} className={cn(isRtl && "text-right lg:col-start-1")}>
          <p className="text-base leading-8 text-ink/70 sm:text-xl sm:leading-9">
            {text(about.description, locale)}
          </p>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
            {about.metrics.map((metric) => (
              <div key={metric.value} className="friendly-card bg-mist p-4 sm:p-5">
                <p className="text-3xl font-bold text-primary sm:text-4xl">{metric.value}</p>
                <p className="mt-1.5 text-sm font-bold text-ink/70 sm:mt-2 sm:text-base">{text(metric.label, locale)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
