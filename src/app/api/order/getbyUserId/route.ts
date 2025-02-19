import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Order from "../../../../../models/Order";
import Product from "../../../../../models/Product";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId } = body;

    console.log("Received userId:", userId);

    if (!userId || userId === "undefined") {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
    }

    const lastOrder = await Order.findOne({ userId })
      .sort({ createdAt: -1 })
      .limit(1)
      .populate("userId", "name email phoneNumber address");

    if (!lastOrder) {
      return NextResponse.json({ error: "No orders found for this user" }, { status: 404 });
    }

    // Fetch product details
    const orderedProduct = await Product.findById(lastOrder.productId);
    
    if (!orderedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Convert lastOrder to an object
    const orderData = lastOrder.toObject();

    // Merge order details with product details
    const mergedOrderDetails = {
      ...orderData,
      productId: {
        image: orderedProduct.image,
        price: orderedProduct.price,
        productName: orderedProduct.productName,
        productType: orderedProduct.productType,
        stock: orderedProduct.stock,
      },
    };

    return NextResponse.json({ order: mergedOrderDetails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching last order", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
