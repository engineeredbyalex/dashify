"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface LineItem {
  productId: string;
  quantity: number;
}

interface Order {
  line_items: LineItem[];
}

interface Product {
  _id: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function CategoryStats() {
  const [categoryStats, setCategoryStats] = useState<
    { categoryName: string; count: number }[]
  >([]);

  // Fetch data and calculate stats
  useEffect(() => {
    const fetchDataAndCalculateStats = async () => {
      try {
        const [ordersRes, categoriesRes, productsRes] = await Promise.all([
          axios.get("/api/orders"),
          axios.get("/api/category"),
          axios.get("/api/products"),
        ]);

        const orders: Order[] = ordersRes.data;
        const categories: Category[] = categoriesRes.data;
        const products: Product[] = productsRes.data;

        const categoryCount: Record<string, number> = {};

        // Calculate category counts
        orders.forEach((order) => {
          order.line_items.forEach((item) => {
            const product = products.find(
              (prod) => prod._id === item.productId
            );

            if (product) {
              const category = categories.find(
                (cat) => cat._id === product.category
              );

              if (category) {
                categoryCount[category.name] =
                  (categoryCount[category.name] || 0) + item.quantity;
              }
            }
          });
        });

        // Sort and store top 3 categories
        const sortedCategories = Object.entries(categoryCount)
          .map(([categoryName, count]) => ({ categoryName, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);

        setCategoryStats(sortedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndCalculateStats();
  }, []);

  // Calculate total for top 3 categories
  const topCategoriesTotal = categoryStats.reduce(
    (total, { count }) => total + count,
    0
  );

  const getPercentage = (count: number) =>
    topCategoriesTotal > 0 ? (count / topCategoriesTotal) * 100 : 0;

  return (
    <div className="stat_card text-neutral-50">
      <div className="flex flex-col">
        <h3 className="text-neutral-50 font-semibold">
          Top Product Categories
        </h3>
        <h5 className="text-neutral-600">
          This is your overview of the most popular categories.
        </h5>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col lg:flex-row">
          {categoryStats.map(({ categoryName }, index) => (
            <div
              key={categoryName}
              className="w-full justify-start items-center flex flex-row"
            >
              <span className="w-full flex items-center justify-start gap-1">
                <div
                  key={categoryName}
                  className={`w-3 h-3 rounded-full ${
                    index === 0
                      ? "bg-blue-600"
                      : index === 1
                      ? "bg-blue-400"
                      : "bg-blue-200"
                  }`}
                ></div>
                {categoryName}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full h-7 rounded-lg relative overflow-hidden mt-2">
          {categoryStats.map(({ categoryName, count }, index) => (
            <div
              key={categoryName}
              className={`absolute top-0 h-full ${
                index === 0
                  ? "bg-blue-600"
                  : index === 1
                  ? "bg-blue-400"
                  : "bg-blue-200"
              }`}
              style={{
                width: `${getPercentage(count)}%`,
                left: `${categoryStats
                  .slice(0, index)
                  .reduce((acc, { count }) => acc + getPercentage(count), 0)}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
