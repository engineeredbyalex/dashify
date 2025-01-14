import { connectDB } from "@/app/lib/mongodb";
import { Product } from "@/app/models/Products";
import { NextResponse } from "next/server";

/**
 * PUT - Update a product by ID.
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Await params before accessing id
  const { id } = await params;

  await connectDB();

  try {
    if (!id) {
      return NextResponse.json(
        { error: "ID is required to update a product." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product." },
      { status: 500 }
    );
  }
}
