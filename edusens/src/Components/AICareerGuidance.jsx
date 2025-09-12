import React, { useState, useEffect } from 'react';
import './AICareerGuidance.css';

const AICareerGuidance = () => {
  const [animate, setAnimate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [tellMeEmail, setTellMeEmail] = useState('');
  const [tellMeNotified, setTellMeNotified] = useState(false);

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

  const handleLearnMore = () => {
    setShowDetails(true);
  };

  const handleTellMeAboutYou = () => {
    setShowComingSoon(true);
  };

  const closeComingSoon = () => {
    setShowComingSoon(false);
  };

  const handleTellMeSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this email to your backend
    console.log('Tell Me About You notification email:', tellMeEmail);
    setTellMeNotified(true);
    setTellMeEmail('');
    
    // Hide notification success message after 3 seconds
    setTimeout(() => {
      setTellMeNotified(false);
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
          
          {!showDetails && (
            <button className="learn-more-button" onClick={handleLearnMore}>
              Learn More
            </button>
          )}
          
          {showDetails && (
            <div className="detailed-info">
              <h3>How AI Guides Your Career Journey</h3>
              <p>
                Our AI-powered system analyzes your skills, interests, and career aspirations to provide
                personalized guidance. We use advanced natural language processing and machine learning
                algorithms to understand your unique profile and match it with industry trends and
                requirements.
              </p>
              
              <div className="info-section">
                <h4><i className="fas fa-lightbulb"></i> What makes our AI guidance unique?</h4>
                <ul>
                  <li>Personalized recommendations based on your specific profile</li>
                  <li>Real-time industry data integration for up-to-date guidance</li>
                  <li>Skill gap analysis with tailored learning resources</li>
                  <li>Career trajectory simulation to visualize potential paths</li>
                </ul>
              </div>
              
              <div className="user-interaction">
                <p>Want to see how our AI guidance works for you?</p>
                <button 
                  className="tell-me-button" 
                  onClick={handleTellMeAboutYou}
                >
                  Tell me a bit about you – anything!
                </button>
              </div>
            </div>
          )}
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
      
      {/* AI Career Guidance Coming Soon Popup */}
      <div className={`coming-soon-popup tell-me-popup ${showComingSoon ? 'show' : ''}`}>
        <div className="popup-content">
          <button className="popup-close" onClick={closeComingSoon}>
            <i className="fas fa-times"></i>
          </button>
          <div className="ai-popup-icon">
            <i className="fas fa-robot"></i>
          </div>
          <h2>AI Career Guidance Coming Soon</h2>
          <p>
            Our AI career advisor is currently learning and training to provide you with
            the most accurate and personalized career guidance. We'll notify you as soon
            as this feature becomes available.
          </p>
          
          {tellMeNotified ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i> Thank you! We'll notify you when our AI career advisor is ready.
            </div>
          ) : (
            <form className="notify-form" onSubmit={handleTellMeSubmit}>
              <input
                type="email"
                className="notify-input"
                placeholder="Your email address"
                value={tellMeEmail}
                onChange={(e) => setTellMeEmail(e.target.value)}
                required
              />
              <button type="submit" className="notify-button">
                Notify Me
              </button>
            </form>
          )}
          
          <div className="ai-features">
            <div className="ai-feature">
              <i className="fas fa-comments"></i>
              <span>Conversational AI</span>
            </div>
            <div className="ai-feature">
              <i className="fas fa-user-graduate"></i>
              <span>Personalized Advice</span>
            </div>
            <div className="ai-feature">
              <i className="fas fa-industry"></i>
              <span>Industry Insights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICareerGuidance;