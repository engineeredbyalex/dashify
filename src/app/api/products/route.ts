// src/pages/api/products/index.ts
import { connectDB } from "@/app/lib/mongodb";
import { Product } from "@/app/models/Products";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
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
    return NextResponse.json(
      { error: "Failed to delete product." },
      { status: 500 }
    );
  }
}
