
import React from 'react';
import Image from 'next/image';
import '../../../components/Admin/Dashbord/dashboard.css'
import Link from 'next/link';

const Dashboard: React.FC = () => {
  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="topbar-logo">
          <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622745/AARAZ/Image/jxccsnz9anadyjr7qqeb.png" alt="Logo" width={100} height={100} />
        </div>
        <input type="search" placeholder="Search..." />
      </div>

      <div className="home">
        <div className="sidebar">
          <ul>
            <li ><Link href="/admin/dashboard"style={{ color: "#4C394F" }}>Analytics</Link></li>
            <li ><Link href="/admin/product"  style={{ color: "#4C394F" }}>Products</Link></li>
            <li ><Link href="/admin/user"     style={{ color: "#4C394F" }}>Users</Link></li>
            <li ><Link href="/admin/order"    style={{ color: "#4C394F" }}>Orders</Link></li>
            <li ><Link href="/admin/payment"  style={{ color: "#4C394F" }}>Payments</Link></li>
            <li ><Link href="/admin/delivery" style={{ color: "#4C394F" }}>Delivery Details</Link></li>
          </ul>
          <div className="admin-footer">Admin</div>
        </div>

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
      </div>
    </div>
  );
};

export default Dashboard;
