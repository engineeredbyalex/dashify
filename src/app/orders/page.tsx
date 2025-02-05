import PageHeader from "../components/ui/page-header";
import Header from "../components/ui/header";
import Button from "../components/ui/button";
import OrderList from "../components/lists/OrdersList";

export default function Orders() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="px-4 lg:mx-28 py-9">
        <PageHeader>
          <Button route="/products" text="Change view" style="button_outline" />

          <Button
            route="products/new"
            text="Create a new product"
            style="button_primary"
          />
        </PageHeader>
        <div className="mt-9">
          <OrderList />
        </div>
      </div>
    </div>
  );
}
