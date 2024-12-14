import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
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
      <h5 className="text-neutral-600">This is your yearly Overview.</h5>
      <Line data={data} options={chartOptions} />
    </div>
  );
}
