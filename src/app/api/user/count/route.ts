import mongoose from "mongoose";
import dbConnect from "../../../../../lib/dbConnect";
import { NextResponse } from 'next/server';
import userModel from "../../../../../models/User";

export async function GET() {
  try {
    await dbConnect(); 
    const count = await userModel.find()
    const countLength = count.length
    return NextResponse.json({ count: countLength });
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching products  count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}