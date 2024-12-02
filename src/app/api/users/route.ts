import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("Fetching User with ID:", id);

  try {
    if (id) {
      const user = await User.findById(id);
      if (!user) {
        console.log("User not found.");
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }
      return NextResponse.json(user);
    } else {
      const users = await User.find({});
      return NextResponse.json(users);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 }
    );
  }
}
