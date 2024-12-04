import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
        backgroundColor: "#2563EB", // Tailwind's blue-600
        borderRadius: 8, // Rounded bars
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
        display: false, // Hides the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value.toLocaleString()} $`,
          color: "#A3A3A3", // Neutral 400
        },
        grid: { color: "#1F2937" }, // Neutral 800
      },
      x: {
        ticks: { color: "#A3A3A3" }, // Neutral 400
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full bg-neutral-950 p-6 rounded-lg border-[1px] border-neutral-800">
      <h2 className="text-neutral-50 text-xl font-semibold">Overview</h2>
      <p className="text-neutral-400 mb-4">
        This is your yearly overview of your income.
      </p>
      <Bar data={data} options={chartOptions} />
    </div>
  );
}
