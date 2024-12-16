import PageHeader from "@/app/components/ui/PageHeader";
import Header from "@/app/components/ui/Header";
import Button from "@/app/components/ui/Button";
import ProductForm from "@/app/components/forms/ProductForm";

export default function EditProduct() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="px-4 lg:mx-28 py-9">
        <PageHeader>
          <Button
            route="/products"
            text="Download data"
            style="button_outline"
          />

          <Button
            route="products/new"
            text="Create a new product"
            style="button_primary"
          />
        </PageHeader>
        <ProductForm />
      </div>
    </div>
  );
}
