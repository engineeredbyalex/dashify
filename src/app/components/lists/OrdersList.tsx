"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../ui/loader";
import Button from "../ui/button";
import { format } from "date-fns";

interface LineItem {
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  line_items: LineItem[];
  name: string;
  email: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  country: string;
  paid: boolean;
  status: string;
  createdAt: string;
  total: string;
  paymentStatus: string;
  paymentMethod: string;
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
    <div className="w-full flex flex-col p-4">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-8 text-neutral-50 py-2 px-4 rounded text-center">
        <p>Order Number</p>
        <p>Client Name</p>
        <p>Date</p>
        <p>Total</p>
        <p>Payment Status</p>
        <p>Payment Method</p>
        <p>Order Status</p>
        <p>Actions</p>
      </div>

      {/* Table Body */}
      {orders.map((order) => (
        <div
          key={order._id}
          className="grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-0 items-center border-b border-neutral-300 py-2 text-neutral-50 text-center"
        >
          <p className="font-medium md:truncate">{order._id}</p>
          <p className="font-medium">{order.name}</p>
          <p className="text-sm">
            {format(new Date(order.createdAt), "MMM dd, yyyy")}
          </p>
          <p className="text-sm">
            {order.line_items?.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ) || 0}
          </p>

          <p className="text-sm">{order.paymentStatus}</p>
          <p className="text-sm">{order.paymentMethod}</p>
          <p className="text-sm">{order.status}</p>
          <Button
            route={`/orders/view/${order._id}`}
            style="button_outline"
            text="View"
          />
        </div>
      ))}
    </div>
  );
}
