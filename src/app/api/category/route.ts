// Importing database connection
import { connectDB } from "@/app/lib/mongodb";
// Importing Category model
import { Category } from "@/app/models/Category";
// Importing NextResponse for server responses
import { NextResponse } from "next/server";

/**
 * Handle GET requests to fetch categories.
 * Supports fetching all categories or a specific category by ID.
 */
export async function GET(
  req: Request,
  { params }: { params: { id?: string } }
) {
  await connectDB();

  try {
    // Extract category ID from params or query string
    const id = params?.id || new URL(req.url).searchParams.get("id");

    if (id) {
      // Fetch a specific category by ID
      const category = await Category.findById(id);
      if (!category) {
        return NextResponse.json(
          { error: "Category not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(category);
    } else {
      // Fetch all categories
      const categories = await Category.find({});
      return NextResponse.json(categories);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories." },
      { status: 500 }
    );
  }
}

/**
 * Handle POST requests to create a new category.
 * Requires a category `name` and optionally a `parent` ID.
 */
export async function POST(req: Request) {
  await connectDB();

  try {
    // Parse the request body
    const { name, parent } = await req.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: "Category name is required." },
        { status: 400 }
      );
    }

    // Create and save the new category
    const newCategory = await Category.create({
      name,
      parent: parent || null, // Handle optional parent field
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category." },
      { status: 500 }
    );
  }
}

/**
 * Handle Delete requests to delete a new category or a subcategory (parent).
 * Requires a category `name` and optionally a `parent` ID.
 */

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("id");

  if (!categoryId) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  try {
    await Category.findByIdAndDelete(categoryId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
