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

interface DeliveryData {
  name: string;
  phoneNumber: string;
  address: string;
  district: string;
  postalCode: string;
  additionalNotes: string;
}

interface OrderData {
  userId: string;
  productId: string;
  customizationDescription: string;
  customizationImage: string;
  quantity: number;
  deliveryCharge: number;
  status?: string;
  deliveryDetails: DeliveryData;
}

const OrderForm = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryData>({
    name: "",
    phoneNumber: "",
    address: "",
    district: "",
    postalCode: "",
    additionalNotes: "",
  });
  const [customization, setCustomization] = useState({
    customizationDescription: "",
    customizationImage: null as File | null,
  });
  const [productId, setProductId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
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
          const userResponse = await axios.post("/api/user/getUserById", { id });
          setUserData(userResponse.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeliveryDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomizationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomization((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomization((prev) => ({ ...prev, customizationImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData || !productId) return;

    const formData = new FormData();
    formData.append("userId", userData._id);
    formData.append("productId", productId);
    formData.append("customizationDescription", customization.customizationDescription);
    if (customization.customizationImage) {
      formData.append("customizationImage", customization.customizationImage);
    }
    formData.append("quantity", quantity.toString());
    formData.append("deliveryCharge", "500"); // Example delivery charge
    formData.append("deliveryDetails", JSON.stringify(deliveryDetails));

    try {
      const response = await axios.post("/api/order", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Order created:", response.data);
      alert("Order placed successfully!");
      router.push("/waiting-message");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container-placeOrder">
      <div className="orderplace-Contact">
        <fieldset >
          <legend><h3>Contact Details</h3></legend>
          <input type="text" name="name" placeholder="Your Name" value={userData?.name || ""} readOnly className="input-field" />
          <input type="email" name="email" placeholder="Your Email" value={userData?.email || ""} readOnly className="input-field" />
          <input type="number" name="phoneNumber" placeholder="Your Contact Number" value={userData?.phoneNumber || ""} readOnly className="input-field" />
        </fieldset>

        <fieldset>
          <legend><h3>Customization</h3></legend>
          <textarea
            name="customizationDescription"
            placeholder="Customization Description"
            value={customization.customizationDescription}
            onChange={handleCustomizationChange}
            required
            className="textarea-field"
          />
          <div>
            <label className="image-input" htmlFor="image">
              <input
                type="file"
                name="customizationImage"
                accept="image/*"
                id="image"
                onChange={handleImageUpload}
                required
              />
              <i  className="fa fa-cloud-upload" aria-hidden="true"></i> Upload image
            </label>
            {/* {preview && <Image src={preview} alt="Customization Preview" width={100} height={100} />} */}
          </div>
        </fieldset>
      </div>

      <fieldset>
        <legend><h3>Delivery Details</h3></legend>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={deliveryDetails.name}
          onChange={handleDeliveryDetailsChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={deliveryDetails.phoneNumber}
          onChange={handleDeliveryDetailsChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={deliveryDetails.address}
          onChange={handleDeliveryDetailsChange}
          required
          className="input-field"
        />
        <select
          name="district"
          value={deliveryDetails.district}
          onChange={handleDeliveryDetailsChange}
          required
          className="input-field"
        >
          <option value="">Select District</option>
          <option value="Ampara">Ampara</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Badulla">Badulla</option>
          <option value="Batticaloa">Batticaloa</option>
          <option value="Colombo">Colombo</option>
          <option value="Galle">Galle</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Hambantota">Hambantota</option>
          <option value="Jaffna">Jaffna</option>
          <option value="Kandy">Kandy</option>
          <option value="Kegalle">Kegalle</option>
          <option value="Kilinochchi">Kilinochchi</option>
          <option value="Kurunegala">Kurunegala</option>
          <option value="Mannar">Mannar</option>
          <option value="Matale">Matale</option>
          <option value="Matara">Matara</option>
          <option value="Monaragala">Monaragala</option>
          <option value="Mullaitivu">Mullaitivu</option>
          <option value="Nuwara Eliya">Nuwara Eliya</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Puttalam">Puttalam</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Vavuniya">Vavuniya</option>
          <option value="Kalutara">Kalutara</option>
        </select>
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={deliveryDetails.postalCode}
          onChange={handleDeliveryDetailsChange}
          className="input-field"
        />
        <textarea
          name="additionalNotes"
          placeholder="Additional Notes"
          value={deliveryDetails.additionalNotes}
          onChange={handleDeliveryDetailsChange}
          className="input-field"
        />
      </fieldset>
      <button type="submit" className="submit-btn">Submit Order</button>
    </form>
  );
};

export default OrderForm;