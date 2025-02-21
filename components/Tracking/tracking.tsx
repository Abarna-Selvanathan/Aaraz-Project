"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Truck, Gift, CheckCircle } from "lucide-react";
import "../Tracking/tracking.css";
import Loader from "../Loader/loader";
import { useSearchParams } from "next/navigation";

const OrderTracking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('order');

  const steps = [
    { label: "Order Placed", icon: <Gift size={40} strokeWidth={2} />, value: "Paid" },
    { label: "On the Way", icon: <Truck size={40} strokeWidth={2} />, value: "Order Shipped" },
    { label: "Product Delivered", icon: <CheckCircle size={40} strokeWidth={2} />, value: "Order Delivered" },
  ];

  // Ensure index is at least 0 to prevent hiding icons
  const currentStepIndex = Math.max(0, steps.findIndex(step => step.value === status));

  useEffect(() => {
    const fetchLastOrder = async () => {
      if (!orderId) {
        setError("No order ID provided.");
        return;
      }

      setLoading(true);
      try {
        const cookieResponse = await axios.get("/api/cookie");
        if (cookieResponse.status === 200) {
          const orderAPIResponse = await axios.get(`/api/order/getOrder?orderId=${orderId}`);
          setStatus(orderAPIResponse.data.status || ""); // Ensure status is always a string
        }
      } catch (error) {
        console.log("Error fetching last order:", error);
        setError("Failed to load the last order.");
      } finally {
        setLoading(false);
      }
    };

    fetchLastOrder();
  }, [orderId]);

  if (error) return <p>{error}</p>;
  if (loading) return <Loader />;
  if (!orderId) return <p>No order ID provided.</p>;

  return (
    <div className="tracking-card">
      <div className="tracking-container">
        {steps.map((step, index) => (
          <div key={index} className={`tracking-step ${index <= currentStepIndex ? "active" : ""}`}>
            {/* Icons will always appear */}
            <div
              className="tracking-icon"
              style={{ color: index <= currentStepIndex ? "green" : "gray" }}
              aria-label={step.label}
            >
              {React.cloneElement(step.icon as React.ReactElement, {
                color: index <= currentStepIndex ? "green" : "gray",
              })}
            </div>

            {/* Keep the line visible but change the color based on step completion */}
            {index < steps.length - 1 && (
              <div
                className="tracking-line"
                style={{
                  backgroundColor: index < currentStepIndex ? "green" : "gray",
                  opacity: 1, // Ensure it's always visible
                }}
              ></div>
            )}

            <p className="step-label">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
