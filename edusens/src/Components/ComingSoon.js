import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real implementation, you would send this to your backend API
      // For now, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSubmitted(true);
      setEmail('');
      setLoading(false);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">Coming Soon!</h1>
        <p className="coming-soon-message">
          Our Job Shadowing feature is currently under development.
          We're working hard to bring you an amazing experience that will help you
          test-drive your dream job with real professionals.
        </p>
        <p className="coming-soon-submessage">
          Thank you for your interest! Please check back soon for updates.
        </p>
        
        <div className="notify-me-container">
          <h3>Get Notified When We Launch</h3>
          
          {submitted ? (
            <div className="success-message">
              <p>Thank you for your interest! We'll notify you when we launch.</p>
            </div>
          ) : (
            <form className="notify-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={error ? "error-input" : ""}
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Notify Me"}
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </form>
          )}
        </div>
        
        <Link to="/" className="back-home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
