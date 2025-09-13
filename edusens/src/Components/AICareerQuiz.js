import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AICareerQuiz.css';

const AICareerQuiz = () => {
  const navigate = useNavigate();

  const handleTellMeAboutYou = () => {
    navigate('/ai-coming-soon');
  };

  return (
    <div className="services-container">
      <div className="services-content">
        <div className="text-section">
          <p className="adventure-text">
            <span role="img" aria-label="party popper">🎉</span> Let's kick off your adventure!
          </p>
          <p className="main-text">
            Take our super fun quiz and let our AI match you with careers you'll actually love.
          </p>
          <p className="main-text">The more you share, the better it gets.</p>
          <p className="main-text">
            Ready to explore? Let's go! <span role="img" aria-label="rocket">🚀</span>
          </p>
        </div>
        <div className="button-section">
          <button className="cta-button" onClick={handleTellMeAboutYou}>
            Tell me a bit about you - anything!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICareerQuiz;