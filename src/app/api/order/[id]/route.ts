import { NextRequest, NextResponse } from "next/server";
import Order from "../../../../../models/Order";
import dbConnect from "../../../../../lib/dbConnect";
const express = require("express");
const router = express.Router();

// GET an order by ID

export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
  console.log("Received Params:", params);  // Log to verify if params are received correctly
  const { orderId } = params;

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  try {
    await dbConnect()
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({message: 'Failed to fecth orders'}, { status: 500 });
  }

}





// UPDATE an order by ID
export async function PUT(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    await dbConnect();
    const { orderId } = params;
    const body = await req.json();
     
    console.log(orderId)
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { $set: body }, { new: true });

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order updated successfully", order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// DELETE an order by ID
export async function DELETE(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    await dbConnect();
    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
  const { orderId } = params;
  const { status } = await req.body;

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    console.log(orderId)
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, {status: 404});
    }

    return NextResponse.json({ message: "Order status updated" }, {status: 200});
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, {status: 500});
  }
};

