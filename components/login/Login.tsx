import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify"; 
import { useRouter } from "next/router";
import "../login/Login.css"
 

const Loginpage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", { email, password });

      if (response.status === 201) {
        const { userType } = response.data; 

        // Redirect based on userType
        if (userType === "admin") {
          router.push("/admin/dashboard");
        } else  {
          router.push("/home");
        } 
      } else {
        toast.error(response.data.error);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-logo">
          <Image
            src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622752/AARAZ/Image/et5phkjew6tboxv4tkyy.png"
            alt="Logo"
            width={150}
            height={150}
          />
        </div>
        <h2>Login</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          required
          className="input-field"
        />
        <div className="password-container">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            required
            className="input-field"
          />
          <span
            className="show-password"
            onClick={togglePasswordVisibility}
            role="button" 
            aria-label="Toggle Password Visibility"
          >
            {passwordVisible ? "🙈" : "👁️"}
          </span>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <Link href="/signup" className="create-account">
          Create Account
        </Link>
      </form>
    </div>
  );
};

export default Loginpage;
