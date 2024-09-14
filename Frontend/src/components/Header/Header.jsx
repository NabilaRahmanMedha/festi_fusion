import React, { useRef, useContext, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import './header.css';

import { AuthContext } from '../../context/AuthContext';

const nav__links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/events',
    display: 'Events',
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const [sidebar, setSidebar] = useState(false); // Sidebar state

  const toggleSidebar = () => {
    setSidebar(!sidebar); // Toggles the sidebar
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <>
      <header className='header'>
        <Container>
          <Row>
            <div className='nav__wrapper d-flex align-items-center justify-content-between'>
              {/* ========== Logo ========== */}
              <div className='logo'>
                <img src={logo} alt='Logo' />
              </div>
              {/* ========== Logo End ========== */}

              {/* Menu */}
              <div className='navigation'>
                <ul className='menu d-flex align-items-center gap-5'>
                  {nav__links.map((item, index) => (
                    <li className='nav__item' key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? 'active__link' : ''
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buttons and Mobile Menu */}
              <div className='nav__right d-flex align-items-center gap-4'>
                <div className='nav__btns d-flex align-items-center gap-4'>
                  {user ? (
                    <>
                      <h5 className='mb-0'>{user.username}</h5>
                      <Button className='btn btn-dark' onClick={logout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className='btn secondary__btn'>
                        <Link to='/login'>Login</Link>
                      </Button>
                      <Button className='btn primary__btn'>
                        <Link to='/register'>Register</Link>
                      </Button>
                    </>
                  )}
                </div>

                {/* Mobile Menu Icon */}
                <span className='mobile__menu' onClick={toggleSidebar}>
                  <i className='ri-menu-line'></i>
                </span>
              </div>
            </div>
          </Row>
        </Container>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${sidebar ? 'active' : ''}`}>
        <button className='close-btn' onClick={toggleSidebar}>
          &times;
        </button>
        <ul>
          {nav__links.map((item, index) => (
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
    </>
  );
};

export default Header;
