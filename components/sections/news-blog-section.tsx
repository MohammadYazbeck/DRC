"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { common, type InsightItem, type Locale, type LocalizedString } from "@/lib/content";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Tab = "news" | "blogs";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

export function NewsBlogSection() {
  const [activeTab, setActiveTab] = useState<Tab>("news");
  const { locale, isRtl } = useLanguage();
  const content = useCms();
  const items: InsightItem[] = activeTab === "news" ? content.news : content.blogs;

  return (
    <section id="news" className="section-pad border-y border-border bg-mist">
      <div className="section-shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="start"
            eyebrow={{ en: "News and Blogs", ar: "الأخبار والمدونة" }}
            title={{
              en: "Company updates and practical hygiene-care guidance.",
              ar: "تحديثات الشركة وإرشادات عملية للعناية الصحية."
            }}
          />

          <div className={cn("inline-flex w-full rounded-[22px] border border-border bg-white p-1 shadow-soft sm:w-auto", isRtl && "flex-row-reverse")}>
            {(["news", "blogs"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "focus-ring h-12 flex-1 rounded-[22px] px-6 text-base font-bold transition sm:flex-none",
                  activeTab === tab ? "bg-primary text-white" : "text-ink/70 hover:bg-mist"
                )}
              >
                {tab === "news" ? (locale === "en" ? "News" : "الأخبار") : (locale === "en" ? "Blogs" : "المدونة")}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {items.slice(0, 3).map((item, index) => (
            <Reveal
              as="article"
              key={item.slug}
              delay={index * 0.07}
              className={cn("friendly-card group overflow-hidden", isRtl && "text-right")}
            >
              <div className="relative aspect-[5/3] bg-gradient-to-br from-white via-sky to-mint md:aspect-[4/3]">
                <Image
                  src={item.image || "/people/Hero/Hero-3.png"}
                  alt={text(item.title, locale)}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t border-border p-4 sm:p-6">
                <div className={cn("flex flex-wrap items-center gap-2", isRtl && "justify-end")}>
                  <p className="rounded-full bg-sky px-3 py-1 text-xs font-bold uppercase text-primary">
                    {text(item.category, locale)}
                  </p>
                  {item.source && (
                    <p className="text-xs font-bold text-ink/45">
                      {text(item.source, locale)}
                    </p>
                  )}
                </div>
                {"date" in item && item.date && (
                  <p className="mt-3 text-sm font-semibold text-ink/45">
                    {text(item.date, locale)}
                  </p>
                )}
                <h3 className="mt-3 text-xl font-bold leading-7 text-ink md:min-h-20 md:text-2xl md:leading-8">
                  {text(item.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink/65 md:mt-3 md:min-h-32 md:text-base md:leading-8">
                  {text(item.description, locale)}
                </p>
                <a
                  href={item.href ?? "/#contact"}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noreferrer" : undefined}
                  className={cn(
                    "focus-ring mt-4 inline-flex h-10 items-center gap-2 rounded-[18px] border border-primary px-4 text-sm font-bold text-primary transition hover:bg-primary hover:text-white sm:mt-5 sm:h-12 sm:rounded-[22px] sm:px-5 sm:text-base",
                    isRtl && "flex-row-reverse"
                  )}
                >
                  {text(activeTab === "news" ? common.exploreMore : common.readMore, locale)}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
