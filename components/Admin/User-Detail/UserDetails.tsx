'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  userType: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface Order {
  orderId: string;
  date: string;
  totalAmount: number;
  status: string;
}

interface Payment {
  paymentId: string;
  amount: number;
  method: string;
  date: string;
}

const UserDetails: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userRes = await axios.get(`/api/user/${userId}`);
        setUser(userRes.data.user);

        const orderRes = await axios.get(`/api/orders?userId=${userId}`);
        setOrders(orderRes.data.orders);

        const paymentRes = await axios.get(`/api/payments?userId=${userId}`);
        setPayments(paymentRes.data.payments);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="user-details">
      <h1>{user.name}'s Details</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phoneNumber}</p>
      <p><strong>Address:</strong> {user.address}</p>

      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.date}</td>
              <td>${order.totalAmount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>${payment.amount}</td>
              <td>{payment.method}</td>
              <td>{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
