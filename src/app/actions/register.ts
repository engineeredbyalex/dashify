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

// Define a type for the return value
interface RegisterResponse {
  error?: string;
  success?: boolean;
  user?: any; // You can define a more specific type here based on the User model
}

export const register = async (
  values: RegisterValues
): Promise<RegisterResponse> => {
  const { email, password, name } = values;

  try {
    // Connect to the database
    await connectDB();

    // Check if the user already exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await user.save();

    // Return success message and saved user
    return {
      success: true,
      user: savedUser, // Return saved user details if needed
    };
  } catch (error) {
    // Catch any errors and log them
    console.error(error);

    // Return a generic error message
    return {
      error: "Something went wrong, please try again later.",
    };
  }
};
