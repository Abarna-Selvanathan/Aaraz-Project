"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "../../../components/Admin/Order/order.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  productId: { _id: string }[];
  contact: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  customization: {
    description: string;
    image?: string;
  };
  status: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

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

  return (
    <div className="main-content">
      <div className="analytics">
        <div className="background-products">
          <h1>Orders</h1>
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Product ID</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userId.name}</td>
                    <td>{order.contact.email}</td>
                    <td>{order.contact.phoneNumber}</td>
                    <td>{order.productId.map((p) => p._id).join(", ")}</td>
                    <td>{order.customization.description}</td>
                    <td>
                      {order.customization.image ? (
                        <Image
                          src={order.customization.image}
                          alt="Order Image"
                          width={50}
                          height={50}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <Link href={{ pathname: '/admin/orderView', query: {id: order._id} }}>
                        <button>View Details</button>
                      </Link>

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
