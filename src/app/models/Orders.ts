// models/Orders.ts
import { Schema, model, models } from "mongoose";

const SelectedValueSchema = new Schema({
  value: { type: String, required: true }, // e.g., scent or decoration details
});

const LineItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  disscountedPrice: { type: Number, required: false },
  promoCode: { type: String, required: false },
  quantity: { type: Number, required: true },
  selectedValues: { type: [SelectedValueSchema], required: false }, // Array of selected options
});

const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    streetAddress: { type: String, required: true },
    country: { type: String, required: true },
    line_items: { type: [LineItemSchema], required: true }, // Array of products in the order
    paid: { type: Boolean, default: false },
    paymentMethod: {
      type: String,
      enum: ["Card", "Cash", "Bank Transfer"],
      required: true,
    }, // Fix typo from "paymantMethod"
    paymentStatus: {
      type: String,
      enum: ["Pending", "Approved", "Declined", "Refunded"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

export const Order = models.Order || model("Order", OrderSchema);
