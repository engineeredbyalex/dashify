import PageHeader from "../components/ui/ui/PageHeader";
import Header from "../components/ui/ui/Header";
import ProductList from "../components/ui/ui/ProductList";

export default function Products() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="px-28 py-9">
        <PageHeader
          primaryRoute={"products/new"}
          primaryText={"Create a new product"}
        />
        <div className="mt-9">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
