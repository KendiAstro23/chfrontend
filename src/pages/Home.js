import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Make sure this file has your styles

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="site-header">
        {/* Header Top: Logo and Spacer */}
        <div className="header-top">
          <div className="logo">CEMA Health</div>
        </div>

        {/* Header Nav Links */}
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/account">Client Account</Link>
        </nav>

        {/* Hamburger Icon */}
        <div className="header-bottom">
          <button className="hamburger" onClick={toggleMenu}>
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </button>
        </div>
      </header>

      {/* Mobile Menu: Appears when Hamburger is clicked */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={toggleMenu}>
          <div className="menu" onClick={e => e.stopPropagation()}>
            <Link to="/" onClick={toggleMenu}>Home</Link>
            <Link to="/services" onClick={toggleMenu}>Services</Link>
            <Link to="/about" onClick={toggleMenu}>About Us</Link>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            <Link to="/account" onClick={toggleMenu}>Client Account</Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url('/images/Hero back.jpg')` }} // Adjust the path if needed
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h2>Welcome to CEMA Health</h2>
          <p>Your health, our priority. Manage your programs and health records with ease.</p>
        </div>
      </section>

       {/* Other Sections */}
       <section id="services" className="section">
        <h2>Our Services</h2>
        <div className="grid-3">
          <div>
            <h3>Personalized Programs</h3>
            <p>Access tailored health programs designed just for you.</p>
          </div>
          <div>
            <h3>Secure Client Portal</h3>
            <p>Track your progress and communicate securely with health professionals.</p>
          </div>
          <div>
            <h3>Professional Support</h3>
            <p>Connect with experienced healthcare providers anytime.</p>
          </div>
        </div>
      </section>

      <section id="about" className="section alt">
        <h2>About Us</h2>
        <p>
          We are a dedicated healthcare provider offering personalized wellness programs designed to help you achieve your health goals.
        </p>
      </section>

      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>Email: info@cemahealth.com</p>
        <p>Phone: +123 456 789</p>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CEMA Health. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
