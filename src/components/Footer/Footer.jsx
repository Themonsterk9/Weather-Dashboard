import React from 'react';
import { CloudRain } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <CloudRain className="footer-logo-icon" size={20} />
          <span>SkyFlow Weather</span>
        </div>
        <p className="copyright-text">
          © {currentYear} SkyFlow. Crafted with passion. Data sourced from OpenWeather API.
        </p>
        <div className="footer-links">
          <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="footer-link">
            API Documentation
          </a>
          <span className="divider">•</span>
          <a href="/about" className="footer-link">
            About & Setup
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
