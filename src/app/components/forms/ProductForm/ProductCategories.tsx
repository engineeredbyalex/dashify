// Product category component
export default function ProductCategories({
  categories,
  category,
  setCategory,
  subcategory,
  setSubcategory,
}: any) {
  const parentCategories = categories.filter((cat: any) => !cat.parent);
  const childCategories = categories.filter(
    (cat: any) => cat.parent === category
  );

  return (
    <section className="w-full gap-4 flex flex-col">
      <div className="gap-2 flex flex-col">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {parentCategories.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {childCategories.length > 0 && (
        <div className="gap-2 flex flex-col">
          <label>Subcategory</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option value="">Select Subcategory</option>
            {childCategories.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </section>
  );
}
