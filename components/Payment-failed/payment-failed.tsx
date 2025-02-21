"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../Waiting-Message/waiting.css";
import "../../src/app/globals.css";
import { XCircle, RotateCcw } from "lucide-react"; // Import failure icons

const PaymentFailed = () => {
    const [isVisible, setIsVisible] = useState(true);
    const router = useRouter();

    // Auto-redirect to checkout after 5 seconds
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         handleRetry();
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, []);

    const handleRetry = () => {
        setIsVisible(false);
        router.replace("/payment"); 
    };

    return (
        isVisible && (
            <div className="overlay">
                <div className="modal">
                    <h1 style={{ color: "red" }}>Payment Failed ❌</h1>
                    <p style={{ color: "gray" }}>Something went wrong with your payment.</p>
                    <p 
                        onClick={handleRetry} 
                        style={{ 
                            cursor: "pointer", 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "8px", 
                            fontWeight: "bold", 
                            color: "red"
                        }}
                    >
                        Try Again 
                        <RotateCcw size={22} strokeWidth={2} />
                    </p>
                </div>
            </div>
        )
    );
};

export default PaymentFailed;
