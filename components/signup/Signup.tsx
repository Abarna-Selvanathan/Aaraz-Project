import React, { useState } from "react";
import Image from "next/image";
import "../login/Login.css"
import "../../src/app/globals.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import ReLogo from "../../public/Image/logo-removebg-preview.png";
import jwt from "jsonwebtoken";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Signuppage: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState('')

  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("token", data.token);


      const decoded: any = jwt.decode(data.token);
      if (decoded) {
        setIsLoggedIn(true);
        setUserName(decoded.email.split("@")[0]);
      }
      router.push("/");
    } else {
      console.error("Signup failed");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const errors = [];

    if (!firstName) errors.push("first name");
    if (!lastName) errors.push("last name");
    if (!email) errors.push("email");
    if (!phoneNumber) errors.push("phone number");
    if (!password) errors.push("password");

    if (errors.length > 0) {
      const errorMessage = errors
        .map((field, index) => {
          if (index === 0) {
            return field.charAt(0).toUpperCase() + field.slice(1);
          } else {
            return field;
          }
        })
        .join(", ")
        .replace(/,([^,]*)$/, " and$1");

      const plural = errors.length > 1 ? "are" : "is";
      const lastWord = errors.length > 1 ? "them" : "it";

      toast.error(
        `${errorMessage} ${plural} most important to create an account, please fill ${lastWord}.`,
        {
          style: {
            width: "1000px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
          },
        }


      );
      return;
    }

    try {
      const response = await axios.post("/api/user", {
        name: `${firstName} ${lastName}`,
        email,
        phoneNumber,
        password,
        address
      });

      if (response.status === 201) {
        toast.success(response.data.message, {
          style: {
            width: "400px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
          },
        });
        router.push("/");
      } else {
        toast.error(response.data.error, {
          style: {
            width: "400px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
          },
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong.", {
        style: {
          width: "400px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
        },
      });
    }
  };

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-logo">
            <Image
              src={ReLogo}
              alt="Logo"
              width={280}
              height={280}
            />
          </div>
          <h2>Signup</h2>

          <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" required />
          <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" required />
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
          <input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" required />
          <input onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Phone Number" required />

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
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your confirm password"
            />
            <span className="icon" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            
          </div>

          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form >
      </div >
    </>
  );
}

export default Signuppage;
