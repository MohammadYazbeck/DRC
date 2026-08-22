"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CategorySection } from "@/components/sections/category-section";
import { DiaperSizesSection } from "@/components/sections/diaper-sizes-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { NewsBlogSection } from "@/components/sections/news-blog-section";
import { ProductsSection } from "@/components/sections/products-section";
import { WhyProductsSection } from "@/components/sections/why-products-section";

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <DiaperSizesSection />
        <WhyProductsSection />
        <CategorySection />
        <NewsBlogSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
