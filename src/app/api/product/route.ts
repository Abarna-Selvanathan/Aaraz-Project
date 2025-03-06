import { NextResponse } from "next/server";
import DBconnect from "../../../../lib/dbConnect";
import Product from "../../../../models/Product";

export const GET = async (): Promise<NextResponse> => {
  try {
    await DBconnect();
    const products = await Product.find();
    console.log(products)
    return NextResponse.json(
      { products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to fetch products.", error: (error as Error).message },
      { status: 500 }
    );
  }
};


