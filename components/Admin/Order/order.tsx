"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../../../components/Admin/Product/product.css";
import "../../../components/Admin/Order/order.css";
import { CheckCircle, XCircle } from "lucide-react";
import {
  Truck,
  PackageCheck,
} from "lucide-react"; 




interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  productId: {
    _id: string;
    productName: string;
    price: number;
  };
  deliveryDetails?: {
    name: string;
    phoneNumber: string;
    address: string;
    district: string;
    postalCode: string;
    additionalNotes: string;
  };
  status: string;
  createdAt?: string; // Add this field if your backend provides it
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch all orders and sort them by createdAt or _id
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/order");
        if (response.status === 200) {
          // Sort orders by createdAt in descending order (newest first)
          const sortedOrders = response.data.orders.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }; 

    fetchOrders();
  }, []);

  console.log(orders);

  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await axios.patch("/api/order", { orderId, status: newStatus });

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  
  return (
    <div className="main-content-Product">
      <div className="ProductTable">
        <div className="products">
          <h1>Orders</h1>
          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Status</th>
                  <th>Delivery Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userId.name}</td>
                    <td>{order.userId.email}</td>
                    <td>{order.userId.phoneNumber}</td>
                    <td>{order.productId._id}</td>
                    <td>{order.productId.productName}</td>
                    <td>{order.status}</td>
                    <td>
                      <div className="delivery-details">
                        <p><strong>Name:</strong> {order.deliveryDetails?.name || "N/A"}</p>
                        <p><strong>Phone:</strong> {order.deliveryDetails?.phoneNumber || "N/A"}</p>
                        <p><strong>Address:</strong> {order.deliveryDetails?.address || "N/A"}</p>
                        <p><strong>District:</strong> {order.deliveryDetails?.district || "N/A"}</p>
                        <p><strong>Postal Code:</strong> {order.deliveryDetails?.postalCode || "N/A"}</p>
                        <p><strong>Notes:</strong> {order.deliveryDetails?.additionalNotes || "N/A"}</p>
                      </div>
                    </td>
                    <td className={`btns ${order.status === "Accepted" ? "accepted" : order.status === "Rejected" ? "rejected" : ""}`}>
                      <button
                        onClick={() => updateOrderStatus(order._id, "Accepted")}
                        className={`accept-btn ${order.status === "Accepted" ? "active" : ""}`}
                      >
                        <CheckCircle size={20} />
                      </button>

                      <button
                        onClick={() => updateOrderStatus(order._id, "Rejected")}
                        className={`reject-btn ${order.status === "Rejected" ? "active" : ""}`}
                      >
                        <XCircle size={20} />
                      </button>

                      <button
                        onClick={() => updateOrderStatus(order._id, "Shipped")}
                        className={`Shipped-btn ${order.status === "Shipped" ? "active" : ""}`}
                      >
                        <PackageCheck size={20} />
                      </button>

                      <button
                        onClick={() => updateOrderStatus(order._id, "Delivered")}
                        className={`Delivered-btn ${order.status === "Delivered" ? "active" : ""}`}
                      >
                        <Truck size={20} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;