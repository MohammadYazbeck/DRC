"use client";

import type { ElementType } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Facebook,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  contactInfo,
  navLinks,
  socialLinks,
  type Locale
} from "@/lib/content";
import { getVisibleProducts } from "@/lib/cms";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { ProductBrandLogos } from "@/components/products/product-media";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const socialIconMap: Record<string, ElementType<{ className?: string; "aria-hidden"?: boolean }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  whatsapp: WhatsAppIcon
};

function label(value: Record<Locale, string>, locale: Locale) {
  return value[locale];
}

function TopBar({ hidden }: { hidden: boolean }) {
  const { isRtl } = useLanguage();
  const phoneValue = contactInfo.phone.en;
  const emailValue = contactInfo.email.en;

  return (
    <div
      className={cn(
        "overflow-hidden bg-primary text-white transition-all duration-300",
        hidden ? "max-h-0 border-b-0 opacity-0" : "max-h-20 border-b border-white/15 opacity-100 sm:max-h-24"
      )}
    >
      <div
        className={cn(
          "mx-auto flex min-h-11 w-full max-w-[96rem] flex-row items-center justify-between gap-3 px-4 py-2 text-xs font-bold sm:min-h-14 sm:px-5 sm:py-3 sm:text-base lg:px-10",
          isRtl && "sm:flex-row-reverse"
        )}
      >
        <div className={cn("flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1", isRtl && "justify-end")}>
          <a href={`tel:${phoneValue.replace(/\s/g, "")}`} className={cn("focus-ring inline-flex items-center gap-2 rounded-[18px]", isRtl && "flex-row-reverse")}>
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            {phoneValue}
          </a>
          <a href={`mailto:${emailValue}`} className={cn("focus-ring hidden items-center gap-2 rounded-[18px] sm:inline-flex", isRtl && "flex-row-reverse")}>
            <Mail className="h-5 w-5" aria-hidden="true" />
            {emailValue}
          </a>
        </div>

        <div className={cn("flex shrink-0 items-center gap-1 sm:gap-2", isRtl && "justify-end")}>
          {socialLinks.map((item) => {
            const Icon = socialIconMap[item.icon];
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-[18px] border border-white/20 text-white transition hover:bg-white hover:text-primary sm:h-11 sm:w-11 sm:rounded-[22px]"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden={true} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProductMenu({
  isMobile = false,
  onNavigate
}: {
  isMobile?: boolean;
  onNavigate?: () => void;
}) {
  const { locale, isRtl } = useLanguage();
  const content = useCms();
  const products = getVisibleProducts(content);

  return (
    <div
      className={cn(
        "grid gap-2",
        isMobile ? "pt-2" : "absolute top-full z-30 mt-3 w-[min(620px,calc(100vw-2rem))] grid-cols-2 rounded-[22px] border border-border bg-white p-3 shadow-pop",
        !isMobile && (isRtl ? "right-0" : "left-0")
      )}
    >
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          onClick={onNavigate}
          className={cn(
            "focus-ring flex items-center gap-3 rounded-[22px] p-3 transition hover:bg-mist",
            isRtl && "flex-row-reverse text-right"
          )}
        >
          <ProductBrandLogos
            product={product}
            className="h-14 w-14 shrink-0 overflow-hidden rounded-[22px] bg-gradient-to-br from-white to-sky p-1"
            sizes="48px"
          />
          <span className="min-w-0">
            <span className="block text-base font-bold text-ink">{label(product.title, locale)}</span>
            <span className="block text-sm text-ink/60">{label(product.category, locale)}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

function NavigationBar({ hasScrolled }: { hasScrolled: boolean }) {
  const { locale, isRtl, toggleLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const solidNav = hasScrolled || menuOpen || productsOpen;
  const leadingNavLinks = navLinks.slice(0, 2);
  const trailingNavLinks = navLinks.slice(2);
  const productsLabel = locale === "en" ? "Products" : "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a";

  return (
    <nav
      className={cn(
        "z-40 border-b transition duration-300",
        solidNav
          ? "border-transparent bg-white shadow-soft"
          : "border-transparent bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[96rem] items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-5 lg:px-10",
          solidNav ? "min-h-16 py-1.5 sm:min-h-20 sm:py-2" : "min-h-[4.5rem] py-2.5 sm:min-h-28 sm:py-5"
        )}
      >
        <Link
          href="/#home"
          className={cn("focus-ring flex items-center gap-0 rounded-[22px]", isRtl && "flex-row-reverse")}
        >
          <span className="relative h-8 w-24 shrink-0 sm:h-12 sm:w-36">
            <Image
              src="/images/brands/drc-logo-transparent-cropped.png"
              alt="DRC Group"
              fill
              sizes="144px"
              className="object-contain"
              priority
            />
          </span>
          <span className={cn("hidden text-xl font-bold text-primary sm:block lg:text-3xl", isRtl ? "-mr-2" : "-ml-2")}>Group</span>
        </Link>

        <div dir={isRtl ? "rtl" : "ltr"} className="hidden items-center gap-2 lg:flex">
          {leadingNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-[22px] px-5 py-3 text-lg font-bold text-ink transition hover:bg-white/80 hover:text-primary"
            >
              {label(item.label, locale)}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProductsOpen((open) => !open)}
              className={cn(
                "focus-ring inline-flex items-center gap-2 rounded-[22px] px-5 py-3 text-lg font-bold text-ink transition hover:bg-white/80 hover:text-primary",
                isRtl && "flex-row-reverse"
              )}
              aria-expanded={productsOpen}
            >
              {productsLabel}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <ProductMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {trailingNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-[22px] px-5 py-3 text-lg font-bold text-ink transition hover:bg-white/80 hover:text-primary"
            >
              {label(item.label, locale)}
            </Link>
          ))}
        </div>

        <div className={cn("flex items-center gap-2", isRtl && "flex-row-reverse")}>
          <button
            type="button"
            onClick={toggleLocale}
            className={cn(
              "focus-ring inline-flex h-10 items-center gap-1.5 rounded-[18px] border px-3 text-sm font-bold text-primary transition sm:h-14 sm:gap-2 sm:rounded-[22px] sm:px-5 sm:text-lg",
              solidNav
                ? "border-border bg-white/75 hover:bg-white"
                : "border-primary/25 bg-transparent hover:bg-white/65",
              isRtl && "flex-row-reverse"
            )}
          >
            <Globe2 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            {locale === "en" ? "\u0627\u0644\u0639\u0631\u0628\u064a\u0629" : "English"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-[18px] border border-border text-primary sm:h-12 sm:w-12 sm:rounded-[22px] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <div className={cn("section-shell grid gap-1 py-4", isRtl && "text-right")}>
              {leadingNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="focus-ring rounded-[22px] px-3 py-3 text-base font-bold text-ink hover:bg-mist"
                >
                  {label(item.label, locale)}
                </Link>
              ))}
              <div className="rounded-[22px] border border-border p-2">
                <p className="px-1 text-xs font-bold uppercase text-ink/50">
                  {productsLabel}
                </p>
                <ProductMenu isMobile onNavigate={() => setMenuOpen(false)} />
              </div>
              {trailingNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="focus-ring rounded-[22px] px-3 py-3 text-base font-bold text-ink hover:bg-mist"
                >
                  {label(item.label, locale)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 16);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <TopBar hidden={hasScrolled} />
      <NavigationBar hasScrolled={hasScrolled} />
    </header>
  );
}
