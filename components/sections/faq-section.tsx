"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs, type Locale, type LocalizedString } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const { locale, isRtl } = useLanguage();

  return (
    <section id="faq" className="section-pad bg-white">
      <div className="section-shell">
        <SectionHeading
          eyebrow={{ en: "FAQ", ar: "الأسئلة الشائعة" }}
          title={{
            en: "Answers to common product and sizing questions.",
            ar: "إجابات على أسئلة المنتجات والمقاسات الشائعة."
          }}
        />

        <Reveal className="mx-auto mt-8 grid max-w-5xl gap-3 sm:mt-14 sm:gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.article
                layout
                key={item.question.en}
                className={cn(
                  "overflow-hidden rounded-[22px] border bg-white shadow-soft transition-colors duration-300 sm:rounded-[28px]",
                  isOpen ? "border-primary/25 bg-gradient-to-br from-white via-sky/55 to-white" : "border-border"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className={cn(
                    "focus-ring flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-sky/45 sm:gap-4 sm:px-7 sm:py-5",
                    isRtl && "flex-row-reverse text-right"
                  )}
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold leading-7 text-ink sm:text-xl sm:leading-8">{text(item.question, locale)}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] bg-primary text-white shadow-soft sm:h-12 sm:w-12 sm:rounded-[22px]">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.08 : 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 24 }}
                    >
                      <Plus className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ type: "spring", stiffness: 360, damping: 34 }}
                    >
                      <div className={cn("px-4 pb-4 sm:px-7 sm:pb-6", isRtl && "text-right")}>
                        <div className={cn("rounded-[20px] border border-primary/10 bg-white/85 p-4 text-base leading-8 text-ink/65 shadow-soft sm:rounded-[24px] sm:p-5 sm:text-lg sm:leading-9", isRtl && "text-right")}>
                          {text(item.answer, locale)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
