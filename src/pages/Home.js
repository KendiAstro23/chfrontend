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
         {/* Services Section */}
      <section className="services-section py-16 px-6 md:px-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">Our Services</h2>
        <div className="services-container grid md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="service-card">
            <Link to="/services#health-assessments" className="service-link">
              <div className="service-card-body">
                <img src="/images/Consultation.jpg" alt="Health Assessments" className="service-card-image" />
                <h3>Health Assessments</h3>
                <p>Comprehensive health check-ups to assess your wellness.</p>
              </div>
            </Link>
          </div>

          {/* Service Card 2 */}
          <div className="service-card">
            <Link to="/services#wellness-programs" className="service-link">
              <div className="service-card-body">
                <img src="/images/support.jpg" alt="Wellness Programs" className="service-card-image" />
                <h3>Wellness Programs</h3>
                <p>Personalized programs to help you stay healthy and active.</p>
              </div>
            </Link>
          </div>

          {/* Service Card 3 */}
          <div className="service-card">
            <Link to="/services#nutritional-counseling" className="service-link">
              <div className="service-card-body">
                <img src="/images/nutrition.jpg" alt="Nutritional Counseling" className="service-card-image" />
                <h3>Nutritional Counseling</h3>
                <p>Expert advice on diet and nutrition to improve your health.</p>
              </div>
            </Link>
          </div>

          {/* Service Card 4 */}
          <div className="service-card">
            <Link to="/services#mental-health-support" className="service-link">
              <div className="service-card-body">
                <img src="/images/mental_health.jpg" alt="Mental Health Support" className="service-card-image" />
                <h3>Mental Health Support</h3>
                <p>Professional guidance for maintaining your mental well-being.</p>
              </div>
            </Link>
          </div>

          {/* Service Card 5 */}
          <div className="service-card">
            <Link to="/services#fitness-training" className="service-link">
              <div className="service-card-body">
                <img src="/images/physical.jpg" alt="Fitness Training" className="service-card-image" />
                <h3>Fitness Training</h3>
                <p>Get personalized fitness training plans and coaching.</p>
              </div>
            </Link>
          </div>

          {/* Service Card 6 */}
          <div className="service-card">
            <Link to="/services#health-coaching" className="service-link">
              <div className="service-card-body">
                <img src="/images/checkup.jpg" alt="Health Coaching" className="service-card-image" />
                <h3>Health Coaching</h3>
                <p>Work with a health coach to achieve your wellness goals.</p>
              </div>
            </Link>
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
