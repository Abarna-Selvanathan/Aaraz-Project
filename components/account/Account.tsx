"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../account/Account.css";
import "../../src/app/globals.css";
import axios from "axios";
import { SlidersHorizontal  } from "lucide-react";

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

        {user?.profileImage ? (
          <Image src={order?.userId.profileImage} alt="User Icon" width={50} height={50} className="user-icon" />
        ) : (
          <div className="user-icon-placeholder">{order?.userId.name.charAt(0).toUpperCase()}</div>
        )}
        <h2 style={{ cursor: "pointer" }}>
          {order?.userId.name}

        </h2>

        <div className="arrow">
          <SlidersHorizontal className="icon" onClick={() => router.push("/profile")}/>
        </div>
      </div>

      <div className="titles">
        <p>My Orders</p>
        <h2 onClick={() => router.push("/orders")}>
          View All Orders &gt;
        </h2>
      </div>

      {order ? (
        <div className="order-container">
          <div className="order-item">
            <span className="order-label">Product Name:</span>
            <span>{order.productId.productName}</span>
          </div>

          <div className="order-item">
            <span className="order-label">Image:</span>
            <Image src={order.productId.image} alt="Product Image" width={100} height={100} />
          </div>

          <div className="order-item">
            <span className="order-label">Price:</span>
            <span>LKR {order.productId.price}</span>
          </div>

          <div className="order-item">
            <span className="order-label">Status:</span>
            <span className={`status-label ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
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
