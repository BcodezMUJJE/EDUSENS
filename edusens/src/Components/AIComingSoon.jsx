import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AIComingSoon.css';

const AIComingSoon = () => {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this email to your backend
    console.log('Coming Soon notification email:', email);
    setNotified(true);
    setEmail('');
    
    // Hide notification success message after 3 seconds
    setTimeout(() => {
      setNotified(false);
    }, 3000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="ai-coming-soon-page">
      <div className="ai-coming-soon-container">
        <div className="ai-coming-soon-header">
          <div className="ai-icon">
            <i className="fas fa-robot"></i>
          </div>
          <h1>Coming Soon</h1>
        </div>

        <div className="ai-coming-soon-content">
          <p>
            Our AI career quiz is currently in development. We're working hard to bring
            you an intelligent, personalized career matching experience that understands your unique
            preferences and provides tailored career recommendations.
          </p>

          <div className="feature-preview">
            <h3>What to expect when we launch:</h3>
            <ul>
              <li><i className="fas fa-comments"></i> Interactive career exploration quiz</li>
              <li><i className="fas fa-user-graduate"></i> AI-powered career matching</li>
              <li><i className="fas fa-industry"></i> Industry-specific insights and trends</li>
              <li><i className="fas fa-brain"></i> Personalized skill recommendations</li>
            </ul>
          </div>

          {notified ? (
            <div className="notify-success">
              <i className="fas fa-check-circle"></i> Thank you! We'll notify you when our AI career quiz is ready.
            </div>
          ) : (
            <form className="notify-form" onSubmit={handleSubmit}>
              <h3>Be the first to know when we launch:</h3>
              <div className="input-group">
                <input
                  type="email"
                  className="notify-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="notify-button">
                  Notify Me
                </button>
              </div>
            </form>
          )}
          
          <button className="go-back-button" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIComingSoon;
