"use client";
import ClientsStats from "./components/ui/stats/ClientsStats";
import MediumStats from "./components/ui/stats/ActiveUsersStats";
import OrderStats from "./components/ui/stats/OrderStats";
import RevenueStats from "./components/ui/stats/RevenueStats";
import UserStats from "./components/ui/stats/UserStats";
import Button from "./components/ui/ui/Button";
import Header from "./components/ui/ui/Header";
import PageHeader from "./components/ui/ui/PageHeader";
import useAuth from "./hooks/useAuth";
import YearlyOverview from "./components/ui/graphs/YearlyOverview";

function Home() {
  useAuth();
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="mx-28 py-9 flex flex-col">
        <PageHeader>
          <Button route="/products" text="Change view" style="button_outline" />
          <Button
            route="/products"
            text="Download data"
            style="button_primary"
          />
        </PageHeader>
        <div className="mt-9 gap-16 w-full flex">
          <div className="gap-3 flex">
            <RevenueStats />
            <OrderStats />
            <ClientsStats />
            <UserStats />
            <UserStats />
          </div>
          <div className="w-full flex ">
            <MediumStats />
          </div>
        </div>
        <div className="w-2/3 flex mt-9">
          <YearlyOverview />
        </div>
      </div>
    </div>
  );
}

export default Home;
