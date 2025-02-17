import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Order from "../../../../../models/Order";
const express = require("express");
const router = express.Router();

// GET an user by ID

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
      .populate("userId", "name email phoneNumber address") 
      .populate("productId", "image price productName productType stock"); 

    if (!lastOrder) {
      return NextResponse.json({ error: "No orders found for this user" }, { status: 404 });
    }

    return NextResponse.json({ order: lastOrder }, { status: 200 });
  } catch (error) {
    console.error("Error fetching last order", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}