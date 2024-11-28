"use client";
import axios from "axios";
import { useState, useEffect } from "react";

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

  // const deleteProduct = async (id: string) => {
  //   try {
  //     await axios.delete(`/api/products?id=${id}`);
  //     setProducts(products.filter((product) => product._id !== id));
  //   } catch (error) {
  //     console.error("Failed to delete product.");
  //   }
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full flex flex-col">
      {products.map((product) => (
        <div key={product._id} className="product_list">
          <div className="gap-8 flex flex-row items-center">
            <div className="gap-4 flex flex-row items-center ">
              <div className="w-10 h-10 bg-white"></div>
              <div className="text-base">{product.name}</div>
            </div>
            <div className="gap-4 flex flex-row">
              <div>Price : {product.price.toFixed(2)} RON</div>
              <div>Disscounted price : {product.price.toFixed(2)} RON</div>
              <div>Stock : {product.stock} Units</div>
            </div>
          </div>
          <button className="button_postive">Edit the product</button>
        </div>
      ))}
    </div>
  );
}
