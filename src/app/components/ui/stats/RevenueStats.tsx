"use client";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

interface LineItem {
  price: number; // Ensure this is a number
  quantity: number; // Ensure this is a number
}

interface Order {
  createdAt: string; // or Date if you are using Date objects
  line_items: LineItem[];
}

export default function RevenueStats() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    axios
      .get("api/orders/")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  });

  useEffect(() => {
    const calculateTotalRevenue = () => {
      let total = 0;
      const currentYear = moment().year();
      orders.forEach((order) => {
        if (moment(order.createdAt).year() === currentYear) {
          // Check if the order is from the current year
          order.line_items.forEach((item) => {
            const price = item.price; // No need to parse if it's already a number
            const quantity = item.quantity; // No need to parse if it's already a number
            if (!isNaN(price) && !isNaN(quantity)) {
              total += price * quantity; // Calculate revenue
            } else {
              console.error("Invalid price or quantity for item:", item);
            }
          });
        }
      });
      setTotalRevenue(total);
    };
    calculateTotalRevenue();
  }, [orders]);

  return (
    <div className="stat_card_small">
      <div className="w-full flex flex-row justify-between text-neutral-50">
        <p className="text-neutral-300">Total revenue</p>
      </div>
      <h3 className="text-neutral-50"> {totalRevenue.toFixed(2)} RON</h3>

    </div>
  );
}
