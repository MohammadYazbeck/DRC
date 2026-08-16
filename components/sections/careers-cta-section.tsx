"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export function CareersCtaSection() {
  const { locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const { jobs } = useCms();
  const activeJobs = jobs.filter((job) => job.active);

  return (
    <section id="careers" className="bg-primary py-10 text-white sm:py-16">
      <div className={cn("section-shell flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between", isRtl && "text-right lg:flex-row-reverse")}>
        <div className={cn("flex gap-4", isRtl && "flex-row-reverse")}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-white text-primary sm:h-14 sm:w-14 sm:rounded-[22px]">
            <BriefcaseBusiness className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold sm:text-4xl">
              {locale === "en" ? "Careers at DRC Group" : "الوظائف في مجموعة DRC"}
            </h2>
            <p className="mt-2 max-w-3xl text-base leading-7 text-white/82 sm:mt-3 sm:text-lg sm:leading-8">
              {locale === "en"
                ? `${activeJobs.length || "New"} open roles are managed from the DRC control panel. Explore current opportunities and apply online.`
                : `تتم إدارة ${activeJobs.length || "عدة"} فرص عمل من لوحة التحكم. استعرض الفرص الحالية وقدّم طلبك مباشرة.`}
            </p>
          </div>
        </div>
        <Link
          href="/careers"
          className={cn(
            "focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-[20px] bg-white px-5 text-sm font-bold text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-mist sm:h-14 sm:rounded-[22px] sm:px-6 sm:text-base",
            isRtl && "flex-row-reverse"
          )}
        >
          {locale === "en" ? "View Careers" : "عرض الوظائف"}
          <ArrowIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
