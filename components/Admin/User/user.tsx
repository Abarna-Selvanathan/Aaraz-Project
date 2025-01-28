import "../../../components/Admin/User/user.css";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface User {
  username: string;
  userId: string;
  email: string; 
  phoneNumber: string;
  address: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/user');
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="main-content">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="topbar-logo">
          {/* Using Next.js Image component */}
          <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622745/AARAZ/Image/jxccsnz9anadyjr7qqeb.png" alt="Logo" width={50} height={50} />
        </div>
        <input type="search" placeholder="Search..." />
      </div>

      {/* Sidebar and Main Content */}
      <div className="home">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li><Link href="/admin/dashboard" style={{ color: "#4C394F" }}>Analytics</Link></li>
            <li><Link href="/admin/product" style={{ color: "#4C394F" }}>Products</Link></li>
            <li><Link href="/admin/user" style={{ color: "#4C394F" }}>Users</Link></li>
            <li><Link href="/admin/order" style={{ color: "#4C394F" }}>Orders</Link></li>
            <li><Link href="/admin/payment" style={{ color: "#4C394F" }}>Payments</Link></li>
            <li><Link href="/admin/delivery" style={{ color: "#4C394F" }}>Delivery Details</Link></li>
          </ul>
          <div className="admin-footer">Admin</div>
        </div>

        {/* Users Section */}
        <div className="analytics">
          <div className="background-products">
            <h1>Users</h1>
            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.username}</td>
                      <td>{user.userId}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.address}</td>
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

export default Users;
