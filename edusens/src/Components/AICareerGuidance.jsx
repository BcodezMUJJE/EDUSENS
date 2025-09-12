import React, { useState, useEffect } from 'react';
import './AICareerGuidance.css';

const AICareerGuidance = () => {
  const [animate, setAnimate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this email to your backend
    console.log('Notify email:', email);
    setNotified(true);
    setEmail('');
    
    // Hide notification success message after 3 seconds
    setTimeout(() => {
      setNotified(false);
    }, 3000);
  };

  return (
    <div className={`career-guidance-container ${animate ? 'animate-in' : ''}`}>
      <div className="career-guidance-card">
        <div className="career-guidance-header">
          <div className="ai-icon">
            <i className="fas fa-robot"></i>
          </div>
          <h1>AI Career Guidance</h1>
          <p>Your personalized AI career advisor for the future of tech</p>
        </div>

        <div className="career-guidance-content">
          <p>
            Our AI-powered career guidance platform is designed to help students navigate
            the complex landscape of technology careers. Get personalized recommendations,
            skills assessment, and a roadmap tailored specifically to your goals and abilities.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <i className="fas fa-brain"></i>
              <h3>Personalized Insights</h3>
              <p>Get career recommendations based on your unique skills and interests</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-chart-line"></i>
              <h3>Skills Analysis</h3>
              <p>Discover your strengths and areas for improvement with AI assessment</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-route"></i>
              <h3>Career Roadmap</h3>
              <p>Follow a customized learning path to achieve your career goals</p>
            </div>
          </div>

          <p>
            Our AI career guidance system is currently in development. We're working hard to bring
            you the most advanced career advisory tools powered by artificial intelligence.
          </p>
        </div>

        <button className="explore-button" onClick={handleExplore}>
          Explore AI Career Guidance
        </button>
      </div>

      <div className={`coming-soon-popup ${showPopup ? 'show' : ''}`}>
        <div className="popup-content">
          <button className="popup-close" onClick={closePopup}>
            <i className="fas fa-times"></i>
          </button>
          <h2>Coming Soon!</h2>
          <p>
            We're working hard to bring you the most advanced AI-powered career guidance platform.
            Be the first to know when we launch!
          </p>
          
          {notified ? (
            <div style={{ color: '#2ecc71', marginBottom: '20px' }}>
              <i className="fas fa-check-circle"></i> Thank you! We'll notify you when we launch.
            </div>
          ) : (
            <form className="notify-form" onSubmit={handleSubmit}>
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
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICareerGuidance;
