import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../lib/dbConnect";
import Product from "../../../../models/Product"; 

// Handle GET requests (Fetch all products)
export const GET = async (): Promise<NextResponse> => {
  try {
    await DBconnect();
    const products = await Product.find();
    return NextResponse.json(products, { status: 201 });
  } catch (error: unknown) {
    console.error("Error fetching products:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to fetch products.", error: (error as Error).message },
      { status: 500 }
    ); 
  }
};

// Handle POST requests (Add a new Product)
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await DBconnect();

    const newProduct = await req.json();
    console.log("Received product data:", newProduct);

    // Validate required fields
    if (!newProduct.productName || !newProduct.price || !newProduct.image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const savedProduct = await Product.create(newProduct);
    console.log("Product saved to database:", savedProduct);

    return NextResponse.json(
      { message: "Product saved successfully", savedProduct },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error saving product:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to save product.", error: (error as Error).message },
      { status: 500 }
    );
  }
};


// Handle PATCH requests (Update a Product)
export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await DBconnect();
    const { searchParams } = new URL(req.url);
    const id: string | null = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    const updateData = await req.json();
    console.log("Product to update:", updateData);
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Product updated successfully", updatedProduct },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error updating Product:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to update Product.", error: (error as Error).message },
      { status: 500 }
    );
  }
};

// Handle DELETE requests (Delete a Product)
export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await DBconnect();
    const { id }: { id: string } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    const deletedProduct  = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Product deleted successfully", deletedProduct },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error deleting Product:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to delete Product.", error: (error as Error).message },
      { status: 500 }
    );
  }
};
