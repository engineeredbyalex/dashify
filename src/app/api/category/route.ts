// API rotue for fetching Categories, this needs to be implemented differenlty because it's too mutch trouble fetching data
// importing data base connection, this is used to connect to the database
import { connectDB } from "@/app/lib/mongodb";
// importing model for the category
import { Category } from "@/app/models/Category";
// importing nextResponse for server response for query
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("Fetching Order with ID:", id);
  try {
    if (id) {
      const category = await Category.findById(id);
      if (!category) {
        console.log("category not found.");
        return NextResponse.json(
          { error: "category not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(category);
    } else {
      const categories = await Category.find({});
      return NextResponse.json(categories);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
