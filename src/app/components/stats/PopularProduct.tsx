"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// Uncomment and use if you intend to display images
// import Image from "next/image";

// Define interfaces for the API data
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
  photo: string;
  description?: string;
  price?: number;
}

export default function PopularProduct() {
  const [mostPopularProduct, setMostPopularProduct] = useState<{
    title: string;
    photo: string;
    orders: number;
    description?: string;
    price?: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get<Order[]>("/api/orders"),
          axios.get<Product[]>("/api/products"),
        ]);

        const orders = ordersRes.data;
        const products = productsRes.data;

        const productOrderCount: Record<string, number> = {};

        // Calculate order counts for each product
        orders.forEach((order) => {
          order.line_items.forEach((item) => {
            productOrderCount[item.productId] =
              (productOrderCount[item.productId] || 0) + item.quantity;
          });
        });

        // Find the most popular product
        let topProduct: {
          title: string;
          photo: string;
          orders: number;
          description?: string;
          price?: number;
        } | null = null;

        Object.entries(productOrderCount).forEach(([productId, count]) => {
          const product = products.find((p) => p._id === productId);
          if (product) {
            if (!topProduct || count > topProduct.orders) {
              topProduct = {
                title: product.title,
                photo: product.photo || "placeholder.jpg", // Replace with a default photo if unavailable
                orders: count,
                description: product.description,
                price: product.price,
              };
            }
          }
        });

        setMostPopularProduct(topProduct);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="stat_card text-neutral-50">
      <div className="flex flex-col">
        <h3 className="text-neutral-50 font-semibold">Most Popular Product</h3>
        <h5 className="text-neutral-50">
          The product with the highest number of orders.
        </h5>
      </div>
      {mostPopularProduct ? (
        <div className="flex flex-col items-center mt-4 text-neutral-50 p-4 rounded-lg shadow-lg">
          {/* Uncomment to display product image */}
          {/* <Image
            src={mostPopularProduct.photo}
            alt={mostPopularProduct.title}
            width={96}
            height={96}
            className="w-24 h-24 rounded-lg object-cover"
          /> */}
          <h4 className="text-lg font-bold mt-2">{mostPopularProduct.title}</h4>
          {mostPopularProduct.description && (
            <p className="text-sm text-neutral-50 mt-1">
              {mostPopularProduct.description}
            </p>
          )}
          {mostPopularProduct.price && (
            <p className="mt-2">${mostPopularProduct.price.toFixed(2)}</p>
          )}
          <p className="text-sm text-neutral-50 mt-1">
            Orders:{" "}
            <span className="font-semibold">{mostPopularProduct.orders}</span>
          </p>
        </div>
      ) : (
        <div className="text-neutral-400 mt-4">Loading popular product...</div>
      )}
    </div>
  );
}
