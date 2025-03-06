import { NextRequest, NextResponse } from "next/server";
import Order from "../../../../../models/Order";
import dbConnect from "../../../../../lib/dbConnect";

// GET an order by ID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch order" }, { status: 500 });
  }
}

// UPDATE an order by ID
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  const body = await req.json();
  try {
    await dbConnect();
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
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  try {
    await dbConnect();
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

// PATCH an order by ID (update status)
export const PATCH = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const { status } = await req.json();

  if (!orderId || !status) {
    return NextResponse.json({ error: "Order ID and status required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
};
