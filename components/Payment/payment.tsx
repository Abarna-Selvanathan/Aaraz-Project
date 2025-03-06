"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "../Payment/payment.css";
import Image from "next/image";
import Loader from "../../components/Loader/loader";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

interface Order {
  productId: {
    productName: string;
    image: string;
    price: number;
  };
  quantity: number;
}

interface PaymentFormProps {
  order: Order | null;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ order }) => {
  const [loading, setLoading] = useState(false);

  // Ensure order exists before rendering
  if (!order || !order.productId) {
    return <Loader />;
  }

  const deliveryCharge = 450;
  const subtotal = order.productId.price * order.quantity || 0;
  const total = subtotal + deliveryCharge;

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe failed to load.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Payment failed, try again.");
      }
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="order-summary compact">
        <h2 className="tittles">Order Summary</h2>
        <div className="item">
          <Image
            src={order.productId.image}
            alt="Product Image"
            width={80}
            height={80}
            className="order-img"
          />
          <div className="summary-info">
            <p className="product-name">{order.productId.productName}</p>
            <p className="sub-info">Sub information</p>
          </div>
          <div className="qty-controls">
            <span className="qty">{order.quantity || 1}</span>
            <p className="price">LKR {order.productId.price}</p>
          </div>
        </div>

        <hr />
        <div className="summary-details">
          <div className="summary-row">
            <p>Subtotal</p>
            <p className="amount">LKR {subtotal}</p>
          </div>
          <div className="summary-row">
            <p>Shipping fees</p>
            <p className="amount">LKR {deliveryCharge}</p>
          </div>
          <div className="summary-row total">
            <p>Total </p>
            <p className="amount total-amount">LKR {total}</p>
          </div>
        </div>
      </div>

      <div className="payment-section modern">
        <h2 className="tittles">Payment Method</h2>
        <div className="payment-options">
          <button className="payment-btn" onClick={handlePayment} disabled={loading}>
            {loading ? "Redirecting..." : "Pay with Card"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
