"use client";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { HiCurrencyDollar } from "react-icons/hi2";

interface LineItem {
  price: number;
  quantity: number;
}

interface Order {
  createdAt: string;
  line_items: LineItem[];
}

export default function RevenueStats() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

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
  }, []);

  // Recalculate revenue when `orders` state changes
  useEffect(() => {
    const calculateTotalRevenue = () => {
      let total = 0;
      const currentYear = moment().year();
      orders.forEach((order) => {
        if (moment(order.createdAt).year() === currentYear) {
          // Check if the order is from the current year
          order.line_items.forEach((item) => {
            const price = item.price;
            const quantity = item.quantity;
            if (!isNaN(price) && !isNaN(quantity)) {
              total += price * quantity; // Calculate revenue
            } else {
              // console.error("Invalid price or quantity for item:", item);
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
        <HiCurrencyDollar size={16} />
      </div>
      <h3 className="text-neutral-50">{totalRevenue.toFixed(2)} RON</h3>
    </div>
  );
}
