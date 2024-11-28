// models/Product.ts
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);