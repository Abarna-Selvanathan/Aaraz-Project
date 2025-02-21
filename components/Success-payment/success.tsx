"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../Waiting-Message/waiting.css";
import "../../src/app/globals.css";
import { Truck } from "lucide-react";

const PaymentSuccess = ({ orderId }: { orderId?: string | undefined }) => {
    console.log(orderId)
    const [isVisible, setIsVisible] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const updateOrderStatus = async () => {
            try {
                const orderAPIResponse = await axios.patch("/api/order", { orderId: orderId, status: 'Paid' });

                if (orderAPIResponse.status === 200 && orderAPIResponse.data.order.status === 'Paid') {
                    setTimeout(() => {
                        router.push("/account");
                    }, 3000);
                }
            } catch (error) {
                console.log("Error updating order status:", error);
            }
        };

        updateOrderStatus();
    }, [orderId, router]);

    const handleClose = () => {
        setIsVisible(false);
        router.replace("/account");
    };

    return (
        isVisible && (
            <div className="overlay">
                <div className="modal">
                    <h1>Payment Successful! 🎉</h1>
                    <p
                        onClick={handleClose}
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "5px 45px",
                        }}
                    >
                        Redirecting to the tracking page...
                        <Truck size={22} strokeWidth={2} />
                    </p>
                </div>
            </div>
        )
    );
};

export default PaymentSuccess;
