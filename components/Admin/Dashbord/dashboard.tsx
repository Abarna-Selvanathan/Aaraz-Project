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

  // const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  // const toggleUserDropdown = () => {
  //   setUserDropdownOpen(!userDropdownOpen);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   setUserName("");
  //   window.location.href = "/login";
  // };

  return (
    <div className="main-content">
      

      <div className="content">
        {isAnalyticsOpen && (
          <div className="analytics">
            <h1>Analytics</h1>
            <div className="analytics-cards">
              <div className="analytics-card">Products</div>
              <div className="analytics-card">Users</div>
              <div className="analytics-card">Orders</div>
            </div>
          </div>
        )}

        {isUserOpen && <Users />}
        {isProductOpen && <Product />}
        {isPaymentOpen && <Payments />}
        {isOrderOpen && <Orders />}
        {isDeliveryOpen && <DeliveryDetails />}
      </div>
    </div>
  );
};

export default Dashboard;