import ImageUploader from "../../utilities/ProductImageUploader";

export default function ProductImages({ images, setImages }: any) {
  const handleImageUpload = (uploadedImages: string[]) =>
    setImages(uploadedImages);

  return (
    <section className="w-full gap-4 flex flex-col">
      <ImageUploader existingImages={images} onUpload={handleImageUpload} />
    </section>
  );
}
