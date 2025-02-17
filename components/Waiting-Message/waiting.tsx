"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../Waiting-Message/waiting.css"; 
import "../../src/app/globals.css"

const OrderSuccess = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsVisible(false);
    router.push("/account");
  };

  return (
    isVisible && (
      <div className="overlay"> 
        <div className="modal">
          <h2>Order Created Successfully</h2>
          <p>Waiting to confirm your order...</p>
          <button className="closeButton" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default OrderSuccess;
