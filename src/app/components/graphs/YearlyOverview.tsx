import axios from "axios";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function YearlyOverview() {
  const [data, setData] = useState({
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        data: Array(12).fill(0), // Initialize with zeros for each month
        borderColor: "#2563EB", // Tailwind's blue-600
        backgroundColor: "rgba(37, 99, 235, 0.3)", // Semi-transparent blue fill
        tension: 0.4, // Smooth bends in the line
        fill: true, // Fill under the line
        pointRadius: 4, // Size of points
        pointHoverRadius: 6, // Size of hovered points
        pointBackgroundColor: "#2563EB", // Point fill color
      },
    ],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        const orders = response.data;

        const monthlyIncome = Array(12).fill(0); // Array to hold income for each month

        orders.forEach(
          (order: {
            createdAt: string;
            line_items: { price: number; quantity: number }[];
          }) => {
            const orderDate = new Date(order.createdAt);
            const month = orderDate.getMonth(); // Get month (0-11)
            order.line_items.forEach(
              (item: { price: number; quantity: number }) => {
                monthlyIncome[month] += item.price * item.quantity; // Calculate income
              }
            );
          }
        );

        setData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: monthlyIncome, // Update with calculated income
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        beginAtZero: true,
        ticks: {
          callback: (tickValue: string | number) =>
            `${tickValue.toLocaleString()}`,
          color: "#525252",
        },
        grid: { color: "transparent" },
      },
      x: {
        type: "category" as const,
        ticks: { color: "#525252" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-full bg-neutral-950 p-6 rounded-lg border-[1px] border-neutral-800">
      <h2 className="text-neutral-50  font-semibold">Overview</h2>
      <h6 className="text-neutral-600 mb-4">This is your yearly Overview.</h6>
      <Line data={data} options={chartOptions} />
    </div>
  );
}
