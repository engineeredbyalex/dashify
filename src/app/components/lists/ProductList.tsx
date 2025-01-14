"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../ui/button";
import Loader from "../ui/loader";
import { HiOutlineRefresh, HiCurrencyDollar, HiStar } from "react-icons/hi";
import Image from "next/image";

// Product interface to define the structure of product data
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
  // State variables for products, filters, and pagination
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Filtering states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStock, setSelectedStock] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  const itemsPerPage = 9;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(false);
      try {
        const response = await axios.get("/api/products");
        const data = response.data;
        setProducts(data);
        setFilteredProducts(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setLoading(true);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(category, selectedStock, selectedPrice);
  };

  // Handle stock filter
  const handleStockChange = (stock: string) => {
    setSelectedStock(stock);
    filterProducts(selectedCategory, stock, selectedPrice);
  };

  // Handle price filter
  const handlePriceChange = (price: string) => {
    setSelectedPrice(price);
    filterProducts(selectedCategory, selectedStock, price);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedStock("All");
    setSelectedPrice("");
    setFilteredProducts(products);
  };

  // Filter products based on criteria
  const filterProducts = (category: string, stock: string, price: string) => {
    let filtered = [...products];

    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (stock === "In Stock") {
      filtered = filtered.filter((product) => product.stock > 0);
    } else if (stock === "Out of Stock") {
      filtered = filtered.filter((product) => product.stock === 0);
    }

    if (price === "Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (price === "High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full flex flex-col">
      {/* Filters */}
      <div className="w-full gap-4 mb-9 flex flex-col lg:flex-row items-center justify-between">
        {/* Category Filter */}
        <div className="w-full lg:w-2/3 gap-4 flex flex-col lg:flex-row items-center justify-start">
          {/* <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="dropdown"
          >
            <option value="All">Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select> */}

          {/* Stock Filter */}
          <select
            value={selectedStock}
            onChange={(e) => handleStockChange(e.target.value)}
          >
            <option value="All">Stock</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* Price Filter */}
          <select
            value={selectedPrice}
            onChange={(e) => handlePriceChange(e.target.value)}
          >
            <option value="">Price</option>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>
        {/* Reset Filters Button */}
        <div className="w-full lg:w-1/3 flex justify-end items-center">
          <button onClick={resetFilters} className="button_outline">
            <HiOutlineRefresh size={18} />
            <span className="ml-2">Reset all filters</span>
          </button>
        </div>
      </div>
      {/* Product List */}
      <div className="w-full grid grid-cols-1 gap-4">
        {loading ? (
          paginatedProducts.map((product) => (
            <div key={product._id} className="product_list">
              <div className="w-full flex gap-4">
                <div className="w-20 h-20 lg:w-16 lg:h-16">
                  <Image
                    width={64}
                    height={64}
                    src={product.images[0]}
                    alt={`Image of ${product.title}`}
                    className="rounded-lg"
                  />
                </div>
                <div className="w-full lg:w-auto">
                  <h5>{product.title}</h5>
                  <div className="gap-4 flex justify-start items-center">
                    <div className="gap-1 flex items-center justify-center">
                      <HiCurrencyDollar size={12} />
                      <h6>{product.price.toFixed(2)} RON</h6>
                    </div>
                    <div className="gap-1 flex items-center justify-center">
                      <div
                        className={`w-2 h-2 ${
                          product.stock > 0 ? "bg-green-600" : "bg-red-600"
                        } rounded-full`}
                      />
                      <h6>{product.stock > 0 ? "In Stock" : "Out of Stock"}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/4 flex items-center justify-end">
                <Button
                  route={`/products/edit/${product._id}`}
                  text="Edit product"
                  style="button_secondary"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center  ">
            <Loader />
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="button_outline w-auto"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-neutral-50 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="button_outline w-auto"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
