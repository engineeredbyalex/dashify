"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("/api/products", {
        name,
        description,
        price,
        category,
        stock,
        images,
      });
      router.push("/products");
    } catch (error) {
       console.log(error);
      setError("Failed to create product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Create Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Image URLs (comma separated)"
        value={images.join(",")}
        onChange={(e) => setImages(e.target.value.split(","))}
      />
      <button type="submit">Create Product</button>
    </form>
  );
}
