import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../lib/dbConnect";
import Order, { IOrder } from "../../../../models/Order"; // Assuming IOrder is the TypeScript interface for your Order model

// Handle GET requests (Fetch all orders)
export const GET = async (): Promise<NextResponse> => {
  try {
    await DBconnect();
    const orders: IOrder[] = await Order.find();
    return NextResponse.json(orders, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching orders:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to fetch orders.", error: (error as Error).message },
      { status: 500 }
    );
  }
};

// Handle POST requests (Add a new Order)
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await DBconnect();
    const newOrder: IOrder = await req.json();
    console.log("Order to save:", newOrder);
    const savedOrder: IOrder = await Order.create(newOrder);
    return NextResponse.json(
      { message: "Order saved successfully", savedOrder },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error saving order:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to save order.", error: (error as Error).message },
      { status: 500 }
    );
  }
};

// Handle GET requests for a single Order (Fetch an Order by ID)
export const GET_BY_ID = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await DBconnect();
    const { searchParams } = new URL(req.url);
    const id: string | null = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }
    const order: IOrder | null = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching order:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to fetch order.", error: (error as Error).message },
      { status: 500 }
    );
  }
};

// Handle PATCH requests (Update an Order)
export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await DBconnect();
    const { searchParams } = new URL(req.url);
    const id: string | null = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }
    const updateData: Partial<IOrder> = await req.json();
    console.log("Order to update:", updateData);
    const updatedOrder: IOrder | null = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Order updated successfully", updatedOrder },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating order:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to update order.", error: (error as Error).message },
      { status: 500 }
    );
  }
};

// Handle DELETE requests (Delete an Order)
export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await DBconnect();
    const { id }: { id: string } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }
    const deletedOrder: IOrder | null = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Order deleted successfully", deletedOrder },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting order:", (error as Error).message);
    return NextResponse.json(
      { message: "Failed to delete order.", error: (error as Error).message },
      { status: 500 }
    );
  }
};
