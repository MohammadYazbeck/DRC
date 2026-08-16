import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductDetail } from "@/components/products/product-detail";
import { getProductBySlug } from "@/lib/cms";
import { getCmsContent } from "@/lib/cms-store";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const content = await getCmsContent();
  const product = getProductBySlug(content, slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}
