import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../lib/dbConnect";
import Product from "../../../../models/Product"; 
import mongoose from "mongoose";



export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await DBconnect(); 

    const products = await Product.find(); 
    console.log(products)
    return NextResponse.json(
      { products },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch products.", error: error.message },
      { status: 500 }
    );
  }
};


