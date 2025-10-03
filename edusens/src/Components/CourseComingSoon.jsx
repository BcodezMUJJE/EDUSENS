import React, { useState } from 'react';
import './CourseComingSoon.css';

const CourseComingSoon = () => {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNotification({ show: true, type: 'success', message: 'Thank you! We\'ll notify you when courses are available.' });
      setEmail('');
    } else {
      setNotification({ show: true, type: 'error', message: 'Please enter a valid email address.' });
    }
  };

  return (
    <div className="course-coming-soon-page">
      <div className="course-coming-soon-container">
        <div className="course-header">
          <div className="course-icon">📚</div>
          <h1>Courses Coming Soon!</h1>
          <p>Exciting learning opportunities are on the way</p>
        </div>

        <div className="course-content">
          <div className="course-description">
            <p>
              We're working hard to bring you comprehensive courses that will help you excel in your career.
              Our courses will be designed by industry experts and tailored to meet the needs of modern learners.
            </p>
          </div>

          <div className="course-features">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Expert-Led Content</h3>
              <p>Learn from industry professionals with years of experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Self-Paced Learning</h3>
              <p>Study at your own pace, whenever and wherever you want</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Certifications</h3>
              <p>Earn recognized certificates upon course completion</p>
            </div>
          </div>

          <div className="notify-section">
            <h2 className="notify-title">Be the First to Know!</h2>
            <p className="notify-description">
              Sign up to get notified when our courses launch and receive exclusive early-bird discounts.
            </p>
            
            <div className="notify-form-container">
              <form onSubmit={handleSubmit}>
                <div className="email-input-group">
                  <input
                    type="email"
                    className="email-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="notify-submit-btn">
                    Notify Me
                  </button>
                </div>
              </form>
              
              {notification.show && (
                <div className={notification.type === 'success' ? 'success-notification' : 'error-notification'}>
                  {notification.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComingSoon;
