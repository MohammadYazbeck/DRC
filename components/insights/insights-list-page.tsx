"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { common, type Locale, type LocalizedString } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

type InsightItem = {
  slug: string;
  image: string;
  category: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  date?: LocalizedString;
  href?: string;
  source?: LocalizedString;
};

type InsightsListPageProps = {
  title: LocalizedString;
  subtitle: LocalizedString;
  items?: InsightItem[];
  sections?: Array<{
    id: string;
    title: LocalizedString;
    subtitle?: LocalizedString;
    items: InsightItem[];
  }>;
};

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

function InsightCard({
  item,
  locale,
  isRtl,
  ArrowIcon
}: {
  item: InsightItem;
  locale: Locale;
  isRtl: boolean;
  ArrowIcon: typeof ArrowLeft;
}) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-border bg-white shadow-soft">
      <div className="relative aspect-[5/3] bg-white md:aspect-[4/3]">
        <Image src={item.image || "/people/Hero/Hero-3.png"} alt={text(item.title, locale)} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
      </div>
      <div className="border-t border-border p-4 sm:p-5">
        <div className={cn("flex flex-wrap items-center gap-2", isRtl && "justify-end")}>
          <p className="rounded-full bg-sky px-3 py-1 text-xs font-bold uppercase text-primary">{text(item.category, locale)}</p>
          {item.source && <p className="text-xs font-bold text-ink/45">{text(item.source, locale)}</p>}
        </div>
        {item.date && <p className="mt-2 text-xs font-semibold text-ink/45">{text(item.date, locale)}</p>}
        <h2 className="mt-3 text-lg font-bold leading-7 text-ink md:min-h-16">{text(item.title, locale)}</h2>
        <p className="mt-3 text-sm leading-7 text-ink/65">{text(item.description, locale)}</p>
        <a
          href={item.href ?? "/#contact"}
          target={item.href ? "_blank" : undefined}
          rel={item.href ? "noreferrer" : undefined}
          className={cn(
            "focus-ring mt-4 inline-flex h-10 items-center gap-2 rounded-[18px] border border-primary px-4 text-sm font-bold text-primary transition hover:bg-primary hover:text-white sm:mt-5 sm:h-11 sm:rounded-[22px]",
            isRtl && "flex-row-reverse"
          )}
        >
          {text(item.href ? common.readMore : common.contactUs, locale)}
          {item.href ? <ExternalLink className="h-4 w-4" aria-hidden="true" /> : <ArrowIcon className="h-4 w-4" aria-hidden="true" />}
        </a>
      </div>
    </article>
  );
}

export function InsightsListPage({ title, subtitle, items = [], sections }: InsightsListPageProps) {
  const { locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const pageSections = sections?.length ? sections : [{ id: "items", title, items }];

  return (
    <main className="bg-white">
      <section className="bg-mist pb-12 pt-32 sm:pb-24 sm:pt-52 lg:pb-28">
        <div className={cn("section-shell", isRtl && "text-right")}>
          <Link
            href="/#news"
            className={cn(
            "focus-ring mb-6 inline-flex items-center gap-2 rounded-[20px] text-sm font-bold text-primary hover:text-aqua sm:mb-8 sm:rounded-[22px]",
              isRtl && "flex-row-reverse"
            )}
          >
            <ArrowIcon className="h-4 w-4 rotate-180" aria-hidden="true" />
            {locale === "en" ? "Back to homepage" : "العودة إلى الصفحة الرئيسية"}
          </Link>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-5xl">{text(title, locale)}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ink/70 sm:mt-5 sm:text-lg sm:leading-8">{text(subtitle, locale)}</p>

          <div className="mt-8 grid gap-10 md:mt-12 md:gap-14">
            {pageSections.map((section) => (
              <section key={section.id} id={section.id}>
                {sections?.length ? (
                  <div className="mb-5 sm:mb-7">
                    <h2 className="text-2xl font-bold text-ink sm:text-4xl">{text(section.title, locale)}</h2>
                    {section.subtitle && <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/65 sm:text-base sm:leading-8">{text(section.subtitle, locale)}</p>}
                  </div>
                ) : null}
                <div className="grid gap-5 md:grid-cols-3">
                  {section.items.map((item) => (
                    <InsightCard key={item.slug} item={item} locale={locale} isRtl={isRtl} ArrowIcon={ArrowIcon} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
