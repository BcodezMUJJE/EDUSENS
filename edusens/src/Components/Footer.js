import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-logo">EduSens</h2>
          <p className="footer-region">AFRICA</p>
          <p className="footer-tagline">Discover Your Path. Shape Your Future</p>
        </div>
        
        <div className="footer-right">
          <div className="social-section">
            <h3 className="social-title">Let's Socialize</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="social-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="social-icon" />
              </a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">© 2025 EduSens. All rights reserved.</p>
            <div className="language-selector">
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;