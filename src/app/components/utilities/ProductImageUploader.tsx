// ImageUploader.tsx
import { useState, ChangeEvent } from "react";
import { storage } from "@/app/lib/firebase"; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

interface ImageUploaderProps {
  onUpload: (imageUrls: string[]) => void; // Callback to handle uploaded image URLs
  existingImages?: string[]; // Optionally provide existing image previews
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  existingImages = [],
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(existingImages);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleUpload = async () => {
    try {
      const imageUrls = await uploadImages();
      onUpload(imageUrls); // Call the callback with the uploaded image URLs
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {imagePreviews.length > 0 && (
        <div className="flex flex-row-reverse lg:flex-col gap-3">
          <div className="w-full h-full">
            <Image
              key={0}
              width={64}
              height={64}
              src={imagePreviews[0]}
              alt={`Preview 0`}
              layout="responsive"
              className="object-cover rounded w-full"
            />
          </div>
          <div className="h-full flex flex-col lg:flex-row justify-between lg:justify-start">
            {imagePreviews.slice(1).map((preview, index) => (
              <div key={index + 1}>
                <Image
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
      <div className="flex flex-col gap-2">
        <label>Add images</label>
        <div className="gap-2 flex flex-col">
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={handleUpload}
            className="button_primary"
          >
            Upload Images
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
