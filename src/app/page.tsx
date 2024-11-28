"use client";
import MediumStats from "./components/ui/stats/MediumStats";
import SmallStats from "./components/ui/stats/SmallStats";
import Header from "./components/ui/ui/Header";
import PageHeader from "./components/ui/ui/PageHeader";
import useAuth from "./hooks/useAuth";

function Home() {
  useAuth(); // Call the custom hook to check authentication

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="px-28 py-9">
        <PageHeader
          primaryRoute={"data/download"}
          primaryText={"Download data"}
        />
        <div className="mt-9 w-full flex flex-row items-start justify-evenly">
          <div className="w-2/3 flex justify-between">
            <SmallStats />
            <SmallStats />
            <SmallStats />
            <SmallStats />
            <SmallStats />
          </div>
          <div className="w-1/3 flex items-center justify-end">
            <MediumStats />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
