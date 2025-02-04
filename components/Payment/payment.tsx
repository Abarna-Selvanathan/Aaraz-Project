import { SetStateAction, useState } from "react";
import "../Payment/payment.css";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const handlePaymentSelect = (method: string | SetStateAction<null>) => {
    setPaymentMethod(method);
    if (method === "cod") {
      setDeliveryCharge(450); // Example delivery charge
    } else {
      setDeliveryCharge(0);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Delivery Details</h2>
      <form className="delivery-form">
        <input type="text" placeholder="Name" required />
        <input type="tel" placeholder="Phone Number" required />
        <textarea placeholder="Address" required></textarea>
        <select required>
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
        <input type="text" placeholder="Postal Code" />
        <textarea placeholder="Additional Notes"></textarea>
      </form>

      <h2>Payment Method</h2>
      <div className="payment-options">
        <button type="button" onClick={() => handlePaymentSelect("cod")}>
          Cash on Delivery (COD)
        </button>
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

      <p>Delivery Charge: LRK {deliveryCharge}</p>
      <button type="submit" className="submit-btn">Submit </button>
    </div>
  );
};

export default PaymentForm;
