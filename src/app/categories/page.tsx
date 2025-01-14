import PageHeader from "../components/ui/page-header";
import Header from "../components/ui/header";
import Button from "../components/ui/button";
import CategoryList from "../components/lists/CategoryList";

export default function Categories() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="px-4 lg:mx-28 py-9">
        <PageHeader>
          <Button
            route="categories/new"
            text="Create a new category"
            style="button_positive"
          />
        </PageHeader>
        <div className="mt-9">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}
