"use client";

import { useState, FormEvent, DragEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { storage } from "@/app/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PageHeader from "../ui/PageHeader";

interface ProductFormProps {
  initialData?: {
    _id?: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
  };
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const [name, setName] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price || 0);
  const [category, setCategory] = useState(initialData?.category || "");
  const [stock, setStock] = useState(initialData?.stock || 0);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialData?.images || []
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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
      const productData = {
        title: name,
        description,
        price,
        category,
        stock,
        images: imageUrls,
      };

      if (initialData?._id) {
        await axios.put(`/api/products/${initialData._id}`, productData);
      } else {
        await axios.post("/api/products", productData);
      }

      router.push("/products");
    } catch (error) {
      console.log(error);
      setError("Failed to save product.");
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null) {
      const updatedImages = [...imagePreviews];
      const [removed] = updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(index, 0, removed);
      setImagePreviews(updatedImages);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="mt-8 w-full flex flex-col items-start ">
      <PageHeader>
        {/* <button type="submit" className="button_primary">
            {initialData ? "Save Product" : "Create Product"}
          </button> */}
      </PageHeader>
      <form
        onSubmit={handleSubmit}
        className="w-full gap-8 mt-8 flex flex-col-reverse"
      >
        <div className="gap-4 w-full flex flex-col">
          <div className="flex flex-col gap-1">
            <label>Product name</label>
            <input
              type="text"
              name="title"
              placeholder="Product name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product description</label>
            <input
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product category</label>
            <input
              type="text"
              name="category"
              placeholder="Product category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product sub category</label>
            <input
              type="text"
              name="subcategory"
              placeholder="Product sub category"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product code</label>
            <input type="text" name="code" placeholder="Product code" />
          </div>
        </div>
        <div className="gap-4 w-full flex flex-col">
          <div className="flex flex-col gap-1">
            <label>Product name</label>
            <input type="text" name="title" placeholder="Product name" />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product description</label>
            <input
              type="text"
              name="description"
              placeholder="Product description"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product category</label>
            <input type="text" name="category" placeholder="Product category" />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product sub category</label>
            <input
              type="text"
              name="subcategory"
              placeholder="Product sub category"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product code</label>
            <input type="text" name="code" placeholder="Product code" />
          </div>
        </div>
        <div className="gap-4 w-full flex flex-col">
          <div className="flex flex-col gap-1">
            <label>Product name</label>
            <input type="text" name="title" placeholder="Product name" />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product description</label>
            <input
              type="text"
              name="description"
              placeholder="Product description"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product category</label>
            <input type="text" name="category" placeholder="Product category" />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product sub category</label>
            <input
              type="text"
              name="subcategory"
              placeholder="Product sub category"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product code</label>
            <input type="text" name="code" placeholder="Product code" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          {imagePreviews.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="w-full h-full">
                <img
                  key={0}
                  src={imagePreviews[0]}
                  alt={`Preview 0`}
                  // layout="responsive"

                  className="object-cover rounded w-full"
                />
              </div>
              <div className="flex gap-2">
                {imagePreviews.slice(1).map((preview, index) => (
                  <div
                    key={index + 1}
                    draggable
                    onDragStart={() => handleDragStart(index + 1)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index + 1)}
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label>Add images</label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              className="border rounded p-2"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

// <h3 className="text-neutral-50 mt-9">
//   {initialData ? "Edit Product" : "Create Product"}
// </h3>;
// {
//   error && <div className="text-red-500">{error}</div>;
// }
// {
//   /* Image Upload */
// }
