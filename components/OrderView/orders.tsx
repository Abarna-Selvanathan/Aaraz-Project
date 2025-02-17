"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import "../OrderView/orders.css";


interface Product {
    _id?: string;
    productName: string;
    description: string;
    price: number;
    stock: string;
    productType: string;
    image: string;
}
interface Order {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
        phoneNumber: string;
    };
}

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/order/`);
                if (response.status === 200) {
                    setOrders(response.data.orders);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Failed to load orders");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="orders-container">
            <h2>My Orders</h2>
            {orders.map((order) => (
                <div key={order._id} className="order-card">
                    <div className="order-left">
                        {order.productId?.image ? (
                            <Image
                                src={order.productId.image}
                                alt={order.productId.productName}
                                width={150}
                                height={150}
                                className="order-image"
                            />
                        ) : (
                            <p>No Image Available</p>
                        )}

                        <div className="order-info">
                            <p className="product-name">{order.productId?.productName || "No Product Name"}</p>
                            <p>Price: Rs {order.productId?.price || "N/A"}</p>
                            <p>Delivery Date: {order.deliveryDate || "Not Set"}</p>
                            <p>Delivery Address: {order.deliveryAddress || "Not Provided"}</p>
                            <p>Delivery Charge: Rs {order.deliveryCharge || 0}</p>
                        </div>
                    </div>

                    <div className="order-right">
                        <h3>Delivery Status</h3>
                        <p>Qty: {order.quantity}</p>
                        <p className="total-price">Total: Rs {order.totalPrice}</p>
                        <button className="cancel-button">Cancel</button>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default OrdersPage;


