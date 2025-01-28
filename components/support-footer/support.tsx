import React from "react";
import "../../src/app/globals.css"
import "../privacy-footer/privacy.css"
import Link from "next/link";



const privacy: React.FC = () => {
  return (
    <div className="privacy">
      <h1>Contact information</h1>
      <div className="privacy-parah">
        <p>384, Thirunawarkulam, Vavuniya.</p>
        <Link href="mailto:aaraz@gmail.com"><p style={{ color: '#4C394F',textDecoration: 'none' }}>aaraz@gmail.com</p> </Link>
        <p>+94 77 635 4714</p>
      </div>
    </div>
          
          
  );
};
export default privacy;