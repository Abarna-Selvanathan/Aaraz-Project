import { useState } from "react";
import "../Contact/support.css";
import "../../src/app/globals.css";
import Link from "next/link";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
  }); 

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors = { name: "", email: "", phoneNumber: "", message: "" };
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Validation code...

      if (!newErrors.name && !newErrors.email && !newErrors.message) {
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) throw new Error('Failed to send');

          alert("Form submitted successfully!");
          setFormData({ name: "", email: "", phoneNumber: "", message: "" });
        } catch (error) {
          console.error('Error:', error);
          alert("Failed to send message");
        }
      }
    };
  };

  return (
    <div className="contactForm"> {/* Removed styles. */}
      <h2>Contact Us</h2>

      <div className="privacy-parah">
        <p>
          <FaMapMarkerAlt className="icon" />  384, Thirunawarkulam, Vavuniya.
        </p>
        <p>
          <FaEnvelope className="icon" />
          <Link href="mailto:aaraz@gmail.com" style={{ color: '#4C394F', textDecoration: 'none' }}>
            aaraz.business@gmail.com
          </Link>
        </p>
        <p>
          <FaPhoneAlt className="icon" />  +94 77 635 4714
        </p>
      </div>
      <div className="contactus">
        <p>If you have any new ideas for gifts, please contact us !!</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <input placeholder="Name" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="formGroup">
          <input placeholder="Email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="formGroup">
          <input placeholder="Phone Number" type="tel" id="phoneNumber"
            name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <div className="formGroup">
          <textarea placeholder="Message . . ." id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <button type="submit" className="submitButton">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
