'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from "../../../public/Image/logo.png";
import '../../../components/Admin/Dashbord/dashboard.css';
import Users from '../User/user';
import Payments from "@/pages/admin/payment";
import Product from '@/pages/admin/product';
import Orders from '@/pages/admin/order';
import DeliveryDetails from '@/pages/admin/delivery';
import DashboardPage from '@/pages/admin/dashboard';


const Navbar: React.FC = () => {
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
        console.log(data);
        setType(data?.user?.userType);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const router = useRouter();

  if (userType === 'customer') {
    router.push('/');
  }

  const handleUser = () => {
    setIsUserOpen(true);
    setIsAnalyticsOpen(false);
    setIsProductOpen(false);
    setIsOrderOpen(false);
    setIsDeliveryOpen(false);
    setIsPaymentOpen(false);
  };

  const handleAnalytic = () => {
    setIsUserOpen(false);
    setIsAnalyticsOpen(true);
    setIsProductOpen(false);
    setIsOrderOpen(false);
    setIsDeliveryOpen(false);
    setIsPaymentOpen(false);
  };

  const handleProduct = () => {
    setIsProductOpen(true);
    setIsAnalyticsOpen(false);
    setIsUserOpen(false);
    setIsOrderOpen(false);
    setIsDeliveryOpen(false);
    setIsPaymentOpen(false);
  };

  const handlePayment = () => {
    setIsPaymentOpen(true);
    setIsAnalyticsOpen(false);
    setIsUserOpen(false);
    setIsProductOpen(false);
    setIsOrderOpen(false);
    setIsDeliveryOpen(false);
  };

  const handleOrder = () => {
    setIsOrderOpen(true);
    setIsAnalyticsOpen(false);
    setIsUserOpen(false);
    setIsProductOpen(false);
    setIsDeliveryOpen(false);
    setIsPaymentOpen(false);
  };

  const handleDelivery = () => {
    setIsDeliveryOpen(true);
    setIsAnalyticsOpen(false);
    setIsUserOpen(false);
    setIsProductOpen(false);
    setIsOrderOpen(false);
    setIsPaymentOpen(false);
  };

const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };
const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    window.location.href = "/login";
  };

return(
    <div className="navbar">
    <div className="navbar-logo">
      <Image
        src={Logo}
        alt="Logo"
        width={100}
        height={100}
      />
    </div>
    <div className="navbar-links">
      <ul>
        <li onClick={handleAnalytic}>Analytics</li>
        <li onClick={handleProduct}>Products</li>
        <li onClick={handleUser}>User</li>
        <li onClick={handleOrder}>Orders</li>
        <li onClick={handlePayment}>Payments</li>
        <li onClick={handleDelivery}>Delivery Details</li>
      </ul>
    </div>
    <div className="navbar-search">
      <input type="search" placeholder="Search..." />
    </div>
    <div className="navbar-user">
      <div className="dropdown">
      {/* <div className="fa fa-user" style={{ color: "black" }}></div> */}
        <button className="dropdown-btn" onClick={toggleUserDropdown} style={{ color: "red" }}>{userName}</button>
        {userDropdownOpen && (
          <div className="dropdown-content">
            <button
              onClick={handleLogout}
              style={{ cursor: "pointer", background: "none", border: "none", color: "black", fontSize: "1rem" }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
        {isAnalyticsOpen && <DashboardPage/>}
        {isUserOpen && <Users />}
        {isProductOpen && <Product />}
        {isPaymentOpen && <Payments />}
        {isOrderOpen && <Orders />}
        {isDeliveryOpen && <DeliveryDetails />}
      
  </div>  
)}

export default Navbar;