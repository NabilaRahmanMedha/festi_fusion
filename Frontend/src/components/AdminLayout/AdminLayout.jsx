import React, { useRef, useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import './adminLayout.css';

import { AuthContext } from '../../context/AuthContext';

const adminNavLinks = [
  {
    path: '/admin',
    display: 'Dashboard',
  },
  {
    path: '/admin/users',
    display: 'User Management',
  },
  {
    path: '/admin/events',
    display: 'Event Management',
  },
];

const AdminLayout = ({ children }) => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);

  // Toggle the sidebar
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  // Add sticky header logic
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 80) {
          headerRef.current.classList.add('sticky_header');
        } else {
          headerRef.current.classList.remove('sticky_header');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="admin_header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper d-flex align-items-center justify-content-between">
              {/* Logo */}
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>

              {/* Navigation Menu */}
              <div className="navigation">
                <ul className="menu d-flex align-items-center gap-5">
                  {adminNavLinks.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) =>
                          isActive ? 'active__link' : ''
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logout Button */}
              <div className="nav__right d-flex align-items-center gap-4">
                {user && user.role === 'admin' && (
                  <>
                    <span className="user-name">{user.username}</span>
                    <Button className="btn primary__btn" onClick={logout}>
                      Logout
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Icon */}
              <span className="mobile__menu" onClick={toggleSidebar}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </Row>
        </Container>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${sidebar ? 'active' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        <ul>
          {adminNavLinks.map((item, index) => (
            <li key={index}>
              <Link to={item.path} onClick={toggleSidebar}>
                {item.display}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${sidebar ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>

      {/* Main Content */}
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
