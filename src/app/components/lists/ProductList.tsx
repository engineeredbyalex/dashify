"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products with caching
  useEffect(() => {
    const fetchProducts = async () => {
      const cacheKey = "productListCache";
      const cachedData = localStorage.getItem(cacheKey);
      const cacheExpiry = 1000 * 60 * 10; // 10 minutes

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheExpiry) {
          console.log("Using cached product data");
          setProducts(data); // Use cached data
          setLoading(true); // Set loading to true to render the data
          return;
        }
      }

      setLoading(false); // Start loading when fetching new data

      try {
        const response = await axios.get("/api/products");
        const data = response.data;

        // Cache the response
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data, timestamp: Date.now() })
        );

        setProducts(data); // Set the state with fetched data
        setLoading(true); // Set loading to true after fetching
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once

  if (!loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {products.map((product) => (
        <div key={product._id} className="product_list">
          <div className="gap-8 flex flex-row items-center">
            <div className="gap-4 flex flex-row items-center">
              <div className="w-10 h-10 bg-white"></div>
              <div className="text-base">{product.name}</div>
            </div>
            <div className="gap-4 flex flex-row">
              <div>Price: {product.price.toFixed(2)} RON</div>
              <div>Discounted price: {product.price.toFixed(2)} RON</div>
              <div>Stock: {product.stock} Units</div>
            </div>
          </div>
          <Button
            route={"/products/edit/" + product._id}
            text="Edit the product"
            style="button_postive"
          />
        </div>
      ))}
    </div>
  );
}
