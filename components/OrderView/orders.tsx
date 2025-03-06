"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../OrderView/orders.css";
import Loader from "../Loader/loader"; // Ensure this is correctly imported

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

interface Order {
    _id: string;
    userId: User;
    productId: Product;
    customization: Customization;
    createdAt: Date;
    updatedAt: Date;
    status: string;
}

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

        // Auto-fetch orders every 5 seconds
        const interval = setInterval(fetchOrders, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const handleCancelOrder = async (orderId: string) => {
        try {
            await axios.delete(`/api/order/${orderId}`);
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        } catch (error) {
            console.error("❌ Error canceling order:", error);
            alert("Failed to cancel the order.");
        }
    };

    if (isLoading) return <Loader />;
    if (error) return <p>{error}</p>;

    return (
        <div className="order-view">
            <div className="orders-container">
                <h2>Order History</h2>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className="order-section">
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
                                            <span className="order-qty">Qty: 1 {order.productId.quantity}</span>
                                        </div>

                                        {order.status.toLowerCase() === "accepted" && (
                                            <div className="order-actions">
                                                <div
                                                    className="payment-button"
                                                    onClick={() => router.push("/payment")}
                                                >
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

                                        {order.status.toLowerCase() === "delivering" && (
                                            <div className="order-actions">
                                                <span className="delivery-status">Order is on the way!</span>
                                            </div>
                                        )}

                                        {order.status.toLowerCase() === "pending" && (
                                            <div className="order-actions">
                                                <button
                                                    className="cancel-button"
                                                    onClick={() => handleCancelOrder(order._id)}
                                                >
                                                    Cancel Order
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recent orders found.</p>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;