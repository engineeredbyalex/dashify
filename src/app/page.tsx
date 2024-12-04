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
import RecentSales from "./components/ui/stats/RecentSales";

function Home() {
  useAuth();
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="mx-14  lg:mx-28 py-9 flex flex-col">
        <PageHeader>
          <Button route="/products" text="Change view" style="button_outline" />
          <Button
            route="/products"
            text="Download data"
            style="button_primary"
          />
        </PageHeader>
        <div className="mt-9 gap-3 lg:gap-16 w-full flex flex-col">
          <div className="gap-3 w-full flex flex-col lg:flex-row">
            <RevenueStats />
            <OrderStats />
            <ClientsStats />
            <UserStats />
          </div>
          <div className="w-full flex ">
            <MediumStats />
          </div>
        </div>
        <div className="w-full gap-8 lg:gap-16 flex mt-9 flex-col lg:flex-row">
          <div className="w-full lg:w-2/3">
            <YearlyOverview />
          </div>
          <div className="w-full lg:w-1/3 h-full">
            <RecentSales />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
