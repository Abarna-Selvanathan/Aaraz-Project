import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../../lib/dbConnect";
import UserSchema from "../../../../../models/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Get user by ID
export const POST = async (req: NextRequest) => {
  try {
    await DBconnect();
    const body = await req.json()
    const { id } = body

    const user = await UserSchema.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Failed to fetch user", error: error.message }, { status: 500 });
  }
};

// Update user by ID
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await DBconnect();
    const { id } = params;
    const updates = await req.json();

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Failed to update user", error: error.message }, { status: 500 });
  }
};

// Delete user by ID
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await DBconnect();
    const { id } = params;

    const deletedUser = await UserSchema.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Failed to delete user", error: error.message }, { status: 500 });
  }
};
