"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { storage } from "@/app/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setImages(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const uploadImages = async () => {
    const imageUrls: string[] = [];
    for (const image of images) {
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }
    return imageUrls;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const imageUrls = await uploadImages();
      await axios.post("/api/products", {
        name,
        description,
        price,
        category,
        stock,
        images: imageUrls,
      });
      router.push("/products");
    } catch (error) {
      console.log(error);
      setError("Failed to create product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Create Product</h1>
      {error && <div className="text-red-500">{error}</div>}

      {/* Product Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2"
          placeholder="Enter product name"
        />
      </div>

      {/* Product Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2"
          placeholder="Enter product description"
        />
      </div>

      {/* Product Price */}
      <div className="flex flex-col gap-2">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="border rounded p-2"
          placeholder="Enter product price"
        />
      </div>

      {/* Product Category */}
      <div className="flex flex-col gap-2">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2"
          placeholder="Enter product category"
        />
      </div>

      {/* Product Stock */}
      <div className="flex flex-col gap-2">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value, 10))}
          className="border rounded p-2"
          placeholder="Enter product stock"
        />
      </div>

      {/* Product Images */}
      <div className="flex flex-col gap-2">
        <label htmlFor="images">Images</label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleImageChange}
          className="border rounded p-2"
        />
        {imagePreviews.length > 0 && (
          <div className="flex gap-2">
            {imagePreviews.map((preview, index) => (
              <Image
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                width={64}
                height={64}
                className="object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Product
      </button>
    </form>
  );
}
