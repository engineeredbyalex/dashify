"use client";

/* Components */
import PageHeader from "./components/ui/page-header";
import Button from "./components/ui/button";
import Header from "./components/ui/header";

/* Hooks */
import useAuth from "./hooks/useAuth";

/* Stats Components */
import RevenueStats from "./components/stats/RevenueStats";
import OrderStats from "./components/stats/OrderStats";
import ClientsStats from "./components/stats/ClientsStats";
import UserStats from "./components/stats/UserStats";
import CityStats from "./components/stats/CityStats";
import CategoryStats from "./components/stats/CategoryStats";
import RecentSales from "./components/stats/RecentSalesStats";

/* Graph Components */
import YearlyOverview from "./components/graphs/YearlyOverview";
import TopSalesStats from "./components/stats/TopProductsStats";

function Home() {
  /* Authentication Hook */
  useAuth();

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Header />
      {/* Page Header */}
      <div className="px-4 lg:mx-28 mt-8">
        <PageHeader>
          <Button
            route="statistics/export"
            text="Export data"
            style="button_primary"
          />
        </PageHeader>
      </div>
      {/* Main Content */}
      <div className="px-4 lg:mx-28 mt-8 gap-8 flex flex-col">
        {/* Stats Overview */}
        <div className="gap-4 grid grid-cols-2 lg:flex">
          <RevenueStats />
          <OrderStats />
          <ClientsStats />
          <UserStats />
        </div>
        {/* Yearly Overview and Stats */}
        <div className="gap-8 flex flex-col lg:grid grid-cols-2">
          <YearlyOverview />
          <div className="gap-4 flex flex-col justify-between lg:justify-start">
            <CityStats />
            <CategoryStats />
          </div>
        </div>
        {/* Recent Sales */}
        <RecentSales />
        <TopSalesStats />
      </div>
    </div>
  );
}

export default Home;
