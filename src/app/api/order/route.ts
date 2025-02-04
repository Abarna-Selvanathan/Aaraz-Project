import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Order from "../../../../models/Order";
import User from "../../../../models/User"; // Import User model
import Product from "../../../../models/Product"; // Import Product model
import dbConnect from "../../../../lib/dbConnect";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function GET(req: NextRequest) {
  try {
    await dbConnect(); // Ensure DB connection
    const orders = await Order.find().populate("userId productId"); // Populate user and product details

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Extract product ID from URL if present
    const productIdFromUrl = req.nextUrl.searchParams.get("productId");

    const body = await req.json();
    console.log("Received request body:", body);

    // Debugging: Check if `contact` exists
    if (!body.contact) {
      console.error("Error: 'contact' field is missing.");
      return NextResponse.json({ error: "Contact details are required" }, { status: 400 });
    }

    if (!body.contact.email) {
      console.error("Error: 'contact.email' is missing.");
      return NextResponse.json({ error: "Contact email is required" }, { status: 400 });
    }

    // Find the user from MongoDB using email
    const user = await User.findOne({ email: body.contact.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get product IDs from body or URL
    let productIds = body.productIds || [];
    if (productIdFromUrl) {
      productIds.push(productIdFromUrl); // Add product ID from URL if available
    }

    // Validate product IDs
    if (!productIds.length) {
      return NextResponse.json({ error: "At least one product ID is required" }, { status: 400 });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      return NextResponse.json({ error: "One or more products not found" }, { status: 404 });
    }

    // Create new order
    const newOrder = new Order({
      userId: user._id,
      productId: products.map((product) => product._id),
      contact: {
        name: body.contact.name,
        email: body.contact.email,
        phoneNumber: body.contact.phoneNumber,
      },
      customization: body.customization,
      status: "pending",
    });

    // Save order
    const savedOrder = await newOrder.save();

    return NextResponse.json(
      { message: "Order created successfully", data: savedOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
