"use server";
import { connectDB } from "@/app/lib/mongodb";
import User from "../models/User";
import bcrypt from "bcryptjs";

// Define a type for the input values
interface RegisterValues {
  email: string;
  password: string;
  name: string;
}

export const register = async (values: RegisterValues) => {
  const { email, password, name } = values;

  try {
    await connectDB();
    const userFound = await User.findOne({ email });

    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Use the savedUser to confirm success or return additional data
    return {
      success: true,
      user: { id: savedUser._id, name: savedUser.name, email: savedUser.email },
    };
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
};
