import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import "../login/Login.css"
import "../../src/app/globals.css"
import ReLogo from "../../public/Image/logo-removebg-preview.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";


 
const Loginpage: React.FC = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", { email, password });

      if (response.status === 201) {
        const { userType } = response.data;

        
        if (userType === "admin") {
          router.push("/admin/dashboard");
        } else {
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
            src={ReLogo}
            alt="Logo"
            width={280}
            height={280}
          />
        </div>
        <h2>Login</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          required
        
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <span className="icon" onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <p className="forgot-password">Forgot Password?</p>
        <button type="submit" className="login-button">
          Login
        </button>
        <p><Link href="/signup" className="create-account">
          Or Sign Up
        </Link></p>
      </form>
    </div>


 

 
      
   
  

  );
};

export default Loginpage;
