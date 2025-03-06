'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../components/Admin/Product/product.css"
import { Trash2} from "lucide-react";

interface User {
  _id: string;
  name: string;
  userType: string; 
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string; // Add this line
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user');
        console.log("API Response:", response); // Debugging Log

        if (response.status === 200) {
          // Sort users by createdAt in descending order
          const sortedUsers = response.data.users.sort((a: User, b: User) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setUsers(sortedUsers);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/user/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="main-content-Product">
      <div className="ProductTable">
        <div className="products">
          <h1>Users</h1>
          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>User Type</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.userType}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.address}</td>
                    <td className="btns">
                      <button onClick={() => handleDelete(user._id)} className="delete-btn">
                        <Trash2 size={18} /> 
                      </button>
                    </td>
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

export default Users;