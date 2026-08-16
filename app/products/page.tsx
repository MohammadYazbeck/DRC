import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProductsListPage } from "@/components/products/products-list-page";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <ProductsListPage />
      <Footer />
    </>
  );
}
