"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function RecentSales() {
  interface Order {
    _id: string;
    line_items: Object;
    name: String;
    email: String;
    city: String;
    postalCode: String;
    streetAddress: String;
    country: String;
    paid: Boolean;
    status: String;
  }

  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Helper function to calculate total price
  const calculateTotalPrice = (
    line_items: { price: number; quantity: number }[]
  ) => {
    return line_items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="w-full bg-neutral-950 p-6 rounded-lg border-[1px] border-neutral-800">
      <h3 className="text-neutral-50">Recent sales</h3>
      <h5 className="text-neutral-600">You made {orders.length} sales.</h5>
      {orders.slice(0, 10).map((order) => (
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
          <h6 className="text-neutral-50">
            {calculateTotalPrice(
              order.line_items as { price: number; quantity: number }[]
            ).toFixed(2)}{" "}
            RON
          </h6>
        </div>
      ))}
    </div>
  );
}
