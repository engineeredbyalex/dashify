import ProductForm from "@/app/components/forms/ProductForm/ProductForm";
import Header from "@/app/components/ui/header";

export default function ProductNew() {
  return (
    <div className="">
      <Header />
      <div className="px-4 lg:px-28">
        <ProductForm />
      </div>
    </div>
  );
}
