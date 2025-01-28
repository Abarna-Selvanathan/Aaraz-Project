
import "../../../components/Admin/Order/order.css"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Orders: React.FC = () => {
  return (
    <div className="main-content">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="topbar-logo">
          {/* Using the Next.js Image component */}
          <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622745/AARAZ/Image/jxccsnz9anadyjr7qqeb.png" alt="Logo" width={100} height={100} />
        </div>
        <input type="search" placeholder="Search..." />
      </div>

      {/* Sidebar and Main Content */}
      <div className="home">
        {/* Sidebar */}
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

        {/* Orders Section */}
        <div className="analytics">
          <div className="background-products">
            <h1>Orders</h1>
            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Order Details</th>
                    <th>Total Amount</th>
                    <th>Payment Status</th>
                    <th>Delivery Address</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table rows left empty as placeholders */}
                  {[...Array(3)].map((_, index) => (
                    <tr key={index}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
