import React from "react";
import Link from "next/link";
import './Footer.css';
import "../../src/app/globals.css"

const Footer: React.FC = () => {
  return (
    <footer >
     
        <div className="footer-link">

          <Link href="/">Aaraz</Link>
          <Link href="/terms-conditions">Terms and Conditions</Link>
          <Link href="/delivery-policy">Delivery Policy</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>

        <div className="footer-logo">
            <img src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622752/AARAZ/Image/et5phkjew6tboxv4tkyy.png" alt="Company Logo" width={90} height={90} />
        </div> 
       
       
    </footer>
  );
};

export default Footer;
