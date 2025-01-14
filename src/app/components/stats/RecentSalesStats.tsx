"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function RecentSales() {
  interface Order {
    _id: string;
    name: string;
    email: string;
    line_items: { productId: string; quantity: number }[];
  }

  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full bg-neutral-950 px-6 py-6 rounded-lg border-[1px] border-neutral-800">
      <h3 className="text-neutral-50">Recent Sales</h3>
      <h6 className="text-neutral-600">You made {orders.length} sales.</h6>
      <div className="w-full gap-4 mt-4 flex flex-col xl:grid grid-cols-3">
        {orders.slice(0, 7).map((order) => (
          <div
            key={order._id}
            className="w-full border-[1px] border-neutral-800  px-2 py-1 rounded-lg flex flex-row items-center justify-between"
          >
            <div className="w-full gap-2 flex flex-row  items-center justify-between">
              <div className="gap-2 flex flex-row items-center">
                <div className="w-10 h-10 rounded-full bg-white"></div>
                <div className="w-3/4 flex flex-col">
                  <h5 className="text-neutral-50">{order.name}</h5>
                  <h6 className="text-neutral-400">{order.email}</h6>
                </div>
              </div>
              <div className="w-1/4 flex flex-col items-end justify-start">
                <h6 className="text-neutral-50">300 RON</h6>
                <p className="text-neutral-400">5 Orders</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
