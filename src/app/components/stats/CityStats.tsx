"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface Order {
  _id: string;
  city: string;
}

export default function CityStats() {
  const [cityStats, setCityStats] = useState<{ city: string; count: number }[]>(
    []
  );

  // Fetch orders with caching
  useEffect(() => {
    const fetchAndCalculateCityStats = async () => {
      const cacheKey = "ordersCache";
      const cachedData = localStorage.getItem(cacheKey);
      const cacheExpiry = 1000 * 60 * 5; // 5 minutes

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheExpiry) {
          console.log("Using cached data");
          calculateCityStats(data as Order[]);
          return;
        }
      }

      try {
        const response = await axios.get("/api/orders");
        const data: Order[] = response.data;

        // Cache the response
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data, timestamp: Date.now() })
        );

        calculateCityStats(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAndCalculateCityStats();
  }, []);

  // Calculate city statistics
  const calculateCityStats = (orders: Order[]) => {
    const cityCount: Record<string, number> = {};

    orders.forEach((order) => {
      const city = order.city;
      cityCount[city] = (cityCount[city] || 0) + 1;
    });

    const sortedCities = Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    setCityStats(sortedCities);
  };

  // Calculate total for top 3 cities
  const topCitiesTotal = cityStats.reduce(
    (total, { count }) => total + count,
    0
  );
  const getPercentage = (count: number) =>
    topCitiesTotal > 0 ? (count / topCitiesTotal) * 100 : 0;

  return (
    <div className="stat_card text-neutral-50">
      <div className="flex flex-col">
        <h3 className="text-neutral-50 font-semibold">Overview Of Cities</h3>
        <h6 className="text-neutral-600">
          This is your overview of the most popular cities.
        </h6>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row">
          {cityStats.map(({ city }, index) => (
            <div
              key={city}
              className="w-full justify-start items-center flex flex-row"
            >
              <span className="w-full flex items-center justify-start gap-1">
                <div
                  key={city}
                  className={`w-3 h-3 rounded-full ${
                    index === 0
                      ? "bg-blue-600"
                      : index === 1
                      ? "bg-blue-400"
                      : "bg-blue-200"
                  }`}
                ></div>
                {city}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full h-7 rounded-lg relative overflow-hidden mt-2">
          {cityStats.map(({ city, count }, index) => (
            <div
              key={city}
              className={`absolute top-0 h-full ${
                index === 0
                  ? "bg-blue-600"
                  : index === 1
                  ? "bg-blue-400"
                  : "bg-blue-200"
              }`}
              style={{
                width: `${getPercentage(count)}%`,
                left: `${cityStats
                  .slice(0, index)
                  .reduce((acc, { count }) => acc + getPercentage(count), 0)}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
