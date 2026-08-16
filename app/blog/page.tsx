import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { InsightsListPage } from "@/components/insights/insights-list-page";
import { getCmsContent } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const content = await getCmsContent();

  return (
    <>
      <Header />
      <InsightsListPage
        title={{ en: "DRC Blogs and News", ar: "مدونة وأخبار DRC" }}
        subtitle={{
          en: "Company updates and practical guidance for selecting and using everyday hygienic and personal-care products.",
          ar: "تحديثات الشركة وإرشادات عملية لاختيار واستخدام منتجات العناية الصحية والشخصية اليومية."
        }}
        sections={[
          {
            id: "news",
            title: { en: "News", ar: "الأخبار" },
            subtitle: {
              en: "Company, product, and hygiene-care updates from DRC Group.",
              ar: "تحديثات الشركة والمنتجات والعناية الصحية من DRC."
            },
            items: content.news
          },
          {
            id: "blogs",
            title: { en: "Blogs", ar: "المدونة" },
            subtitle: {
              en: "Practical articles and care guides for families and everyday product use.",
              ar: "مقالات وإرشادات عملية للعائلات والاستخدام اليومي للمنتجات."
            },
            items: content.blogs
          }
        ]}
      />
      <Footer />
    </>
  );
}
