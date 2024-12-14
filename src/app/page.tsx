"use client";
import YearlyOverview from "./components/graphs/YearlyOverview";
import CategoryStats from "./components/stats/CategoryStats";
import CityStats from "./components/stats/CityStats";
import ClientsStats from "./components/stats/ClientsStats";
import OrderStats from "./components/stats/OrderStats";
import PopularProduct from "./components/stats/PopularProduct";
import RecentSales from "./components/stats/RecentSalesStats";
import RevenueStats from "./components/stats/RevenueStats";
import UserStats from "./components/stats/UserStats";
import Header from "./components/ui/Header";
import PageHeader from "./components/ui/PageHeader";
import useAuth from "./hooks/useAuth";

function Home() {
  useAuth();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <Header />
      <div className="w-full h-auto flex flex-col gap-9 mt-5">
        <div className="px-4 lg:px-28">
          <PageHeader />
        </div>
        <div className="px-4 lg:px-28 gap-5 flex flex-col">
          <div className="w-full  gap-5 flex">
            <RevenueStats />
            <OrderStats />
          </div>
          <div className="w-full  gap-5 flex">
            <ClientsStats />
            <UserStats />
          </div>
        </div>
        <div className="px-4 lg:px-28 gap-5 flex flex-col">
          <CityStats />
          <CategoryStats />
          <PopularProduct />
          <YearlyOverview />
          <RecentSales />
        </div>
      </div>
    </div>
  );
}

export default Home;


