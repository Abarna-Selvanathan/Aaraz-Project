import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../../lib/dbConnect";
import UserSchema from "../../../../../models/User";
import bcrypt from 'bcrypt';

// Update user by ID
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await DBconnect();
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
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Failed to update user", error: (error as Error).message }, { status: 500 });
  }
};

// Delete user by ID
export async function DELETE(req: NextRequest) {
  try {
    await DBconnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const deletedUser = await UserSchema.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Failed to delete user", error: (error as Error).message }, { status: 500 });
  }
};
