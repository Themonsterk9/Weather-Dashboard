import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CloudSun, Menu, X, Star, Info, Settings, AlertTriangle } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useWeather } from '../../context/WeatherContext';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { units, toggleUnits, isMock } = useWeather();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header glass-panel">
      <div className="navbar-container">
        {/* Brand Logo */}
        <NavLink to="/" className="brand-logo" onClick={closeMobileMenu}>
          <div className="logo-icon-wrapper">
            <CloudSun className="logo-icon" size={28} />
          </div>
          <span className="brand-name">SkyFlow</span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Star className="icon-link" size={16} /> Favorites
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Info className="icon-link" size={16} /> About & Settings
          </NavLink>
        </nav>

        {/* Actions bar (Theme + Units + Hamburger) */}
        <div className="nav-actions">
          {isMock && (
            <div className="mock-badge" title="No API Key found. Displaying Mock Data.">
              <AlertTriangle size={14} className="mock-badge-icon" />
              <span>Demo Mode</span>
            </div>
          )}
          
          <button 
            className="unit-toggle-btn" 
            onClick={toggleUnits}
            aria-label={`Toggle units. Current: ${units === 'metric' ? 'Celsius' : 'Fahrenheit'}`}
            title={`Switch to ${units === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
          >
            {units === 'metric' ? '°C' : '°F'}
          </button>
          
          <ThemeToggle />
          
          <button 
            className="mobile-hamburger" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <NavLink to="/" end className="mobile-link" onClick={closeMobileMenu}>
            Dashboard
          </NavLink>
          <NavLink to="/favorites" className="mobile-link" onClick={closeMobileMenu}>
            Favorites
          </NavLink>
          <NavLink to="/about" className="mobile-link" onClick={closeMobileMenu}>
            Settings & About
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
