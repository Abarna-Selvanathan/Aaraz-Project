"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../../../components/Admin/Product/product.css";

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
  }[];
  customization: {
    description: string;
    image?: string;
  };
  status: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/order");
        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await axios.patch(`/api/order/${orderId}`, { status: newStatus });

      if (response.status === 200) {
        // Update the order list locally
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

        // If the order is accepted, redirect customer to the payment page
        if (newStatus === "Accepted") {
          window.location.href = `/payment?orderId=${orderId}`;
        }
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
                    <td>
                      {Array.isArray(order.productId)
                        ? order.productId.map((product) => product._id).join(", ")
                        : order.productId._id}
                    </td>
                    <td>
                      {Array.isArray(order.productId)
                        ? order.productId.map((product) => product.productName).join(", ")
                        : order.productId.productName}
                    </td>
                    <td>{order.status}</td>
                    <td>
                      {/* <Link href={{ pathname: "/admin/orderView", query: { id: order._id } }}>
                        <button>View Details</button>
                      </Link> */}
                      <button
                        onClick={() => updateOrderStatus(order._id, "Accepted")}
                        className="accept-btn"
                      >
                        <i className="fa fa-check-square-o" aria-hidden="true"></i>

      

                      </button>
                      <button
                        onClick={() => updateOrderStatus(order._id, "Rejected")}
                        className="reject-btn"
                      >
                        Reject
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
