import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/user-management.css"; // Add your custom styles here

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://festi-fusion-backend.vercel.app/api/v1/users', { withCredentials: true });
      setUsers(response.data.data); 
    } catch (error) {
      console.log(error);
    }
  };

  // Handle user deletion
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://festi-fusion-backend.vercel.app/api/v1/users/${userId}`, { withCredentials: true });
      fetchUsers()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section>
      <div className="container mt-5">
        <h1 className="text-center mb-5 usermanage">User Management</h1>
        <div className="row">
          {users.length > 0 ? (
            users.map((user) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={user._id}>
                <div className="user-card p-3 shadow-sm">
                  <h5 className="user-username">{user.username}</h5>
                  <p className="user-detail">
                    <strong>Name:</strong> {user.username}
                  </p>
                  <p className="user-detail">
                    <strong>Email:</strong> {user.email}
                  </p>
                  {/* Delete Button */}
                  <button 
                    className="btn primary__btn"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col">
              <p className="text-center">No users found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserManagement;
