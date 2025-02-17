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

        const user = await UserSchema.findById({ _id: id });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        console.log("Error fetching user:", error);
        return NextResponse.json({ message: "Failed to fetch user", error: error.message }, { status: 500 });
    }
};