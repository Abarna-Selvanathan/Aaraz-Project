import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../../lib/dbConnect";
import Product from "../../../../../models/Product"; 

// Handle GET requests for a single Product (Fetch a Product by ID)
export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
      await DBconnect();
      const body = await req.json()
      const {id} = body;
      if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
      }
      const product  = await Product.findById(id);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(product, { status: 200 });
    } catch (error: unknown) {
      console.error("Error fetching Product:", (error as Error).message);
      return NextResponse.json(
        { message: "Failed to fetch Product.", error: (error as Error).message },
        { status: 500 }
      );
    }
  };