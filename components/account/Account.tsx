"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../account/Account.css";
import "../../src/app/globals.css";
import axios from "axios";
import { SlidersHorizontal } from "lucide-react";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="account-container">
      <div className="profile-section">
        <div className="user-name">
          {user?.profileImage ? (
            <Image src={order?.userId.profileImage} alt="User Icon" width={50} height={50} className="user-icon" />
          ) : (
            <div className="user-icon-placeholder">{order?.userId.name.charAt(0).toUpperCase()}</div>
          )}
          <h2 style={{ cursor: "pointer" }}>{order?.userId.name}</h2>
        </div>
        <div className="arrow">
          <SlidersHorizontal className="icon" onClick={() => router.push("/profile")} />
        </div>
      </div>

      <div className="titles">
        <p>My Orders</p>
        <h3 onClick={() => router.push("/orders")}>View All Orders &gt;</h3>
      </div>

      {order ? (
        <div className="order-container">
          <Image src={order.productId.image} alt="Product Image" width={180} height={180} className="order-img" />

          <div className="order-details">
            
              <h3 className="order-name">{order.productId.productName}</h3>
          
            <div className="order-info">
             
                <span className="order-price">LKR {order.productId.price}</span>
             
                <span className="order-qty">Qty: {order.productId.quantity}</span>
             
            </div>

            {/* <div className="order-item">
              <span>Total: LKR {order.productId.price * order.quantity}</span>
            </div> */}
            <div className="order-status">
              <span className={`status-label ${order.status.toLowerCase()}`}>{order.status}</span>
            </div>


            {order.status.toLowerCase() === "accepted" && (
              <div className="order-item">
                <div className="payment-time" onClick={() => router.push("/payment")}>Now Payment Time &gt;</div>
              </div>
            )}
          </div>

          {order.status.toLowerCase() === "pending" && (
            <div className="order-item">
              <button className="cancel-button" onClick={handleCancelOrder}>
                Cancel Order
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No recent orders found.</p>
      )}
    </div>
  );
};

export default AccountReviewPage;
