// src/components/Footer.js
import React from 'react';
import './Components.css'; 

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p className="footer-title">Cema Health</p>
      <p className="footer-description">We are here to help with your healthcare needs. Reach out to us!</p>

      {/* Contact Details */}
      <div className="footer-contact">
        <p><strong>Email:</strong> support@cemahealth.org</p>
        <p><strong>Phone:</strong> +123-456-7890</p>
      </div>

      {/* Footer Rights */}
      <p className="footer-rights">© 2025 Cema Health. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
