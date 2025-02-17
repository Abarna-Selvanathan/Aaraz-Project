import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import Order from "../../../../models/Order";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import "../../../../src/app/api/upload/route";
import mongoose from "mongoose";
import Product from "../../../../models/Product";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface OrderData {
  userId: string;
  productId: string;
  customizationDescription: string;
  customizationImage: string;
  // status?: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const body: OrderData = await req.json();
    console.log("Received request body:", body);

    const { userId, productId, customizationDescription, customizationImage } = body;

    if (!customizationDescription || !customizationImage) {
      return NextResponse.json(
        { error: "Missing required fields: customizationDescription, or image" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ error: "Invalid productId format" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }




    let orderImage = "";
    try {
      const uploadResponse = await cloudinary.v2.uploader.upload(customizationImage, {
        folder: "order_images",
      });
      orderImage = uploadResponse.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return NextResponse.json({ error: "Image upload failed. Please try again." }, { status: 500 });
    }

    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      productId: new mongoose.Types.ObjectId(productId),
      customization: { customizationDescription, customizationImage: orderImage },
      status: "pending",
    });


  console.log("Saving new order to DB:", newOrder);



  try {
    const savedOrder = await newOrder.save();
    console.log("Order saved successfully:", savedOrder);

    return NextResponse.json({ message: "Order created successfully", data: savedOrder }, { status: 201 });
  } catch (dbError) {
    console.error("Database save error:", dbError);
    return NextResponse.json({ error: "Database save failed" }, { status: 500 });
  }
} catch (error) {
  console.error("Unexpected error in order creation:", error);
  return NextResponse.json({ error: "Failed to create order", details: error.message }, { status: 500 });
}
};

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const orders = await Order.find().populate("userId productId");
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
