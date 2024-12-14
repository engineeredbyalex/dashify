"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiTruck } from "react-icons/hi2";

export default function OrderStats() {
  const [orders, setOrders] = useState<any[]>([]);

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
    <div className="stat_card_small">
      <div className="w-full flex flex-row justify-between text-neutral-50">
        <p className="text-neutral-300">Total orders</p>
        <HiTruck size={16} />
      </div>
      <h3 className="text-neutral-50">{orders.length} Orders</h3>
    </div>
  );
}
