import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import DBconnect from "../../../../../lib/dbConnect";
import Product from "../../../../../models/Product";

// GET - Fetch product by ID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    await DBconnect();

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    console.log("Received Product ID:", id); // Debugging line

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format");
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const product = await Product.findOne({
      $or: [{ _id: id }, { productId: id }]
    });

    if (!product) {
      console.log("Product not found in DB");
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    console.log("Product found:", product); // Debugging line
    return NextResponse.json({ product }, { status: 200 });

  } catch (error) {
    console.error("Error fetching product:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to fetch product", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT - Update a product by ID
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  const body = await req.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product: updatedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update product', error: (error as Error).message }, { status: 500 });
  }
}

// DELETE - Delete a product by ID
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  try {
    await DBconnect();

    console.log("Received Product ID:", id); // Debugging line

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format");
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log("Product not found");
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    console.log("Product deleted:", deletedProduct); // Debugging line
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting product:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to delete product", error: (error as Error).message },
      { status: 500 }
    );
  }
}
