import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import formidable from "formidable";
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
  quantity: number;
  deliveryCharge: number;
  status?: string;
}

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    const form = formidable({ multiples: true });
    const [fields, files] = await form.parse(req.body);

    // Extract and validate fields
    const getField = (name: string) => fields[name]?.[0] || "";
    const getFile = (name: string) => files[name]?.[0];

    const orderData = {
      userId: getField("userId"),
      productId: getField("productId"),
      customizationDescription: getField("customizationDescription"),
      quantity: Number(getField("quantity")),
      deliveryCharge: Number(getField("deliveryCharge")),
      deliveryDetails: JSON.parse(getField("deliveryDetails")),
      customizationImage: getFile("customizationImage"),
    };

    // Validation
    if (!orderData.customizationDescription || !orderData.quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(orderData.productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    // Check user/product existence
    const [user, product] = await Promise.all([
      User.findById(orderData.userId),
      Product.findById(orderData.productId),
    ]);

    if (!user || !product) {
      return NextResponse.json(
        { error: "User or product not found" },
        { status: 404 }
      );
    }

    // Process image upload
    let orderImage = "";
    if (orderData.customizationImage) {
      try {
        const fileContent = await fs.readFile(orderData.customizationImage.filepath);
        const uploadResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "order_images" },
            (error, result) => {
              if (error) reject(error);
              resolve(result);
            }
          );
          uploadStream.end(fileContent);
        });
        orderImage = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    // Create and save order
    const newOrder = new Order({
      userId: orderData.userId,
      productId: orderData.productId,
      customization: {
        description: orderData.customizationDescription,
        image: orderImage,
      },
      quantity: orderData.quantity,
      deliveryCharge: orderData.deliveryCharge,
      deliveryDetails: orderData.deliveryDetails,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json(
      { message: "Order created", data: savedOrder },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
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


export const PATCH = async (req: NextRequest) => {
  const body = await req.json();
  const { orderId, status } = body

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    console.log(order)

    return NextResponse.json({ message: "Order status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
};