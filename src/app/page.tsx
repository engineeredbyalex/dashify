"use client";
import PageHeader from "./components/ui/PageHeader";
import Button from "./components/ui/Button";
import Header from "./components/ui/Header";
import useAuth from "./hooks/useAuth";
import RevenueStats from "./components/stats/RevenueStats";
import OrderStats from "./components/stats/OrderStats";
import YearlyOverview from "./components/graphs/YearlyOverview";
import CityStats from "./components/stats/CityStats";
import CategoryStats from "./components/stats/CategoryStats";
import RecentSales from "./components/stats/RecentSalesStats";
import ClientsStats from "./components/stats/ClientsStats";
import UserStats from "./components/stats/UserStats";

function Home() {
  useAuth();
  return (
    <div className="">
      <Header />
      <div className="px-4 lg:mx-28 mt-8">
        <PageHeader>
          <Button
            route="statistics/export"
            text="Export data"
            style="button_primary"
          />
        </PageHeader>
      </div>
      <div className="px-4 lg:mx-28 mt-8 gap-8 flex flex-col">
        <div className="gap-4 grid grid-cols-2 lg:flex">
          <RevenueStats />
          <OrderStats />
          <RevenueStats />
          <ClientsStats />
          <UserStats />
        </div>
        <div className="gap-8 flex flex-col lg:grid grid-cols-2">
          <div>
            <YearlyOverview />
          </div>
          <div className="gap-4 lg:gap-0 flex flex-col justify-between">
            <CityStats />
            <CategoryStats />
          </div>
        </div>
        <RecentSales />
      </div>
    </div>
  );
}

export default Home;
