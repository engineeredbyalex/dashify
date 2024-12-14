"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TopSalesStats() {
  interface LineItem {
    productId: string;
    quantity: number;
  }

  interface Order {
    _id: string;
    line_items: LineItem[];
  }

  interface Product {
    _id: string;
    title: string;
    price: number;
    images: string[];
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [topProducts, setTopProducts] = useState<
    { productId: string; count: number }[]
  >([]);
  const productsPerPage = 3;

  // Fetch orders and products data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>("/api/orders/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("/api/products/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchOrders();
    fetchProducts();
  }, []);

  // Calculate the count of products sold
  useEffect(() => {
    if (orders.length > 0) {
      const productCounts: Record<string, number> = {};

      orders.forEach((order) => {
        order.line_items.forEach((item) => {
          const { productId } = item;
          if (productId) {
            productCounts[productId] = (productCounts[productId] || 0) + 1;
          }
        });
      });

      const sortedCounts = Object.entries(productCounts)
        .map(([productId, count]) => ({ productId, count }))
        .sort((a, b) => b.count - a.count);

      setTopProducts(sortedCounts);
    }
  }, [orders]);

  // Get products for the first page (since pagination is not fully implemented)
  const currentProducts = topProducts.slice(0, productsPerPage);

  return (
    <div className="w-full bg-zinc-900 px-4 py-4 rounded-lg flex flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="font-title font-medium text-zinc-100">Top Products</h2>
        <p className="font-body text-zinc-300">
          These are the top-selling products based on the number of orders.
        </p>
      </div>
      <div className="gap-6 flex flex-col">
        {currentProducts.map(({ productId, count }) => {
          const product = products.find((p) => p._id === productId);

          if (!product) return null;

          return (
            <div className="flex gap-3" key={productId}>
              {product.images?.length > 0 && (
                <Image
                  src={product.images[0]}
                  alt={product.title || "Product Image"}
                  width={64}
                  height={64}
                  className="object-cover rounded-lg"
                />
              )}
              <div className="flex flex-col">
                <h4 className="text-zinc-300 font-medium">
                  {product.title || "Unknown"}
                </h4>
                <h5 className="text-zinc-400">Total Sales: {count}</h5>
                <p className="text-zinc-400">
                  Price:{" "}
                  {product.price
                    ? `${product.price.toFixed(2)} RON`
                    : "Unknown"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
