import React from 'react';
import { Link } from 'react-router-dom';
import './ComingSoon.css';
import Logo from '../Assets/Logoo.png';

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <img src={Logo} alt="EduSens Logo" className="coming-soon-logo" />
        <h1 className="coming-soon-title">Coming Soon!</h1>
        <p className="coming-soon-message">
          Our Job Shadowing feature is currently under development.
          We're working hard to bring you an amazing experience that will help you
          test-drive your dream job with real professionals.
        </p>
        <p className="coming-soon-submessage">
          Thank you for your interest! Please check back soon for updates.
        </p>
        <Link to="/" className="back-home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
