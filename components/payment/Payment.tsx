import React from "react";
import Image from "next/image";
import '../payment/payment.css'
import "../../src/app/globals.css"

const Paymentpage: React.FC = () => {
  return (
    <>
      

      <div className="payment-container">
        <form className="payment-form">
          {/* Contact Section */}
          <section className="contact-section">
            <div className="contact">
              <h3>Contact</h3>
              <a href="/login" className="signin">
                Login
              </a>
            </div>
            <input
              type="text"
              placeholder="Phone Number or Email"
              className="input-field"
            />
          </section>

          {/* Delivery Section */}
          <section className="delivery-section">
            <h3>Delivery</h3>
            <div className="delivery-grid">
              <div className="names">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input-field"
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="input-field-address-field"
              />
              <div className="city-grid">
                <input type="text" placeholder="City" className="input-field" />
                <input
                  type="text"
                  placeholder="Province/State"
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Post Code"
                  className="input-field"
                />
              </div>
              <input
                type="text"
                placeholder="Phone Number"
                className="input-field-phone-field"
              />
            </div>
            <div className="save-info">
              <input type="checkbox" id="save-info-checkbox" />
              <label htmlFor="save-info-checkbox">
                Save this information for next time
              </label>
            </div>
          </section>

          {/* Payment Method Section */}
          <section className="payment-method-section">
            <h3>Payment Method</h3>
            <div className="payment-methods">
              <button type="button" className="payment-method">
                COD
              </button>
              <button type="button" className="payment-method">
                Credit/Debit Card
              </button>
            </div>
            <div className="card-details">
              <input
                type="text"
                placeholder="Card Number"
                className="input-field-card"
              />
              <input
                type="text"
                placeholder="Name On Card"
                className="input-field-card"
              />
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                className="input-field-card"
              />
              <input
                type="text"
                placeholder="CVV"
                className="input-field-card"
              />
            </div>
            <button type="submit" className="pay-now-button">
              Pay Now
            </button>
          </section>

          {/* Order Summary Section */}
          <section className="order-summary-section">
            <h3>Order Summary</h3>
            <div className="summary-order-item">
              <div className="image-container">
                <Image
                  src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622755/AARAZ/Image/tbwonvttk7svly3m6acl.jpg"
                  alt="Order Item"
                  width={125}
                  height={125}
                />
                <span className="summary-qty">Qty: 1</span>
              </div>
              <p className="item-title">Polaroid Pic</p>
              <p className="item-price">Rs 1000</p>
            </div>
            <div className="discount-section">
              <input
                type="text"
                placeholder="Discount Code"
                className="input-field"
              />
              <button type="button" className="apply-button">
                Apply
              </button>
            </div>
            <div className="total-section">
              <p>Subtotal:</p>
              <p>Total:</p>
            </div>
          </section>
        </form>
      </div>

      
    </>
  );
};

export default Paymentpage;
