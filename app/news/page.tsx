import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { InsightsListPage } from "@/components/insights/insights-list-page";
import { getCmsContent } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const content = await getCmsContent();

  return (
    <>
      <Header />
      <InsightsListPage
        title={{ en: "DRC News", ar: "أخبار DRC" }}
        subtitle={{
          en: "Company and product updates from DRC Group.",
          ar: "تحديثات الشركة والمنتجات من مجموعة DRC."
        }}
        items={content.news}
      />
      <Footer />
    </>
  );
}
