"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CityStats() {
  const [orders, setOrders] = useState<any[]>([]);
  const [cityStats, setCityStats] = useState<{ city: string; count: number }[]>(
    []
  );

  // Fetch orders with caching
  useEffect(() => {
    const fetchOrders = async () => {
      const cacheKey = "ordersCache";
      const cachedData = localStorage.getItem(cacheKey);
      const cacheExpiry = 1000 * 60 * 5; // 5 minutes

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheExpiry) {
          console.log("Using cached data");
          setOrders(data); // Use cached data
          calculateCityStats(data);
          return;
        }
      }

      try {
        const response = await axios.get("/api/orders");
        const data = response.data;

        // Cache the response
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data, timestamp: Date.now() })
        );

        setOrders(data); // Set the state with fetched data
        calculateCityStats(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Calculate city statistics
  const calculateCityStats = (orders: any[]) => {
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
        <h3 className="text-neutral-50  font-semibold">Overview of cities</h3>
        <h5 className="text-neutral-600">
          This is your overview of the most popular cities.
        </h5>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row">
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
        <div className="">
          <div className="w-full h-7 rounded-lg relative overflow-hidden">
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
                    .reduce(
                      (acc, { count }) => acc + getPercentage(count),
                      0
                    )}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
