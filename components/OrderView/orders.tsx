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

    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         try {
    //             const response = await axios.get(`/api/order/`);
    //             if (response.status === 200) {
    //                 setOrders(response.data.orders);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching orders:", error);
    //             setError("Failed to load orders");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchOrders();
    // }, []);

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

        return () => clearInterval(interval);
    }, []);



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
        <div className="orders-container">
            <h2>My Orders</h2>
            {orders.map((order) => (
                <div key={order._id} >
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
                        {/* <div className="order-info">
                            <p className="product-name">{order.productId?.productName || "No Product Name"}</p>
                            <p>Price: Rs {order.productId?.price || "N/A"}</p>
                            <p>Delivery Date: {order.deliveryDate || "Not Set"}</p>
                            <p>Delivery Address: {order.deliveryAddress || "Not Provided"}</p>
                            <p>Delivery Charge: Rs {order.deliveryCharge || 0}</p>
                            <div className="order-item">
                                <span className="order-label">Status:</span>
                                <span className={`status-label ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </div> */}



                        {/* </div> */}
                    </div>

                    {/* <div className="order-right">
                        <h3>Delivery Status</h3>
                        <p>Qty: {order.quantity}</p>
                        <p className="total-price">Total: Rs {order.totalPrice}</p>
                        <button className="cancel-button">Cancel</button>
                    </div> */}
                </div>
            ))}

        </div>
    );
};

export default OrdersPage;


