
import dbConnect from "../../../../../lib/dbConnect";
import { NextResponse } from 'next/server';
import Product from "../../../../../models/Product";

export async function GET() {
  try {
    await dbConnect(); 
    const count = await Product.find()
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