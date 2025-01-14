export default function ProductPricing({
  price,
  setPrice,
  discountedPrice,
  setDiscountedPrice,
  currency,
  setCurrency,
  stock,
  setStock,
}: any) {
  return (
    <section className="w-full gap-4 flex flex-col">
      <div className="gap-2 flex flex-col">
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />
      </div>
      <div className="gap-2 flex flex-col">
        <label>Discounted Price</label>
        <input
          type="number"
          value={discountedPrice}
          onChange={(e) => setDiscountedPrice(+e.target.value)}
        />
      </div>
      <div className="gap-2 flex flex-col">
        <label>Currency</label>
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </div>
      <div className="gap-2 flex flex-col">
        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(+e.target.value)}
        />
      </div>
    </section>
  );
}
