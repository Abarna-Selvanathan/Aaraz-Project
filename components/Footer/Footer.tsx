import React from "react";
import Link from "next/link";
import './Footer.css';
import "../../src/app/globals.css";
import {FaFacebookF, FaTiktok, FaWhatsapp} from "react-icons/fa"; // Import Icons



const Footer: React.FC = () => {
  return ( 
    <footer >
      <div className="footer">

      <div className="footer-link">
        <div className="Our-mission ">
 
          <h2>Aaraz</h2>
          <p>We are passionate about ensuring that we have the right product to suit your needs.</p>

    

            <div className="social-icons">
              <Link href="https://www.facebook.com/share/1Dvi6rhB2e/?mibextid=wwXIfr" target="_blank">
                <FaFacebookF className="icon facebook" />
              </Link>

              <Link href="https://www.tiktok.com/@_aaraz__?_t=ZS-8tfQmJTVkFs&_r=1" target="_blank">
                <FaTiktok className="icon tiktok" />
              </Link>

              <Link href="https://wa.me/94776354714" target="_blank">
                <FaWhatsapp className="icon whatsapp" />
              </Link>
            </div>
         

        </div>



        <div className="FAQ">
          <h2>FAQ</h2>

          <li>
            <span>Preparation Time</span>
            <div>Preparation - 4 to 9 working days</div>
          </li>
          <li>
            <span>How to place COD order?</span>
            <div>Contact privacy via WhatsApp or email.</div>
          </li>
          <li>
            <span>How to share photos and details?</span>
            <div>Send them through the order form or WhatsApp.</div>
          </li>
          <li>
            <span>How to request for customization?</span>
            <div>Provide details in the customization section during checkout.</div>
          </li>
        </div>
        <div className="info">
          <h2>Info </h2>
          <Link href="/terms-conditions">Terms and Conditions</Link>
          <Link href="/delivery-policy">Delivery Policy</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>


      </div>
      <div className="footer-bottom">
        <p>© 2025 Aaraz. All Rights Reserved</p>
      </div>


      </div>
    </footer>
  );
};

export default Footer;
