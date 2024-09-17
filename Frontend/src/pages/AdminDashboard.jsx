// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/users">User Management</Link>
        </li>
        <li>
          <Link to="/admin/events">Event Management</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
