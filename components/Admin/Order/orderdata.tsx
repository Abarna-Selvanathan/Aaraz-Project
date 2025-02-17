"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// import "../../../components/Admin/Order/order.css";
// import "../../src/app/globals.css";
import React from "react";

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
    customizationDescription: string;
    customizationImage?: string;
  };
  status: string;
}

const Orders: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log("Order ID:", id);  // Check if 'id' is logged correctly
        if (id) {
          const response = await axios.get(`/api/order/${id}`);
          if (response.status === 200) {
            setOrder(response.data);
          }
        } else {
          console.error("Order ID is missing");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
  
    fetchOrderDetails();
  }, [id]);
  

  const handleAccept = async () => {
    try {
      if (order) {
        const response = await axios.put(`/api/order/${order._id}`, {
          status: "Accepted",
        });
        if (response.status === 200) {
          alert("Order accepted");
          router.push("/admin/order");
        }
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (order) {
        const response = await axios.delete(`/api/order/${order._id}`);
        if (response.status === 200) {
          alert("Order deleted");
          router.push("/admin/order");
        }
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="main-content">
      <div className="analytics">
        <div className="background-products">
          <h1>Order Details</h1>
          {order ? (
            <div>
              <p>Order ID: {order._id}</p> 
              <p>User Name: {order.userId.name}</p>
              <p>Email: {order.userId.email}</p>
              <p>Phone Number: {order.userId.phoneNumber}</p>
              <td>
                {Array.isArray(order.productId) ? order.productId.map(product => product._id).join(", ") : order.productId._id}
              </td>
              <td>
                {Array.isArray(order.productId) ? order.productId.map(product => product.productName).join(", ") : order.productId.productName}
              </td>
              <p>Customization Description: {order.customization.customizationDescription}</p>
              {order.customization.customizationImage && <img src={order.customization.customizationImage} alt="Customization" />}
              <p>Status: {order.status}</p>
              <div>
                <button onClick={handleAccept}>Accept</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          ) : (
            <p>Loading order details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
