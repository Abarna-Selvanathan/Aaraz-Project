'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "../../../components/Admin/Delivery/delivery.css"

interface user {
  username: string;
  userId: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const DeliveryDetails: React.FC = () => {
  const [customers, setCustomers] = useState<user[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user'); // Ensure the endpoint is correct
        console.log(response)
        if (response.status === 201) {
          setCustomers(response.data.customers); // Updated to match the correct response structure
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="main-content">
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
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.username}</td>
                    <td>{customer.userId}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
