import PageHeader from "../components/ui/PageHeader";
import Header from "../components/ui/Header";
import ProductList from "../components/lists/ProductList";
import Button from "../components/ui/Button";

export default function Products() {
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
        <div className="mt-9">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
