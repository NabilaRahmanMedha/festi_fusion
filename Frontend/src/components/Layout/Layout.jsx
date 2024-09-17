import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

import Header from '../Header/Header';
import Routers from '../../router/Routers';
import Footer from '../footer/Footer';
import AdminLayout from '../AdminLayout/AdminLayout';

const Layout = () => {
  const location = useLocation(); // Use useLocation to get the current path
  const isAdminRoute = location.pathname.startsWith('/admin'); // Check if it's an admin route

  return (
    <>
      {isAdminRoute ? (
        <AdminLayout>
          <Footer />
        </AdminLayout>
      ) : (
        <>
          <Header />
          <Routers /> 
          <Footer /> 
        </>
      )}
    </>
  );
};

export default Layout;
