
import dbConnect from "../../../../../lib/dbConnect";
import { NextResponse } from 'next/server';
import Order from "../../../../../models/Order";

export async function GET() {
  try {
    await dbConnect(); 
    const count = await Order.find()
    const countLength = count.length
    return NextResponse.json({ count: countLength });
  } catch (error) {
    console.error("Error fetching products  count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}