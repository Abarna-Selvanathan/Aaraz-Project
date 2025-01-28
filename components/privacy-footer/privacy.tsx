import React from "react";
import "../../src/app/globals.css"
import "../privacy-footer/privacy.css"




const Privacy: React.FC = () => {
  return (
    <div className="privacy">
          <h1>Privacy Policy</h1>
          <div className="privacy-parah">
            <p>Images of clients shared by our clients may be used for marketing under the implied understanding that the clients have voluntarily allowed the photographs/videos to be taken. We respect our clients' privacy. </p>
            <p>In case of objections, the images will be removed immediately.</p>
            
          </div>
    </div>
  );
};
export default Privacy;