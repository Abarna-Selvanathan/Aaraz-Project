import { NextApiRequest, NextApiResponse } from "next";
import DBconnect from "../../../../lib/dbConnect"; // DB connection function
import Product from "../../../../models/Product";
import Order from "../../../../models/Order";
import mongoose from "mongoose";

// Handle GET requests (Fetch all orders)
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await DBconnect();
    const orders = await Order.find(); // Fetch all orders from DB
    return res.status(200).json(orders); // Return orders as a JSON response
  } catch (error: unknown) {
    console.error("Error fetching orders:", (error as Error).message);
    return res.status(500).json({
      message: "Failed to fetch orders.",
      error: (error as Error).message,
    });
  }
}; 



export async function POST(req: Request) {
  try {
    await DBconnect();

    const body = await req.json();
    const { userId, productId, quantity, deliveryDetails } = body;

    if (!userId || !productId || !quantity || !deliveryDetails?.name || !deliveryDetails?.address) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert userId & productId to ObjectId
    let mongoUserId, mongoProductId;
    try {
      mongoUserId = new mongoose.Types.ObjectId(userId);
      mongoProductId = new mongoose.Types.ObjectId(productId);
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid userId or productId format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate Product Exists
    const productExists = await Product.findById(mongoProductId);
    if (!productExists) {
      return new Response(JSON.stringify({ error: "Invalid productId. Product not found." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create Order
    const newOrder = new Order({
      userId: mongoUserId,
      productId: mongoProductId,
      quantity,
      deliveryDetails,
      status: "pending",
    });

    await newOrder.save();

    return new Response(JSON.stringify({ message: "Order created successfully", order: newOrder }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create order", details: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
