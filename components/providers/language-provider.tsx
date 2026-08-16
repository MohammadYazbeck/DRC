"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { Locale } from "@/lib/content";

type Direction = "ltr" | "rtl";

type LanguageContextValue = {
  locale: Locale;
  direction: Direction;
  isRtl: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const direction: Direction = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    document.body.dataset.locale = locale;
  }, [direction, locale]);

  const value = useMemo(
    () => ({
      locale,
      direction,
      isRtl: direction === "rtl",
      setLocale,
      toggleLocale: () => setLocale((current) => (current === "en" ? "ar" : "en"))
    }),
    [direction, locale]
  );

  return (
    <LanguageContext.Provider value={value}>
      <div lang={locale} dir={direction}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
