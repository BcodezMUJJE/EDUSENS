import React, { useState } from 'react';
import './CareerExplorer.css';

const CareerExplorer = () => {
  const [careerCode, setCareerCode] = useState('');
  const [activeTab, setActiveTab] = useState('curriculum');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle career code submission here
    console.log('Career code submitted:', careerCode);
  };

  return (
    <div className="career-explorer">
      <header className="header">
        <h1>Awesome job!</h1>
        <p className="subtitle">
          You've unlocked careers that actually <em>*fit*</em> your vibe. Now, dive in and explore what each one's rec
        </p>
        <div className="features">
          <span className="feature-tag">Style</span>
          <span className="feature-tag">Fill</span>
          <span className="feature-tag">Border</span>
          <span className="feature-tag">Shadow</span>
          <span className="feature-tag">... getting started!</span>
        </div>
      </header>

      <div className="divider"></div>

      <main className="main-content">
        <section className="career-code-section">
          <h2>Enter Career Code</h2>
          <form onSubmit={handleSubmit} className="career-code-form">
            <input
              type="text"
              value={careerCode}
              onChange={(e) => setCareerCode(e.target.value)}
              placeholder="Enter your career code here"
              className="code-input"
            />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </section>

        <section className="career-education">
          <h2>Career Education</h2>
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button 
              className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
            <button 
              className={`tab ${activeTab === 'pathways' ? 'active' : ''}`}
              onClick={() => setActiveTab('pathways')}
            >
              Pathways
            </button>
          </div>
          
          <div className="content-area">
            <p>Curriculum Content Shows Here</p>
            {activeTab === 'curriculum' && (
              <div className="tab-content">
                <h3>Recommended Learning Path</h3>
                <ul className="curriculum-list">
                  <li>Foundation Courses</li>
                  <li>Specialization Modules</li>
                  <li>Practical Projects</li>
                  <li>Industry Certifications</li>
                </ul>
              </div>
            )}
            {activeTab === 'resources' && (
              <div className="tab-content">
                <h3>Learning Resources</h3>
                <p>Books, online courses, and materials will be listed here.</p>
              </div>
            )}
            {activeTab === 'pathways' && (
              <div className="tab-content">
                <h3>Career Pathways</h3>
                <p>Potential career trajectories and advancement opportunities.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareerExplorer;
