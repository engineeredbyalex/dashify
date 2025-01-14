"use client";
import PageHeader from "@/app/components/ui/page-header";
import Header from "@/app/components/ui/header";
import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  parent: string; // Parent ID or undefined for root categories
}

export default function CreateNewTask() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [parentId, setParentId] = useState("");

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

  // Handle category name change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const addParentCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setParentId(selectedValue);
    console.log("Selected Parent ID:", selectedValue);
  };
  // Submit the category and subcategories
  const handleSubmit = async () => {
    const newCategory = {
      name: category,
      parent: parentId,
    };

    try {
      const response = await axios.post("/api/category/", newCategory);
      console.log("Category created successfully:", response.data);
      // Optionally reset form after submission
      setCategory("");
      setParentId("");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="px-4 lg:mx-28 py-9">
        <PageHeader>
          <button className="text-neutral-50" onClick={handleSubmit}>
            Save category
          </button>
        </PageHeader>

        <div className="mt-9 gap-6 flex flex-col ">
          <div className="w-64 gap-3 flex flex-col">
            <label>Category Parent</label>
            <select value={parentId} onChange={addParentCategory}>
              <option value="">Select parent category</option>
              {categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-64 gap-3 flex flex-col">
            <label>Category name</label>
            <input
              placeholder="Category name..."
              value={category}
              onChange={handleCategoryChange}
              className="border px-2 py-1 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
