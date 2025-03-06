'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../../../components/Admin/Dashbord/dashboard.css';
import Users from '../User/user';
// import Payments from '../Payment/payment';
import Product from '../Product/product';
import Orders from '../Order/order';
// import DeliveryDetails from '../Delivery/delivery';
import Loader from '../../Loader/loader';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Analytics");
  const [userType, setUserType] = useState<string | null>(null); 
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/cookie');
        setUserType(data?.user?.userType);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to verify user.");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userType === "customer") {
      router.push('/');
    }
  }, [userType, router]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [productsResponse, usersResponse, ordersResponse] = await Promise.all([
          axios.get('/api/product/count'),
          axios.get('/api/user/count'),
          axios.get('/api/order/count'),
        ]);

        setTotalProducts(productsResponse.data.count);
        setTotalUsers(usersResponse.data.count);
        setTotalOrders(ordersResponse.data.count);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setError("Failed to load analytics data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="error">{error}</p>;
  if (!userType) return null; // Prevent rendering if userType is not yet fetched

  return (
    <div className="main-content">
      <div className="NavbarAdmin">
        <div className="Navbar-links">
          <ul>
            {["Analytics", "Products", "User", "Orders", "Payments"].map((tab) => (
              <li
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={activeTab === tab ? "active-tab" : ""}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="content">
        {activeTab === "Analytics" && (
          <div className="analytics">
            <h1>Analytics</h1>
            <div className="analytics-cards">
              <div className="analytics-card">
                <h2>Total Products</h2>
                <p>{totalProducts}</p>
              </div>
              <div className="analytics-card">
                <h2>Total Users</h2>
                <p>{totalUsers}</p>
              </div>
              <div className="analytics-card">
                <h2>Total Orders</h2>
                <p>{totalOrders}</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "User" && <Users />}
        {activeTab === "Products" && <Product />}
        {/* {activeTab === "Payments" && <Payments />} */}
        {activeTab === "Orders" && <Orders />}

      </div>
    </div>
  );
};

export default Dashboard;
