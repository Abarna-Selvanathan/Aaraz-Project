'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import "../../../components/Admin/Product/product.css"
// import "../../src/app/globals.css";



interface user {
  username: string;
  userId: string;
  email: string;
  phoneNumber: string;
  address: string;
}


const Payments: React.FC = () => {

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
    <div className="main-content-Product">
      <div className="ProductTable">
        <div className="products">
          <h1>Payments Details</h1>
          <div className="table-container">
            <table className="product-table">


              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Order ID</th>
                  <th>Payment ID</th>
                  <th>Payment Status</th>
                  <th>Payment Date</th>
                  <th>Total Amount</th>
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

export default Payments;
