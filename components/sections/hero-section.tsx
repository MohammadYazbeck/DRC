"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  common,
  type Locale,
  type LocalizedString
} from "@/lib/content";
import { getBrandLogosFromProducts } from "@/lib/cms";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { locale, isRtl } = useLanguage();
  const content = useCms();
  const { hero, heroSlides } = content;
  const brandLogos = getBrandLogosFromProducts(content);
  const slide = heroSlides[activeIndex % heroSlides.length];
  const slideImage = text(slide.image, locale) || "/people/Hero/Hero-1.png";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section id="home" className="bg-white">
      <div className="relative min-h-[64svh] overflow-hidden bg-white sm:min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${slide.id}-${locale}-background`}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <Image
              src={slideImage}
              alt=""
              fill
              priority
              loading="eager"
              sizes="100vw"
              className={cn("object-cover object-[right_top] sm:object-right", isRtl && "-scale-x-100")}
            />
          </motion.div>
        </AnimatePresence>
        <div
          className={cn(
            "absolute inset-0 z-[1] hidden sm:block",
            isRtl
              ? "bg-gradient-to-l from-white/82 via-white/48 to-white/0"
              : "bg-gradient-to-r from-white/82 via-white/48 to-white/0"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 z-[1] sm:hidden",
            isRtl
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.03)_38%,rgba(255,255,255,.5)_76%,rgba(255,255,255,.9)_100%),linear-gradient(270deg,rgba(255,255,255,.52)_0%,rgba(255,255,255,.3)_36%,rgba(255,255,255,.02)_76%)]"
              : "bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.03)_38%,rgba(255,255,255,.5)_76%,rgba(255,255,255,.9)_100%),linear-gradient(90deg,rgba(255,255,255,.52)_0%,rgba(255,255,255,.3)_36%,rgba(255,255,255,.02)_76%)]"
          )}
        />
        <div className="absolute inset-0 z-[1] bg-white/5 sm:bg-white/5" />
        <div className="absolute inset-0 z-[1] opacity-10 [background-image:linear-gradient(90deg,rgba(26,75,135,.05)_1px,transparent_1px),linear-gradient(0deg,rgba(217,70,143,.05)_1px,transparent_1px)] [background-size:34px_34px] sm:opacity-20 sm:[background-size:42px_42px]" />

      <div className="section-shell relative z-10 flex min-h-[64svh] items-end pb-14 pt-24 sm:min-h-screen sm:items-center sm:pb-16 sm:pt-56 lg:pt-44">
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className={cn("w-full max-w-[20rem] min-[390px]:max-w-[22rem] sm:mt-12 sm:max-w-4xl lg:mt-16 lg:max-w-[720px]", isRtl && "ml-auto text-right")}
        >
          <h1 className="max-w-5xl text-[1.35rem] font-bold leading-[1.08] text-primary [text-wrap:balance] drop-shadow-[0_1px_0_rgba(255,255,255,.75)] min-[390px]:text-[1.55rem] sm:text-5xl sm:leading-tight sm:drop-shadow-none lg:text-7xl">
            {text(hero.title, locale)}
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeIndex}-${locale}-subtitle`}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-6 hidden max-w-3xl font-semibold text-ink/76 sm:block sm:text-xl sm:leading-9 lg:mt-7 lg:text-2xl lg:leading-10"
            >
              {text(hero.subtitle, locale)}
            </motion.p>
          </AnimatePresence>

          <motion.p
            key={`${slide.id}-title-${locale}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-4 hidden font-bold text-blush sm:block sm:text-xl lg:text-2xl"
          >
            {text(slide.title, locale)}
          </motion.p>

          <div className={cn("mt-5 grid w-full max-w-[19rem] grid-cols-2 gap-2 sm:mt-8 sm:flex sm:max-w-none sm:flex-wrap sm:gap-3", isRtl && "ml-auto sm:justify-end")}>
            <Link
              href="#products"
              className={cn(
                "focus-ring inline-flex min-h-10 items-center justify-center gap-1.5 rounded-[17px] bg-primary px-3 text-center text-xs font-bold leading-tight text-white transition hover:bg-primary/90 sm:h-14 sm:gap-2 sm:rounded-[22px] sm:px-6 sm:text-base sm:shadow-pop sm:hover:-translate-y-0.5",
                isRtl && "flex-row-reverse"
              )}
            >
              {text(common.viewProducts, locale)}
              <ArrowIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#contact"
              className="focus-ring inline-flex min-h-10 items-center justify-center rounded-[17px] border border-primary/50 bg-white/82 px-3 text-center text-xs font-bold leading-tight text-primary backdrop-blur-[2px] transition hover:bg-white sm:h-14 sm:rounded-[22px] sm:border-primary sm:bg-white/90 sm:px-6 sm:text-base sm:backdrop-blur-none sm:hover:-translate-y-0.5"
            >
              {text(common.contactUs, locale)}
            </Link>
          </div>

        </div>
      </div>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2 sm:bottom-10">
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${item.id} slide`}
              className={cn(
                "h-2.5 rounded-full transition",
                index === activeIndex ? "w-9 bg-primary" : "w-2.5 bg-primary/25 hover:bg-primary/45"
              )}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="section-shell py-2 sm:py-5">
          <div className="mx-auto flex min-h-14 w-full flex-wrap items-center justify-center gap-x-[clamp(0.5rem,2.5vw,1.5rem)] gap-y-2 sm:min-h-28">
            {brandLogos.map((brand) => (
              <div
                key={brand.name}
                className="relative aspect-[2.6/1] w-[clamp(3.7rem,18vw,9rem)] shrink transition hover:-translate-y-1"
                title={brand.name}
              >
                <Image src={brand.src} alt={brand.name} fill sizes="(max-width: 640px) 18vw, 144px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
