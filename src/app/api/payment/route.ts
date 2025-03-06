import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Make sure to set the correct API version (use the required version in your case)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia", // Replace with the correct version
});

export async function POST(req: NextRequest) {
  try {
    const { order } = await req.json();

    if (!order || !order.productId) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const deliveryCharge = 450; // Add delivery charge

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: order.productId.productName,
              images: [order.productId.image],
            },
            unit_amount: order.productId.price * 100, // Convert to cents
          },
          quantity: order.quantity || 1,
        },
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: "Delivery Charge",
            },
            unit_amount: deliveryCharge * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/payment-success?oid=${order._id}`,
      cancel_url: `${req.nextUrl.origin}/payment-failed`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
