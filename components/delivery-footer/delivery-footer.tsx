import React from "react";
import "../../src/app/globals.css"
import "../delivery-footer/delivery.css"



const Delivery: React.FC = () => {
  return (
    <div className="delivery">
          <h1>Delivery Policy</h1>
          <div className="delivery-parah">
            <p>As you mentioned, all gifts can be shipped directly to the shipping address.</p>

            <p>Estimated delivery time to major metropolitan areas is 2 to 7 business days and estimated delivery time to non-major metropolitan areas is 2 to 5 business days.</p>

            <p>Please ensure the correct delivery address along with the phone number on your order.</p>

            <p> We are not responsible for any delays or non-delivery due to incorrect addresses or locked premises.</p>

            <p>We work with various delivery partners and do our best to deliver on the requested date and time.</p>

            <p>However, in some cases, delays may occur.</p>
            
          </div>
    </div>
  );
};
export default Delivery;