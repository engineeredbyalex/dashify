"use client";
// Import necessary modules and components
import { useState, useEffect } from "react";
// Importing axios
import axios from "axios";
// Importing Image module
import Image from "next/image";
// Importing icons 
import { HiStar, HiTruck, HiHeart } from "react-icons/hi2";

// TopSalesStats component displays the most popular products based on sales
export default function TopSalesStats() {
  // Defining the Order Interface
  interface Order {
    _id: string;
    name: string;
    email: string;
    line_items: { productId: string; quantity: number }[];
  }

  // State variables to manage orders, products, and top products
 const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // Number of products to display per page
  const productsPerPage = 7;

  // Fetch orders and products data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, productsResponse] = await Promise.all([
          axios.get("/api/orders/"),
          axios.get("/api/products/"),
        ]);
        setOrders(ordersResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate top products based on order quantities
  useEffect(() => {
    const calculateTopProducts = () => {
      const productCounts = {};

      orders.forEach((order) => {
        order.line_items.forEach(({ productId, quantity }) => {
          productCounts[productId] = (productCounts[productId] || 0) + quantity;
        });
      });

      const sortedCounts = Object.entries(productCounts)
        .map(([productId, count]) => ({ productId, count }))
        .sort((a, b) => b.count - a.count);

      setTopProducts(sortedCounts);
    };

    if (orders.length) calculateTopProducts();
  }, [orders]);

  // Slice the top products for the current page
  const currentProducts = topProducts.slice(0, productsPerPage);

  return (
    <div className="w-full bg-neutral-950 p-6 rounded-lg border-[1px] border-neutral-800">
      <h2 className="text-neutral-50 font-semibold">Top product sales</h2>
      <h6 className="text-neutral-600 mb-4">
        These are the most popular products based on orders.
      </h6>
      <div className="gap-6 flex flex-col lg:grid grid-cols-2">
        {currentProducts.map(({ productId, count }) => {
          const product = products.find((p) => p._id === productId);
          if (!product) return null;

          return (
            <div
              className="py-3 px-3 gap-3 border-b-[1px] border-neutral-800 flex flex-col lg:flex-row"
              key={productId}
            >
              {product.images?.length > 0 && (
                <Image
                  src={product.images[0]}
                  alt={product.title || "Product Image"}
                  width={56}
                  height={56}
                  className="object-cover rounded-lg"
                />
              )}
              <div className="gap-2 flex flex-col">
                <h4 className="text-neutral-50">
                  {product.title || "Unknown"}
                </h4>
                <div className="gap-2 lg:gap-4 text-neutral-50 flex flex-col lg:flex-row">
                  <div className="gap-1 text-neutral-200 font-base flex flex-row items-center">
                    <HiTruck size={16} className="fill-green-600" />
                    Total orders: {count}
                  </div>
                  <div className="gap-1 text-neutral-200 font-base flex flex-row items-center">
                    <HiStar size={16} className="fill-yellow-500" />
                    Rating: {count}
                  </div>
                  <div className="gap-1 text-neutral-200 font-base flex flex-row items-center">
                    <HiHeart size={16} className="fill-red-500" />
                    Total saves: {count}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
