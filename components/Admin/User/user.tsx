'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import './user.css';

interface User {
  _id: string;
  name: string;
  userType: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user');
        if (response.status === 200) { 
          setUsers(response.data.users); 
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="main-content">
      <div className="analytics">
        <div className="background-products">
          <h1>Users</h1>
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th> User Type</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}> {/* Unique key */}
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user. userType}</td>
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
  );
};

export default Users;
