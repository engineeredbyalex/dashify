"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function RecentSales() {
  interface Order {
    _id: string;
    line_items: Object;
    name: string;
    email: string;
    city: string;
    postalCode: string;
    streetAddress: string;
    country: string;
    paid: boolean;
    status: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders with caching
  useEffect(() => {
    const fetchOrders = async () => {
      const cacheKey = "recentSalesCache";
      const cachedData = localStorage.getItem(cacheKey);
      const cacheExpiry = 1000 * 60 * 5; // 5 minutes

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheExpiry) {
          console.log("Using cached data");
          setOrders(data); // Use cached data
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
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="w-full bg-neutral-950 p-6 rounded-lg border-[1px] border-neutral-800">
      <h3 className="text-neutral-50">Recent sales</h3>
      <h5 className="text-neutral-600">You made {orders.length} sales.</h5>
      {orders.slice(0, 7).map((order) => (
        <div
          key={order._id}
          className="flex flex-row items-center gap-2 mt-3 justify-between"
        >
          <div className="flex flex-row items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white"></div>
            <div className="flex flex-col">
              <div className="text-base text-neutral-50">{order.name}</div>
              <p className="text-neutral-600">{order.email}</p>
            </div>
          </div>
          <h6 className="text-neutral-50">RON</h6>
        </div>
      ))}
    </div>
  );
}
