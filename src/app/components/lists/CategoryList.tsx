"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  parent?: string; // Parent ID or undefined for root categories
  properties?: Record<string, any>;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, Category[]>>(
    {}
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        const fetchedCategories: Category[] = response.data;

        // Map parent ID to child categories
        const map: Record<string, Category[]> = {};
        fetchedCategories.forEach((category) => {
          const parentId = category.parent || "root";
          if (!map[parentId]) {
            map[parentId] = [];
          }
          map[parentId].push(category);
        });

        setCategories(fetchedCategories);
        setCategoryMap(map);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Function to handle deletion of a category or subcategory
  const deleteCategory = async (id: string) => {
    try {
      // Send delete request to the API
      await axios.delete(`/api/category?id=${id}`);

      // Update local state by filtering out the deleted category
      const updatedCategories = categories.filter((cat) => cat._id !== id);
      setCategories(updatedCategories);

      // Rebuild the category map
      const map: Record<string, Category[]> = {};
      updatedCategories.forEach((category) => {
        const parentId = category.parent || "root";
        if (!map[parentId]) {
          map[parentId] = [];
        }
        map[parentId].push(category);
      });

      setCategoryMap(map);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <section className="w-full gap-4 flex flex-col">
      <div className="gap-2 flex flex-col text-neutral-50">
        {/* Loop through root categories */}
        {categoryMap["root"]?.map((parent) => (
          <div key={parent._id} className="mb-4">
            <h3 className="font-bold flex items-center justify-between">
              {parent.name}
              <button
                className="text-red-500 hover:underline"
                onClick={() => deleteCategory(parent._id)}
              >
                Delete
              </button>
            </h3>

            {/* Loop through subcategories */}
            <ul className="pl-4">
              {categoryMap[parent._id]?.map((child) => (
                <li
                  key={child._id}
                  className="flex items-center justify-between"
                >
                  {child.name}
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => deleteCategory(child._id)}
                  >
                    Delete Subcategory
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
