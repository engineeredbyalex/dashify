import { connectDB } from "@/app/lib/mongodb";
import { Order } from "@/app/models/Orders";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params; // Get the ID from the dynamic route parameter
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
