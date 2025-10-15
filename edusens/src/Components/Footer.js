import React from 'react';
import ScrollLink from './ScrollLink';
import './Footer.css';
import EdusensLogo from '../Assets/Eddd1.png';

const Footer = () => {
  return (
    <footer className="edusens-footer">
      <div className="footer-content">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <img src={EdusensLogo} alt="EduSens Africa" className="footer-logo-img" />
            <p className="footer-tagline">Discover Your Path. Shape Your Future</p>
          </div>

          {/* About Us Section */}
          <div className="footer-section about-section">
            <h3 className="section-title">About Us</h3>
            <p className="about-text">
              EduSens Africa empowers students and professionals across Africa with AI-driven career guidance, 
              comprehensive education programs, and job shadowing opportunities to shape successful futures.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section links-section">
            <h3 className="section-title">Quick Links</h3>
            <nav className="footer-nav">
              <ScrollLink to="/" className="footer-link">Home</ScrollLink>
              <ScrollLink to="/Our-Services" className="footer-link">Our Services</ScrollLink>
              <ScrollLink to="/Ai-Careers" className="footer-link">AI Careers</ScrollLink>
              <ScrollLink to="/Edusens-Careers" className="footer-link">Career Explorer</ScrollLink>
              <ScrollLink to="/job-shadowing" className="footer-link">Job Shadowing</ScrollLink>
              <ScrollLink to="/contact-us" className="footer-link">Contact Us</ScrollLink>
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="footer-section social-section">
            <h3 className="section-title">Connect With Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/share/1GVbsYoM5b/" 
                 aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/metrine-bwisa-883123376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                 aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@edusensafrica?si=B84cnVI8F0ufw6Zj" 
                 aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://x.com/edusensafrica?t=mg-Ut0p7PeL0" 
                 aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="legal-links">
              <ScrollLink to="/terms-and-conditions" className="legal-link">Terms & Conditions</ScrollLink>
              <span className="link-divider">•</span>
              <ScrollLink to="/privacy-policy" className="legal-link">Privacy Policy</ScrollLink>
            </div>
            <p className="copyright">© 2025 EduSens Africa. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;