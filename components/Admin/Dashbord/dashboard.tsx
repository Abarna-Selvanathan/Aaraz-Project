'use client';

import { useState } from 'react';
import Image from 'next/image';
// import jwt, { JwtPayload } from "jsonwebtoken";
import Link from 'next/link';
import '../../../components/Admin/Dashbord/dashboard.css';
import Users from '../User/user';
import Payments from "@/pages/admin/payment";
import Product from '@/pages/admin/product';
import Orders from '@/pages/admin/order';
import DeliveryDetails from '@/pages/admin/delivery';



const Dashboard: React.FC = () => {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(true);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const handleUser = () => {
    setIsUserOpen(true);
    setIsAnalyticsOpen(false);
    setIsPaymentOpen(false)
  };

  const handleAnalytic = () => {
    setIsUserOpen(false);
    setIsAnalyticsOpen(true);
  };

  const handleProduct = () => {
    setIsProductOpen(true);
    setIsAnalyticsOpen(false);
  };

  const handlePayment = () => {
    setIsPaymentOpen(true);
    setIsAnalyticsOpen(false);
  };
  const handleOrder = () => {
    setIsOrderOpen(true);
    setIsAnalyticsOpen(false);
  };

  const handleDelivery = () => {
    setIsDeliveryOpen(true);
    setIsAnalyticsOpen(false);
  };

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
  
    // Reset the state
    setIsLoggedIn(false);
    setUserName("");
  
    window.location.href = "/login"; 
  };


  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="topbar-logo">
          {/* <Image
            src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622745/AARAZ/Image/jxccsnz9anadyjr7qqeb.png"
            alt="Logo"
            width={100}
            height={100}
          /> */}
        </div>
        <input type="search" placeholder="Search..." />
      </div>

      <div className="home">
        <div className="sidebar">
          <ul>
          
            <li onClick={handleAnalytic}>Analytics</li>
            <li onClick={handleProduct}>Products</li>
            <li onClick={handleUser}>User</li>
            <li onClick={handleOrder}>Orders</li>
            <li onClick={handlePayment}>Payments</li>
            <li onClick={handleDelivery}>Delivery Details</li>

          </ul>
         
          <div className="admin-footer">Admin
  <div className="dropdown">
    <button className="dropdown-btn" onClick={toggleUserDropdown}>{userName}</button>
    {userDropdownOpen && (
      <div className="dropdown-content">
        My Account
        <button
          onClick={handleLogout}
          style={{ cursor: "pointer", background: "none", border: "none", color: "#DBD9E8", fontSize: "2rem" }}
        >
          Logout
        </button>
      </div>
    )}
  </div>
</div>

          
        </div>

        {isAnalyticsOpen && (
          <div className="analytics">
            <div className="background">
              <h1>Analytics</h1>
              <div className="background-analytics">
                <div className="analytics-card">Products</div>
                <div className="analytics-card">Users</div>
                <div className="analytics-card">Orders</div>
              </div>
            </div>
          </div>
        )}

        {isUserOpen && <Users />}
        
        {/* {isProductOpen && <Product/>} */}
        {isPaymentOpen && <Payments/>}
        {isOrderOpen && <Orders/>}
        {isDeliveryOpen && <DeliveryDetails/>}

      </div>
    </div>
  );
};

export default Dashboard;
