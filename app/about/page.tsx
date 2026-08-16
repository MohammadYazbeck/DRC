import { AboutPageContent } from "@/components/about/about-page-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutPageContent />
      <Footer />
    </>
  );
}
