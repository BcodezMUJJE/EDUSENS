import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from '../Assets/Logoo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  
  // Track scroll position to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track screen width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 1023) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close menu when clicking on a link
  const handleLinkClick = () => {
    if (screenWidth <= 1023) {
      setIsMenuOpen(false);
    }
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          event.target.closest('.navbar-right') === null && 
          event.target.closest('.menu-toggle') === null) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="navbar-wrapper">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left-aligned logo */}
          <div className="navbar-brand">
            <Link to="/">
              <img 
                src={Logo} 
                alt="EduSens Africa" 
                className="navbar-logo"
              />
            </Link>
          </div>
          
          {/* Right-aligned navigation and auth button */}
          <div className="navbar-right">
            {/* Mobile menu toggle button */}
            <button 
              className="menu-toggle" 
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            
            {/* Main navigation links */}
            <div className={`main-links ${isMenuOpen ? 'active' : ''}`}>
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                HOME
              </Link>
              <Link 
                to="/Our-Services" 
                className={`nav-link ${location.pathname === '/Our-Services' ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                OUR SERVICES
              </Link>
              <Link 
                to="/contact-us" 
                className={`nav-link ${location.pathname === '/contact-us' ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                CONTACT
              </Link>
              
              {/* Auth button (inside mobile menu for small screens) */}
              {screenWidth <= 767 && (
                <div className="auth-button-container">
                  <Link to="/auth" className="auth-button" onClick={handleLinkClick}>
                    <span className="auth-button-text">Sign Up / Log In</span>
                    <svg className="auth-button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Auth button (outside mobile menu for larger screens) */}
            {screenWidth > 767 && (
              <div className="auth-button-container">
                <Link to="/auth" className="auth-button">
                  <span className="auth-button-text">Sign Up / Log In</span>
                  <svg className="auth-button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Optional green accent bar */}
      <div className="navbar-indicator">
        <div className="indicator-dots">
          <div className={`indicator-dot ${location.pathname === '/' ? 'active' : ''}`}></div>
          <div className={`indicator-dot ${location.pathname === '/Our-Services' ? 'active' : ''}`}></div>
          <div className={`indicator-dot ${location.pathname === '/contact-us' ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
