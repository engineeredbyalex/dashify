// src/pages/api/orders/route.ts
import { connectDB } from "@/app/lib/mongodb";
import { Order } from "@/app/models/Orders";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("Fetching Order with ID:", id);
  try {
    if (id) {
      const order = await Order.findById(id);
      if (!order) {
        console.log("Product not found.");
        return NextResponse.json(
          { error: "Product not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(order);
    } else {
      const orders = await Order.find({});
      return NextResponse.json(orders);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
