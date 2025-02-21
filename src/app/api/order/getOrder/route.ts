import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Order from "../../../../../models/Order";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    console.log('orderId: ',orderId)
    if (!orderId) {
      return NextResponse.json({ error: "Booking ID is required." }, { status: 400 });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }
    return NextResponse.json({ status: order.status });
  } catch (error) {
    console.error("Error fetching order status:", error);
    return NextResponse.json({ error: "Failed to fetch order status." }, { status: 500 });
  }
}