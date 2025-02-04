import { NextRequest, NextResponse } from "next/server";
import Order from "../../../../../models/Order";
import dbConnect from "../../../../../lib/dbConnect";

// GET an order by ID
export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    await dbConnect();
    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }


    
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// UPDATE an order by ID
export async function PUT(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    await dbConnect();
    const { orderId } = params;
    const body = await req.json();

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
