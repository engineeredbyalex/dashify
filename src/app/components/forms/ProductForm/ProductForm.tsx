"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProductDetails from "./ProductDetails";
import ProductCategories from "./ProductCategories";
import ProductProperties from "./ProductProperties";
import ProductImages from "./ProductImages";
import ProductPricing from "./ProductPricing";
import PageHeader from "../../ui/page-header";

export default function ProductForm({ initialData }: any) {
  const router = useRouter();

  // State for shared fields
  const [name, setName] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price || 0);
  const [discountedPrice, setDiscountedPrice] = useState(
    initialData?.discountedPrice || 0
  );
  const [currency, setCurrency] = useState(initialData?.currency || "RON");
  const [category, setCategory] = useState(initialData?.category || "");
  const [subcategory, setSubcategory] = useState(
    initialData?.subcategory || ""
  );
  const [stock, setStock] = useState(initialData?.stock || 0);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [properties, setProperties] = useState(initialData?.properties || []);

  // Categories data fetched on mount
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productData = {
      title: name,
      description,
      price,
      discountedPrice,
      currency,
      category,
      subcategory: subcategory || null,
      stock,
      images,
      properties,
    };

    try {
      if (initialData?._id) {
        await axios.put(`/api/products/${initialData._id}`, productData);
      } else {
        await axios.post("/api/products", productData);
      }
      router.push("/products");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const deleteProduct = async (_id: string) => {
    await axios.delete(`/api/products?id=${initialData._id}`);
    console.log("Product deleted !");
  };

  return (
    <div className="mt-8 w-full flex flex-col items-start">
      <div className="w-full flex">
        <PageHeader>
          <button
            onClick={() => deleteProduct(initialData._id)}
            className="button_destructive"
          >
            Delete product
          </button>
          <button type="submit" form="productForm" className="button_primary">
            {initialData ? "Save Product" : "Create Product"}
          </button>
        </PageHeader>
      </div>
      <form
        id="productForm"
        onSubmit={handleSubmit}
        className="w-full gap-8 mt-8 flex flex-col lg:flex-row "
      >
        <section className="w-full lg:w-1/3 flex">
          <ProductImages images={images} setImages={setImages} />
        </section>
        <section className="w-full lg:w-1/3 flex flex-col">
          <ProductDetails
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
          />
          <ProductCategories
            categories={categories}
            category={category}
            setCategory={setCategory}
            subcategory={subcategory}
            setSubcategory={setSubcategory}
          />
        </section>
        <section className="w-full lg:w-1/3 flex flex-col">
          <ProductPricing
            price={price}
            setPrice={setPrice}
            discountedPrice={discountedPrice}
            setDiscountedPrice={setDiscountedPrice}
            currency={currency}
            setCurrency={setCurrency}
            stock={stock}
            setStock={setStock}
          />
          <ProductProperties
            properties={properties}
            setProperties={setProperties}
          />
        </section>
      </form>
    </div>
  );
}
