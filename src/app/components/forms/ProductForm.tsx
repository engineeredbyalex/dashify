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
    <form onSubmit={handleSubmit} className="flex flex-row justify-between">
      <div className="w-96 h-auto gap-8 flex flex-col">
        <div className="w-96 h-96 bg-neutral-50"></div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <div className="w-16 h-16 bg-neutral-50"></div>
            <div className="w-16 h-1 bg-neutral-50 rounded-lg"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-16 h-16 bg-neutral-50"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-16 h-16 bg-neutral-50"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-16 h-16 bg-neutral-50"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-16 h-16 bg-neutral-50"></div>
          </div>
        </div>
        {/* Image Input */}
        <div className="gap-1 flex flex-col">
          <label className="text-base">Add images</label>
          <input type="file" multiple onChange={handleImageChange} />
          {imagePreviews.length > 0 && (
            <div className="flex gap-2">
              {imagePreviews.map((preview, index) => (
                <Image key={index} src={preview} alt={`Preview ${index}`} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <div>{error}</div>

        <div className="gap-1 flex flex-col">
          <label>Product name</label>
          <input type="text" placeholder="Product name" name="productName" />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product Description</label>
          <input
            type="text"
            placeholder="Product name"
            name="productDescription"
          />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product Categoy</label>
          <input
            type="text"
            placeholder="Product name"
            name="productCategory"
          />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product Subcategoy</label>
          <input
            type="text"
            placeholder="Product name"
            name="prodcutSubcategory"
          />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product SKU</label>
          <input type="text" placeholder="Product name" name="productSKU" />
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <div className="gap-1 flex flex-col">
          <label>Product name</label>
          <input type="text" placeholder="Product name" name="productPrice" />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product Description</label>
          <input
            type="text"
            placeholder="Product name"
            name="productDiscountedPrice"
          />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product Categoy</label>
          <input
            type="text"
            placeholder="Product name"
            name="productCategory"
          />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product Subcategoy</label>
          <input
            type="text"
            placeholder="Product name"
            name="productProperty"
          />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product SKU</label>
          <input type="text" placeholder="Product name" name="productStock" />
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <div className="gap-1 flex flex-col">
          <label>Product name</label>
          <input type="text" placeholder="Product name" name="productBrand" />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product Description</label>
          <input type="text" placeholder="Product name" name="productWeight" />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product Categoy</label>
          <input type="text" placeholder="Product name" name="weightUnit" />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product Subcategoy</label>
          <input type="text" placeholder="Product name" name="productTime" />
        </div>
        <div className="gap-1 flex flex-col">
          <label>Product SKU</label>
          <input type="text" placeholder="Product name" name="" />
        </div>
      </div>
    </form>
  );
}
