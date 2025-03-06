"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../account/Account.css";
import "../../src/app/globals.css";
import axios from "axios";
import { SlidersHorizontal } from "lucide-react";
import Loader from "../Loader/loader";

interface User {
  _id: string;
  name: string;
  profileImage?: string;
  address: string;
  phoneNumber: string[];
}

interface Product {
  _id: string;
  image: string;
  productType: string;
  productName: string;
  stock: string;
  price: number;
  quantity: number;
}

interface Customization {
  customizationDescription: string;
  customizationImage: string;
}

interface OrderData {
  _id: string;
  userId: User;
  productId: Product;
  customization: Customization;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  // paymentTime?: Date;
}

const AccountReviewPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/cookie");
        if (response.status === 200) {
          const id = response.data.user.id;
          console.log("✅ User ID:", id);
          setUserId(id);

          const userResponse = await axios.post("/api/user/getUserById", { id });
          setUser(userResponse.data.user);
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setError("Failed to load user data.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        if (!userId) return;

        const response = await axios.post("/api/order/getbyUserId", { userId });

        console.log("Last Order Response:", response.data);

        if (response.status === 200) {
          setOrder(response.data.order || null);
        }
      } catch (error) {
        console.error("Error fetching last order:", error);
        setError("Failed to load the last order.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastOrder();
  }, [userId]);

  const handleCancelOrder = async () => {
    if (!order) return;

    try {
      await axios.delete(`/api/order/${order._id}`);
      setOrder(null);
    } catch (error) {
      console.error("❌ Error canceling order:", error);
      alert("Failed to cancel the order.");
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="account-container">
      <div className="profile-section">
        <div className="user-name">
          {user?.profileImage ? (
            <Image
              src={user.profileImage} // Use the user's profileImage instead of order's userId profileImage
              alt="User Icon"
              width={50}
              height={50}
              className="user-icon"
            />
          ) : (
            <div className="user-icon-placeholder">
              {order?.userId.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 style={{ cursor: "pointer" }}>{order?.userId.name}</h2>
        </div>
        <div className="arrow">
          <SlidersHorizontal className="icon" onClick={() => router.push("/profile")} />
        </div>
      </div>

      <div className="titles">
        <p>My Orders</p>
        <p className="veiworder" onClick={() => router.push("/orders")}>
          View All Orders &gt;
        </p>
      </div>

      <div className="order-section">
        {order ? (
          <div className="order-card">
            <div className="order-data-container">
              <Image
                src={order.productId.image}
                alt="Product Image"
                width={140}
                height={140}
                className="order-img"
              />

              <div className="order-details">
                <div className="order-info">
                  <h3 className="order-name">{order.productId.productName}</h3>
                  <div className="order-status">
                    <span className={`status-label ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="order-info">
                  <span className="order-price">LKR {order.productId.price}</span>
                  <span className="order-qty">Qty: 1{order.productId.quantity}</span>
                </div>

                {order.status.toLowerCase() === "accepted" && (
                  <div className="order-actions">
                    <div className="payment-button" onClick={() => router.push("/payment")}>
                      Now Payment Time &gt;
                    </div>
                  </div>
                )}

                {(order.status === "Paid" || order.status === "Shipped" || order.status === "Delivered") && (
                  <div className="order-actions">
                    <div
                      className="tracking-button"
                      onClick={() => router.push(`/tracking?order=${order._id}`)}
                    >
                      Now Track Your Order &gt;
                    </div>
                  </div>
                )}

                {order.status.toLowerCase() === "delivered" && (
                  <div className="order-actions">
                    <div
                      className="review-button"
                      onClick={() => router.push(`/review?order=${order._id}`)}
                    >
                      Now Review Your Order &gt;
                    </div>
                  </div>
                )}

                {order.status.toLowerCase() === "delivering" && (
                  <div className="order-actions">
                    <span className="delivery-status">Order is on the way!</span>
                  </div>
                )}

                {order.status.toLowerCase() === "pending" && (
                  <div className="order-actions">
                    <button className="cancel-button" onClick={handleCancelOrder}>
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No recent orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AccountReviewPage;
