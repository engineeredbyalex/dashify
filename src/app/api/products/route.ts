import { connectDB } from "@/app/lib/mongodb";
import { Product } from "@/app/models/Products";
import { NextResponse } from "next/server";

/**
 * GET - Fetch all products or a specific product by ID if provided.
 */
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    } else {
      const products = await Product.find({});
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
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
    const product = new Product(body);
    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete a product by ID.
 */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("id");

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    await Product.findByIdAndDelete(productId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
