import { CareersPageContent } from "@/components/careers/careers-page-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const dynamic = "force-dynamic";

export default function CareersPage() {
  return (
    <>
      <Header />
      <CareersPageContent />
      <Footer />
    </>
  );
}
