import React from 'react';
import { Link } from 'react-router-dom';
import './Components.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-top">
        <div className="logo">CEMA Health</div>
        <div className="header-spacer" />
      </div>

      {/* Display nav links on all devices */}
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/clients">Client List</Link>
        <Link to="/appointments">Appointments</Link>
      </nav>
    </header>
  );
};

export default Header;
