import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import "../payment/payment.css";
import "../../src/app/globals.css";

const Paymentpage: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState({
    userId: "12345", // Replace with actual user ID from auth
    productId: "",
    quantity: 1,
    deliveryDetails: { name: "", address: "" },
  }); 
  

  const [productDetails, setProductDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (router.isReady && productId) {
      setOrderDetails(prev => ({ ...prev, productId: productId as string }));
      fetchProductDetails(productId as string);
    }
  }, [router.isReady, productId]);

  const fetchProductDetails = async (productId: string) => {
    if (!productId) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/api/product/${productId}`);
      setProductDetails(response.data.product);
    } catch (error: any) {
      setError(error.response?.data?.message || "Product not found.");
      setProductDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name" || name === "address") {
      setOrderDetails(prev => ({
        ...prev,
        deliveryDetails: { ...prev.deliveryDetails, [name]: value },
      }));
    } else {
      setOrderDetails(prev => ({ ...prev, [name]: value }));
    }

    if (name === "productId") {
      fetchProductDetails(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("/api/order", {
        userId: "12345", // Replace with actual user ID
        productId: orderDetails.productId,
        quantity: orderDetails.quantity,
        deliveryDetails: {
          name: orderDetails.deliveryDetails.name,
          address: orderDetails.deliveryDetails.address,
        },
      });
  
      alert("Order placed successfully!");
      setOrderDetails({
        userId: "12345",
        productId: "",
        quantity: 1,
        deliveryDetails: { name: "", address: "" },
      });
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Place Your Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" value={orderDetails.deliveryDetails.name} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="address">Shipping Address:</label>
          <input type="text" id="address" name="address" value={orderDetails.deliveryDetails.address} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="productId">Product ID:</label>
          <input type="text" id="productId" name="productId" value={orderDetails.productId} onChange={handleChange} required />
        </div>

        {productDetails && (
          <div>
            <h3>Product Details</h3>
            <p><strong>Name:</strong> {productDetails.name}</p>
            <p><strong>Price:</strong>LRK{productDetails.price}</p>
            <p><strong>Description:</strong> {productDetails.description}</p>
          </div>
        )}

        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={orderDetails.quantity} onChange={handleChange} min="1" required />
        </div>

        {loading ? (
          <button type="submit" disabled>Placing Order...</button>
        ) : (
          <button type="submit">Place Order</button>
        )}
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Paymentpage;
