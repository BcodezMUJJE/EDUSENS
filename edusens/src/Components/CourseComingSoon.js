import React, { useState } from 'react';
import './CourseComingSoon.css';

const CourseComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In production, send to backend API
      console.log('Email submitted for notifications:', email);
    }, 1500);
  };

  return (
    <div className="course-coming-soon">
      <div className="hero-container">
        {/* Hero Section */}
        <div className="hero-card">
          <div className="hero-icon">
            <div className="rocket-icon">
              <span className="rocket">🚀</span>
            </div>
            <div className="launch-badge">
              Launching Soon
            </div>
          </div>
          
          <h1 className="hero-title">Revolutionary Career Guidance Platform</h1>
          
          <p className="hero-subtitle">
            Transform your career journey with AI-powered guidance, expert mentorship, 
            and personalized learning paths designed for the modern professional. 
            Join thousands of professionals who are already preparing for their next career breakthrough.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-section">
          <h2 className="features-title">What Makes Us Different</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>AI Career Matching</h3>
              <p>Smart algorithms analyze your skills and interests to match you with perfect career paths</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Mentorship</h3>
              <p>Connect with industry leaders and experienced career coaches for personalized guidance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Growth Tracking</h3>
              <p>Monitor your progress with detailed analytics and milestone achievements</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Certifications</h3>
              <p>Earn industry-recognized certificates to boost your professional profile</p>
            </div>
          </div>
        </div>

        {/* Email Notification Section */}
        <div className="notification-section">
          {!isSubmitted ? (
            <div className="notification-form">
              <h2 className="form-title">Be the First to Know</h2>
              <p className="form-subtitle">
                Get notified when we launch and receive exclusive early access
              </p>
              
              <form onSubmit={handleEmailSubmit} className="email-form">
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`email-input ${error ? 'input-error' : ''}`}
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    className={`notify-btn ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading || !email.trim()}
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      'Notify Me'
                    )}
                  </button>
                </div>
                {error && <p className="error-message">{error}</p>}
              </form>
              
              <p className="privacy-note">
                <span className="lock-icon">🔒</span> 
                We respect your privacy. No spam, unsubscribe anytime.
              </p>
            </div>
          ) : (
            <div className="success-card">
              <div className="success-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#10B981" className="check-circle"/>
                  <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-mark"/>
                </svg>
              </div>
              <h2 className="success-title">You're on the list!</h2>
              <p className="success-message">
                We'll notify you at <strong>{email}</strong> when the platform launches.
              </p>
              <p className="launch-timeline">
                Expected launch: <strong>Q4 2025</strong>
              </p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                  setError('');
                }}
              >
                Subscribe Another Email
              </button>
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">30+</div>
              <div className="stat-label">Career Paths</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Expert Mentors</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComingSoon;