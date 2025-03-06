import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.svg';

function Navbar({ onLogoClick }) {
  return (
    <nav className="navbar">
      <div className="logo-container" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Deputy Logo" className="logo" />
      </div>
    </nav>
  );
}

export default Navbar; 