"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OrderStats() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  });

  return (
    <div className="stat_card_small">
      <div className="w-full flex flex-row justify-between text-neutral-50">
        <p className="text-neutral-300">Total orders</p>
      </div>
      <h3 className="text-neutral-50"> {orders.length} Orders</h3>
    </div>
  );
}
