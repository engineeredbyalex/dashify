"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiTruck } from "react-icons/hi2";

export default function OrderStats() {
  const [orders, setOrders] = useState([]);

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

  return (
    <div className="stat_card_small">
      <div className="w-full flex flex-row justify-between text-neutral-50">
        <p className="text-neutral-300">Total orders</p>
        <HiTruck size={12} />
      </div>
      <h3 className="text-neutral-50"> {orders.length} Orders</h3>
    </div>
  );
}
