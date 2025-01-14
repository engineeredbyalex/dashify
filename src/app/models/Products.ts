import { Schema, model, models } from "mongoose";

// models/Product.ts
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String }, // Add subcategory
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    properties: [
      {
        title: { type: String, required: true },
        options: [{ type: String, required: true }],
      },
    ], // Ensure properties are included here
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
