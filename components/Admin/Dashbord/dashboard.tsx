'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Logo from "../../../public/Image/logo.png"
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
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setType] = useState("admin");
  

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/cookie');
        console.log(data) 
        setType(data?.user?.userType)
        
      } catch (error) {
       
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const router = useRouter();

  if (userType === 'customer') {
    router.push('/')
  }

  const handleUser = () => {
    setIsUserOpen(true);
    setIsAnalyticsOpen(false);
    setIsProductOpen(false);
    setIsOrderOpen(false);
    setIsDeliveryOpen(false);
    setIsPaymentOpen(false)
  };

  const handleAnalytic = () => {
    setIsUserOpen(false);
    setIsAnalyticsOpen(true);
    setIsAnalyticsOpen(false);
    setIsProductOpen(false);
    setIsOrderOpen(false);
    setIsDeliveryOpen(false);
    setIsPaymentOpen(false)
  };

  const handleProduct = () => {
    setIsProductOpen(true);
    setIsAnalyticsOpen(false);
    setIsUserOpen(false);
    setIsOrderOpen(false);
    setIsDeliveryOpen(false);
    setIsPaymentOpen(false)
  };

  const handlePayment = () => {
    setIsPaymentOpen(true);
    setIsAnalyticsOpen(false);
    setIsUserOpen(false);
    setIsProductOpen(false);
    setIsOrderOpen(false);
    setIsDeliveryOpen(false)
  };
  const handleOrder = () => {
    setIsOrderOpen(true);
    setIsAnalyticsOpen(false);
    setIsUserOpen(false);
    setIsProductOpen(false);
    setIsDeliveryOpen(false);
    setIsPaymentOpen(false)
  };

  const handleDelivery = () => {
    setIsDeliveryOpen(true);
    setIsAnalyticsOpen(false);
    setIsUserOpen(false);
    setIsProductOpen(false);
    setIsOrderOpen(false);
    setIsPaymentOpen(false)
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
          <Image
            src={Logo}
            alt="Logo"
            width={100}
            height={100}
          />
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
        
        {isProductOpen && <Product/>}
        {isPaymentOpen && <Payments/>}
        {isOrderOpen && <Orders/>}
        {isDeliveryOpen && <DeliveryDetails/>}

      </div>
    </div>
  );
};

export default Dashboard;
