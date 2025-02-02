"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import '../account/Account.css';
import "../../src/app/globals.css";

interface User {
  _id: string;
  name: string;
  profileImage?: string;
}

interface Order {
  _id: string;
  productName: string;
  deliveryDate: string;
  deliveryAddress: string;
  deliveryCharge: number;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

const AccountReviewPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("/api/cookie");
        console.log("Cookie API Response:", response.data);
        
        if (response.status === 200 && response.data.user?.id) {
          setUserId(response.data.user.id);
        } else {
          throw new Error("User ID not found in cookie response.");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setError("User authentication failed.");
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`/api/user/get-user/${userId}`);
        console.log("User API Response:", userResponse.data);

        const ordersResponse = await axios.get(`/api/order/${userId}`);
        console.log("Orders API Response:", ordersResponse.data);

        setUser(userResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="account-container">
      <div className="profile-section">
        <div className="profile-icon">
          {user?.profileImage && (
            <Image
              src={user.profileImage}
              alt="User Icon"
              width={150}
              height={150}
              priority
            />
          )}
        </div>
        <h2>{user?.name || "Guest"}</h2> 
      </div>

      <div className="tittles">
        <div className="tittleH3">My Orders</div>
        <div className="view-all-orders">View All Orders &gt;</div>
      </div>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="orders-view" key={order._id}>
            <div className="order-img">
              <Image src={order.image} alt="Order Image" width={150} height={150} />
            </div>
            <div className="orders-section">
              <div className="order-item">
                <div className="order-detail">
                  <div className="item-title">{order.productName}</div>
                  <p>
                    <b>Delivery Date:</b> <span>{order.deliveryDate}</span>
                  </p>
                  <p>
                    <b>Delivery Address:</b> <span>{order.deliveryAddress}</span>
                  </p>
                  <p>
                    <b>Delivery Charge: </b><span>Rs {order.deliveryCharge}</span>
                  </p>
                  <p>
                    <b>Price:</b> <span>Rs {order.price}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="delivery-section">
              <Link href={`/delivery-detail/${order._id}`}>Delivery Details</Link>
              <p>Qty: {order.quantity}</p>
              <p>
                Total: <span>Rs {order.totalPrice}</span>
              </p>
              <button className="cancel-button" aria-label="Cancel Order">
                Cancel
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AccountReviewPage;
