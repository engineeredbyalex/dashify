import PageHeader from "../components/ui/page-header";
import Header from "../components/ui/header";
import ProductList from "../components/lists/ProductList";
import Button from "../components/ui/button";

export default function Products() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="px-4 lg:mx-28 py-9">
        <PageHeader>
          <Button
            route="categories"
            text="Manage product categories"
            style="button_outline"
          />
          <Button
            route="products/new"
            text="Create a new product"
            style="button_positive"
          />
        </PageHeader>
        <div className="mt-9">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
