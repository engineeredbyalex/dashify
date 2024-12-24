"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import { HiStar } from "react-icons/hi2";
import { HiCurrencyDollar } from "react-icons/hi2";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  views: string;
  saves: string;
  orders: string;
  reviews: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 5;

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
          setTotalPages(Math.ceil(data.length / itemsPerPage));
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
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setLoading(true); // Set loading to true after fetching
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (!loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Pagination logic
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full flex flex-col">
      <div className="w-full gap-4 flex flex-col">
        {paginatedProducts?.length > 0 ? (
          paginatedProducts.map((product) => (
            <div key={product._id} className="product_list">
              <div className="w-full flex gap-4">
                {/* Product Image */}
                <div className="w-14 h-14 lg:w-16 lg:h-16">
                  <Image
                    width={64}
                    height={64}
                    src={product.images[0]}
                    alt={`Image of ${product.title}`}
                    className="rounded-lg"
                  />
                </div>
                {/* Product Image */}
                {/* Produtct Info */}
                <div>
                  <h5>{product.title}</h5>
                  <div className="flex  items-center justify-between">
                    <div className="flex gap-1 items-center">
                      <HiCurrencyDollar className="fill-neutral-50" size={20} />
                      <h6>{product.price.toFixed(2)} RON</h6>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <h6>{product.price.toFixed(2)} RON</h6>
                    </div>
                    {!product.reviews ? (
                      <div className="flex gap-1 items-center">
                        <HiStar className="fill-yellow-500" size={20} />
                        <h6>Reviews : {product.reviews}</h6>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* Produtct Info */}
              </div>
              <div className="w-full lg:w-1/3">
                <div className="w-full mt-4">
                  <Button
                    route={`/products/edit/${product._id}`}
                    text="Edit product"
                    style="button_postive"
                  />
                </div>
                <div className="w-full flex flex-row justify-between mt-4">
                  {!product.views ? (
                    <div className="flex gap-1">
                      <HiStar className="fill-yellow-500" size={20} />
                      <h6>{product.views} views</h6>
                    </div>
                  ) : (
                    ""
                  )}
                  {!product.orders ? (
                    <div className="flex gap-1">
                      <HiStar className="fill-yellow-500" size={20} />
                      <h6>{product.orders} orders</h6>
                    </div>
                  ) : (
                    ""
                  )}
                  {!product.saves ? (
                    <div className="flex gap-1">
                      <HiStar className="fill-yellow-500" size={20} />
                      <h6>{product.saves} saves</h6>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-500 text-center">No products available.</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex flex-row justify-between items-center mt-4">
        <button
          className="w-9 h-9 px-10 bg-blue-600 rounded-lg text-neutral-50"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          <h6>Prev</h6>
        </button>
        <h6 className="text-neutral-500">
          Page {currentPage} of {totalPages}
        </h6>
        <button
          className="w-9 h-9 px-10 bg-blue-600 rounded-lg text-neutral-50"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          <h6>Next</h6>
        </button>
      </div>
    </div>
  );
}
