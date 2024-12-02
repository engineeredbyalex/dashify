// models/Orders.ts
import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    _id: String,
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    paid: Boolean,
    status: String,
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", OrderSchema);
