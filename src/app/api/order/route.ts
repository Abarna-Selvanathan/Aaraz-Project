import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import dbConnect from "../../../../lib/dbConnect";
import Order from "../../../../models/Order";
import User from "../../../../models/User";
import Product from "../../../../models/Product";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect(); // Ensure DB connection

    const formData = await req.formData();
    console.log('FormData:', formData);

    // Extract form values
    const userId = formData.get("userId") as string;
    const productId = formData.get("productId") as string;
    const customizationDescription = formData.get("customizationDescription") as string;
    const quantity = Number(formData.get("quantity"));
    const deliveryCharge = Number(formData.get("deliveryCharge"));
    const customizationImage = formData.get("customizationImage") as File;

    // ✅ Extract and parse `deliveryDetails`
    const deliveryDetailsRaw = formData.get("deliveryDetails") as string;
    const deliveryDetails = deliveryDetailsRaw ? JSON.parse(deliveryDetailsRaw) : null;
    console.log('deliveryDetails:', deliveryDetails);
    // Validate required fields
    if (!userId || !productId || !customizationDescription || !quantity || !deliveryCharge || !deliveryDetails) {
      console.log("Missing required fields.");
      return NextResponse.json(
        { error: "Missing required fields: userId, productId, customizationDescription, deliveryDetails, quantity, deliveryCharge" },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      console.log("Invalid userId or productId format");
      return NextResponse.json({ error: "Invalid userId or productId format" }, { status: 400 });
    }

    // Verify User & Product exist
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const product = await Product.findById(productId);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    let customizationImageUrl = "";
    if (customizationImage) {
      const arrayBuffer = await customizationImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "order_images" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(buffer);
      });

      customizationImageUrl = (uploadResult as any).secure_url || "";
    }

    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      productId: new mongoose.Types.ObjectId(productId),
      customization: { customizationDescription, customizationImage: customizationImageUrl },
      quantity,
      deliveryCharge,
      status: "Order pending",
      deliveryDetails,
    });

    console.log("Saving new order:", newOrder);

    const savedOrder = await newOrder.save();
    console.log("Order saved successfully:", savedOrder);

    return NextResponse.json(
      { message: "Order created successfully", data: savedOrder },
      { status: 201 }
    );
  } catch (error) {
    console.log("Unexpected error in order creation:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: (error as Error).message },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { orderId, status } = body; // Default status if not provided

    if (!orderId) {
      return NextResponse.json({ message: "Missing orderId" }, { status: 400 });
    }

    await dbConnect();

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found", order: updatedOrder }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order status updated", order: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating order status:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await dbConnect();
    const orders = await Order.find()
      .populate('userId')
      .populate('productId')

    if (orders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Orders retrieved successfully", orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
