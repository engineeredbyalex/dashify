// src/pages/api/products/route.ts
import { connectDB } from "@/app/lib/mongodb";
import { Product } from "@/app/models/Products";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("Fetching product with ID:", id);

  try {
    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        console.log("Product not found.");
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
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const product = new Product(body);
    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Product.findByIdAndDelete(id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete product." },
      { status: 500 }
    );
  }
}
