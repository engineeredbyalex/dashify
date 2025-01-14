"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductForm from "@/app/components/forms/ProductForm/ProductForm";
import Header from "@/app/components/ui/header";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.error("No product ID found.");
      return;
    }

    axios
      .get(`/api/products/?id=${id}`)
      .then((response) => {
        setProductInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Header />
      <div className="px-4 lg:px-28 w-full ">
        {productInfo ? (
          <div className="w-full h-full">
            <ProductForm initialData={productInfo} />
          </div>
        ) : (
          <p>Loading product information...</p>
        )}
      </div>
    </div>
  );
}
