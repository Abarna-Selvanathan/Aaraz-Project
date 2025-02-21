import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import DBconnect from "../../../../../lib/dbConnect";
import Product from "../../../../../models/Product";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await DBconnect();

    const { id } = params;
    console.log('[ID]: ', id)
    console.log("Received Product ID:", id); // Debugging line

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format");
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    // Find product by _id OR productId
    const product = await Product.findOne({
      $or: [{ _id: id }, { productId: id }]
    });

    if (!product) {
      console.log("Product not found in DB");
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    console.log("Product found:", product); // Debugging line
    return NextResponse.json({ product }, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching product:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch product", error: error.message },
      { status: 500 }
    );
  }
}

// In backend for updating a product
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product: updatedProduct }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update product', error: error.message }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await DBconnect();

    const { id } = params;
    console.log("Received Product ID:", id); // Debugging line

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format");
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    // Find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log("Product not found");
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    console.log("Product deleted:", deletedProduct); // Debugging line
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Error deleting product:", error.message);
    return NextResponse.json(
      { message: "Failed to delete product", error: error.message },
      { status: 500 }
    );
  }
}

