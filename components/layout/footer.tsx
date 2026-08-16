"use client";

import type { ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";
import { footer, navLinks, socialLinks, type Locale } from "@/lib/content";
import { getVisibleProducts } from "@/lib/cms";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const socialIconMap: Record<string, ElementType<{ className?: string; "aria-hidden"?: boolean }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  whatsapp: WhatsAppIcon
};

function text(value: Record<Locale, string>, locale: Locale) {
  return value[locale];
}

export function Footer() {
  const { locale, isRtl } = useLanguage();
  const content = useCms();
  const products = getVisibleProducts(content);
  const quickLinks = [
    ...navLinks,
    { label: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" }, href: "/#faq" }
  ];

  return (
    <footer id="contact" className="border-t border-border bg-primary text-white">
      <div className={cn("section-shell grid gap-8 py-10 sm:py-16 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:gap-10", isRtl && "text-right")}>
        <div>
          <Link
            href="/"
            className={cn("focus-ring inline-flex items-center gap-2 rounded-[22px]", isRtl && "flex-row-reverse")}
          >
            <span className="relative h-14 w-14 overflow-hidden rounded-[18px] bg-white sm:h-20 sm:w-20 sm:rounded-[22px]">
              <Image src="/images/brands/drc-logo-transparent-cropped.png" alt="DRC Group" fill sizes="64px" className="object-contain p-2" />
            </span>
            <span className="text-3xl font-bold sm:text-4xl">Group</span>
          </Link>
          <p className="mt-4 max-w-md text-base leading-7 text-white/80 sm:mt-5 sm:text-lg sm:leading-8">
            {text(footer.description, locale)}
          </p>
          <div className={cn("mt-5 flex items-center gap-2 sm:mt-6", isRtl && "justify-end")}>
            {socialLinks.map((item) => {
              const Icon = socialIconMap[item.icon];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-[22px] border border-white/20 text-white transition hover:bg-white hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden={true} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold">{text(footer.quickLinksTitle, locale)}</h2>
          <ul className="mt-4 grid gap-2.5 text-sm font-semibold text-white/80 sm:mt-5 sm:gap-3 sm:text-base">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link className="focus-ring rounded-[22px] transition hover:text-white" href={item.href}>
                  {text(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold">{text(footer.productLinksTitle, locale)}</h2>
          <ul className="mt-4 grid gap-2.5 text-sm font-semibold text-white/80 sm:mt-5 sm:gap-3 sm:text-base">
            {products.map((product) => (
              <li key={product.slug}>
                <Link className="focus-ring rounded-[22px] transition hover:text-white" href={`/products/${product.slug}`}>
                  {text(product.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 py-4 sm:py-5">
        <div className={cn("section-shell flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between", isRtl && "sm:flex-row-reverse text-right")}>
          <p>© {new Date().getFullYear()} DRC Group. {text(footer.copyright, locale)}</p>
          <p>{locale === "en" ? "Hygiene products made with care." : "منتجات عناية مصنوعة باهتمام."}</p>
        </div>
      </div>
    </footer>
  );
}
