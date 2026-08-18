import type { Metadata } from "next";
import { CmsProvider } from "@/components/providers/cms-provider";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { LanguageProvider } from "@/components/providers/language-provider";
import { getCmsContent } from "@/lib/cms-store";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DRC Group | Everyday Care, Made with Love and Attention",
  description:
    "DRC Group provides trusted hygienic care products for every member of the family, designed for comfort, softness, and effective absorption."
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getCmsContent();

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <CmsProvider content={content}>
            {children}
            <FloatingWhatsApp />
          </CmsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
