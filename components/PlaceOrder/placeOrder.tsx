"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "../PlaceOrder/placeOrder.css";

const OrderForm = () => {
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [customization, setCustomization] = useState({ description: "", image: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/cookie");
        const id = response.data.user.id;

        if (response.status === 200) {
          const userResponse = await axios.post('/api/user/get-user', { id });
          setUserData(userResponse.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCustomizationChange = (e: any) => {
    if (e.target.name === "image") {
      setCustomization({ ...customization, image: e.target.files[0] });
    } else {
      setCustomization({ ...customization, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userData._id);
    formData.append("concact", JSON.stringify(userData));
    formData.append("customization", customization.description);
    if (customization.image) {
      formData.append("image", customization.image);
    }

    try {
      const response = await axios.post("/api/order", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Order created successfully:", response.data);
    } catch (error: any) {
      console.error("Error submitting order:", error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          name="email"
          placeholder="Your Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Your Contact Number"
          value={userData.phoneNumber}
          onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
          className="input-field"
        />

        <h2>Customization</h2>
        <textarea
          name="description"
          placeholder="Size, Color, Special Requests..."
          value={customization.description}
          onChange={handleCustomizationChange}
          className="textarea-field"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleCustomizationChange}
          className="file-input"
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OrderForm;