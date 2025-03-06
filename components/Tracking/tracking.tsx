"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Truck, Gift, CheckCircle, XCircle } from "lucide-react";
import "../Tracking/tracking.css";
import Loader from "../Loader/loader";
import { useSearchParams, useRouter } from "next/navigation";

const OrderTracking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("order");
  const router = useRouter();

  const steps = [
    { label: "Order Placed", icon: <Gift size={40} strokeWidth={2} />, value: "Paid" },
    { label: "On the Way", icon: <Truck size={40} strokeWidth={2} />, value: "Order Shipped" },
    { label: "Product Delivered", icon: <CheckCircle size={40} strokeWidth={2} />, value: "Order Delivered" },
  ];

  const currentStepIndex = Math.max(0, steps.findIndex((step) => step.value === status));

  // Use useCallback to memoize the function
  const fetchLastOrder = useCallback(async () => {
    if (!orderId) {
      setError("No order ID provided.");
      return;
    }

    setLoading(true);
    try {
      const cookieResponse = await axios.get("/api/cookie");
      if (cookieResponse.status === 200) {
        const orderAPIResponse = await axios.get(`/api/order/getOrder?orderId=${orderId}`);
        setStatus(orderAPIResponse.data.status || "");
      }
    } catch (error) {
      console.log("Error fetching last order:", error);
      setError("Failed to load the last order.");
    } finally {
      setLoading(false);
    }
  }, [orderId]); // Only depends on orderId

  useEffect(() => {
    fetchLastOrder(); // Initial fetch

    // Polling mechanism to check for status updates every 10 seconds
    const intervalId = setInterval(fetchLastOrder, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchLastOrder]);

  const handleClose = () => {
    router.push("/account");
  };

  if (error) return <p>{error}</p>;
  if (loading) return <Loader />;
  if (!orderId) return <p>No order ID provided.</p>;

  return (
    <div className="tracking-card">
      <button className="close-button" onClick={handleClose}>
        <XCircle size={24} />
      </button>
      <div className="tracking-container">
        {steps.map((step, index) => (
          <div key={index} className={`tracking-step ${index <= currentStepIndex ? "active" : ""}`}>
            <div
              className="tracking-icon"
              style={{ color: index <= currentStepIndex ? "green" : "gray" }} // Apply color to the container div
              aria-label={step.label}
            >
              {step.icon}  {/* Directly use the icon component */}
            </div>

            {index < steps.length - 1 && (
              <div
                className="tracking-line"
                style={{
                  backgroundColor: index < currentStepIndex ? "green" : "gray",
                  opacity: 1,
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
