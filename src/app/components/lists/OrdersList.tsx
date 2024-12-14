"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../ui/Loader";

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

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const fetchOrders = async () => {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
      setLoading(true);
    };
    fetchOrders();
  }, []);
  if (loading === false) {
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
          <div className="text-base">Order ID : {order._id}</div>
        </div>
      ))}
    </div>
  );
}
