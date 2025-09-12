import React from 'react';
import { Link } from 'react-router-dom';
import './ComingSoon.css';
import Logo from '../Assets/Logoo.png';

const AICareerGuidanceComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <img src={Logo} alt="EduSens Logo" className="coming-soon-logo" />
        <div className="ai-icon-large">
          <i className="fas fa-robot"></i>
        </div>
        <h1 className="coming-soon-title">AI Career Guidance Coming Soon!</h1>
        <p className="coming-soon-message">
          Our AI-powered career guidance system is currently under development.
          We're working hard to bring you personalized career insights, skills analysis,
          and roadmaps tailored specifically to your goals and abilities.
        </p>
        <div className="ai-features-coming-soon">
          <div className="feature-preview">
            <i className="fas fa-brain"></i>
            <span>Personalized AI Insights</span>
          </div>
          <div className="feature-preview">
            <i className="fas fa-chart-line"></i>
            <span>Skills Analysis</span>
          </div>
          <div className="feature-preview">
            <i className="fas fa-route"></i>
            <span>Career Roadmap</span>
          </div>
        </div>
        <p className="coming-soon-submessage">
          Thank you for your interest! Our AI career advisor will be ready to help you soon.
        </p>
        <div className="action-buttons">
          <Link to="/ai-career-guidance" className="back-button">
            Back to AI Career Guidance
          </Link>
          <Link to="/" className="back-home-button">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AICareerGuidanceComingSoon;