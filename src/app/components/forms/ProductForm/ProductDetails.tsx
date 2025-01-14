export default function ProductDetails({
  name,
  setName,
  description,
  setDescription,
}: any) {
  return (
    <section className="w-full gap-4 flex flex-col">
      <div className="gap-2 flex flex-col">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="gap-2 flex flex-col">
        <label>Product Description</label>
        <textarea
          placeholder="Product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </section>
  );
}
