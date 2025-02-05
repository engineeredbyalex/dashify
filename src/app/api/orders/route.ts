// src/pages/api/orders/route.ts
import { connectDB } from "@/app/lib/mongodb";
import { Order } from "@/app/models/Orders";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("Fetching Order with ID:", id);
  try {
    if (id) {
      const order = await Order.findById(id);
      if (!order) {
        console.log("Order not found.");
        return NextResponse.json(
          { error: "Order not found." },
          { status: 404 }
        );
      }
      console.log("Order found:", order);
      return NextResponse.json(order);
    } else {
      const orders = await Order.find({});
      return NextResponse.json(orders);
    }
  } catch (error) {
    console.log("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders." },
      { status: 500 }
    );
  }
}
/**
 * POST - Create a new product.
 */

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const order = new Order(body);
    await order.save();
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order." },
      { status: 500 }
    );
  }
}