import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Routers from '../../router/Routers';
import Footer from '../footer/Footer';
import AdminLayout from '../AdminLayout/AdminLayout';

import { AuthContext } from '../../context/AuthContext'; // Import AuthContext for authentication
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for logout navigation

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const { user, dispatch } = useContext(AuthContext); // Extract user and dispatch from AuthContext

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/'); // Redirect to home after logout
  };

  return (
    <>
      {isAdminRoute ? (
        <AdminLayout>
          <Routers />
          <Footer />
        </AdminLayout>
      ) : (
        <>
          <Header />
          <Routers />
          <Footer />

          {/* Display Logout Button if user is logged in */}
          {user && (
            <div className="logout-container" style={{ textAlign: 'right', padding: '10px' }}>
              <h5>Welcome, {user.username}</h5>
              <Button className="btn primary__btn" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Layout;
