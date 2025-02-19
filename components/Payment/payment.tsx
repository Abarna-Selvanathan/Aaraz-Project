import { useState } from "react";
import "../Payment/payment.css";
import Image from "next/image";

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
}

interface Customization {
  customizationDescription: string;
  customizationImage: string;
}

interface OrderData {
  _id: string;
  userId: User;
  productId: Product;
  customization: Customization;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  quantity: number;
}

interface PaymentFormProps {
  order: OrderData;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ order }) => {
  console.log(order)
  
  
  if (!order || !order.productId) {
    return <p>Loading Order Details...</p>;
  }
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  
  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
    setDeliveryCharge(method === "cod" ? 450 : 0);
  };
  const subtotal = order.productId.price * order.quantity;
  const total = subtotal + deliveryCharge;
  
  return (
    <div className="payment-container">
      <div className="order-summary">
        <h2 className="title">Order Summary</h2>
        <div className="item">
          <div className="image-container">
            <Image
              src={order.productId.image}
              alt="Product Image"
              width={180}
              height={180}
              className="order-img"
            />
            <div className="qty-badge">Qty: {order.productId.quantity}</div>
          </div>
          <span className="product-name">{order.productId.productName}</span>
          <span className="price">LKR {order.productId.price}</span>
        </div>

        <div className="summary">
          <p>Subtotal: LKR {subtotal}</p>
          <p>Delivery Charge: LKR {deliveryCharge}</p>
          <p>Total: LKR {total}</p>
        </div>
      </div>

      <h2>Payment Method</h2>
      <div className="payment-options">
        {/* <button type="button" onClick={() => handlePaymentSelect("cod")}>
          Cash on Delivery (COD)
        </button> */}
        <button type="button" onClick={() => handlePaymentSelect("card")}>
          Pay with Card
        </button>
      </div>

      {paymentMethod === "card" && (
        <div className="card-payment-form">
          <input type="text" placeholder="Cardholder Name" required />
          <input type="text" placeholder="Card Number" required />
          <input type="text" placeholder="Expiry Date" required />
          <input type="text" placeholder="CVV" required />
          <textarea placeholder="Billing Address (if different)"></textarea>
        </div>
      )}

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </div>
  );
};

export default PaymentForm;
