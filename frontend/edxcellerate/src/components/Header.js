import React from 'react';
import './Header.css'; // Import the CSS file
import logo from '../assets/images/logo.png'; // Import the logo image
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="EdXcellerater" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className={`nav-item${location.pathname === '/my-pathways' ? ' nav-link-active' : ''}`}>
            <Link to="/my-pathways">My Pathways</Link>
          </li>
          <li className={`nav-item${location.pathname === '/' ? ' nav-link-active' : ''}`}>
            <Link to="/">Explore Courses</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
