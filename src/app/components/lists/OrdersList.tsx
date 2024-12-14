"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../ui/Loader";

interface Order {
  _id: string;
  line_items: object;
  name: string;
  email: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  country: string;
  paid: boolean;
  status: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(true);
      }
    };
    fetchOrders();
  }, []);

  if (!loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {orders.map((order) => (
        <div key={order._id} className="product_list">
          <div className="text-base">Order ID: {order._id}</div>
        </div>
      ))}
    </div>
  );
}
