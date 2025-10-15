import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';  // Commented out - auth disabled
import ScrollLink from './ScrollLink';
import './Navbar.css';
import Logo from '../Assets/Logoo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  // const navigate = useNavigate();  // Commented out - auth disabled
  
  // Auth context usage commented out - auth disabled
  // const { user, logout, loading } = useContext(AuthContext);
  
  // Debug log commented out - auth disabled
  // useEffect(() => {
  //   console.log("Navbar - Current User:", user);
  //   console.log("Navbar - Auth Loading:", loading);
  // }, [user, loading]);
  
  // Handle user logout commented out - auth disabled
  // const handleLogout = async () => {
  //   try {
  //     const result = await logout();
  //     if (result.success) {
  //       console.log("Navbar - Logout successful");
  //       navigate('/');
  //       setIsMenuOpen(false);
  //     } else {
  //       console.error("Navbar - Logout failed:", result.message);
  //     }
  //   } catch (error) {
  //     console.error("Navbar - Logout error:", error);
  //   }
  // };
  
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
  
  // Close menu when clicking on a link and scroll to top
  const handleLinkClick = () => {
    if (screenWidth <= 1023) {
      setIsMenuOpen(false);
    }
    // Scroll to top of the page
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
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
              <ScrollLink 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                HOME
              </ScrollLink>
              <ScrollLink 
                to="/Our-Services" 
                className={`nav-link ${location.pathname === '/Our-Services' ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                OUR SERVICES
              </ScrollLink>
              <ScrollLink 
                to="/contact-us" 
                className={`nav-link ${location.pathname === '/contact-us' ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                CONTACT
              </ScrollLink>
              
              {/* Auth section inside mobile menu for small screens - COMMENTED OUT */}
              {/* {screenWidth <= 767 && (
                <div className="auth-button-container">
                  {user ? (
                    <div className="user-dropdown-container mobile">
                      <div className="user-avatar-wrapper">
                        <div className="user-avatar">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt="Profile" className="avatar-image" />
                          ) : (
                            <div className="avatar-initial">
                              {(user.full_name || user.username || user.email || 'U')[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="user-dropdown">
                          <div className="dropdown-header">
                            <span className="dropdown-username">{user.username || user.full_name || user.email || 'User'}</span>
                          </div>
                          <div className="dropdown-divider"></div>
                          <button onClick={handleLogout} className="dropdown-logout-button">
                            <svg className="logout-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 16l4-4m0 0l-4-4m4 4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link to="/auth" className="auth-button" onClick={handleLinkClick}>
                      <span className="auth-button-text">Sign Up / Log In</span>
                      <svg className="auth-button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  )}
                </div>
              )} */}
            </div>
            
            {/* Auth section outside mobile menu for larger screens - COMMENTED OUT */}
            {/* {screenWidth > 767 && (
              <div className="auth-button-container">
                {user ? (
                  <div className="user-dropdown-container desktop">
                    <div className="user-avatar-wrapper">
                      <div className="user-avatar">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt="Profile" className="avatar-image" />
                        ) : (
                          <div className="avatar-initial">
                            {(user.full_name || user.username || user.email || 'U')[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="user-dropdown">
                        <div className="dropdown-header">
                          <span className="dropdown-username">{user.username || user.full_name || user.email || 'User'}</span>
                        </div>
                        <div className="dropdown-divider"></div>
                        <button onClick={handleLogout} className="dropdown-logout-button">
                          <svg className="logout-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 16l4-4m0 0l-4-4m4 4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to="/auth" className="auth-button">
                    <span className="auth-button-text">Sign Up / Log In</span>
                    <svg className="auth-button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                )}
              </div>
            )} */}
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
