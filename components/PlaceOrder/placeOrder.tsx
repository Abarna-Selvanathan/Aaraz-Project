"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "../PlaceOrder/placeOrder.css";
import { useRouter } from "next/router";
import Image from "next/image";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
}

interface OrderData {
  userId: string;
  productId: string;
  customizationDescription: string;
  customizationImage: string; 
  // status?: string;

} 

const OrderForm = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [customization, setCustomization] = useState<OrderData>({
    userId: "",
    productId: "",
    customizationDescription: "",
    customizationImage: "",

  });
  const [productId, setProductId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setProductId(router.query.id as string);
    }
  }, [router.query.id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/cookie");
        const id = response.data?.user?.id;
        if (id) {
          const userResponse = await axios.post('/api/user/get-user', { id });
          setUserData(userResponse.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCustomizationChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "customizationImage") {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];

        // Convert to Base64 for Cloudinary
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setCustomization((prev) => ({ ...prev, customizationImage: base64String }));
          setPreview(base64String);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setCustomization((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData || !productId) {
      console.error("User data or product ID is not available.");
      return;
    }

    try {
      const response = await axios.post("/api/order", {
        userId: userData._id,
        productId,
        customizationDescription: customization.customizationDescription,
        customizationImage: customization.customizationImage,
      });

      console.log("Order created successfully:", response.data);
      router.push("/waiting-message");
    } catch (error: any) {
      console.error("Error submitting order:", error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container-placeOrder">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={userData?.name || ""} readOnly className="input-field" />
        <input type="email" name="email" placeholder="Your Email" value={userData?.email || ""} readOnly className="input-field" />
        <input type="number" name="phoneNumber" placeholder="Your Contact Number" value={userData?.phoneNumber || ""} readOnly className="input-field" />

        <h2>Customization</h2>
        <textarea name="customizationDescription" placeholder="Size, Color, Special Requests..." value={customization.customizationDescription} onChange={handleCustomizationChange} className="textarea-field" />

        <input type="file" accept="image/*" name="customizationImage" onChange={handleCustomizationChange} />
        {/* {preview && <Image src={preview} alt="Preview" width={100} height={100} />} */}

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default OrderForm;
