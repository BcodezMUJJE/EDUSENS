import React, { useState } from 'react';
import './OurServices.css';

const EduSensServices = () => {
  const [activeTab, setActiveTab] = useState('quiz');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <header>
        <h1>Our Services</h1>
        <div className="header-content">
          <p>We help you skip the confusion and focus on what truly fits you through</p>
        </div>
      </header>

      <div className="services-grid">
        <div className="service-card">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            alt="AI Career Guidance" 
            className="service-img" 
          />
          <div className="service-content">
            <h3>AI Career Guidance</h3>
            <p>Get smart, personalized career suggestions based on your skills, interests, and personality.</p>
          </div>
        </div>
        
        <div className="service-card">
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            alt="Career Insights" 
            className="service-img" 
          />
          <div className="service-content">
            <h3>Career Insights</h3>
            <p>Understand what each path really involves - from day-to-day tasks to long-term prospects.</p>
          </div>
        </div>
        
        <div className="service-card">
          <img 
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            alt="Job Shadowing" 
            className="service-img" 
          />
          <div className="service-content">
            <h3>Job Shadowing</h3>
            <p>Spend time with real professionals in real workplaces to get firsthand experience.</p>
          </div>
        </div>
      </div>

      <div className="services-note">
        <p>Choose one, two, or all three — your future starts here.</p>
        <span className="highlight">No more wasted time. Just a clear path forward.</span>
      </div>

      <div className="services-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`} 
            onClick={() => handleTabClick('quiz')}
          >
            AI Career Quiz
          </button>
          <button 
            className={`tab-btn ${activeTab === 'shadowing' ? 'active' : ''}`} 
            onClick={() => handleTabClick('shadowing')}
          >
            Job Shadowing
          </button>
          <button 
            className={`tab-btn ${activeTab === 'explore' ? 'active' : ''}`} 
            onClick={() => handleTabClick('explore')}
          >
            Career Exploration
          </button>
        </div>

        <div className="tab-content">
          <div className={`tab-panel ${activeTab === 'quiz' ? 'active' : ''}`} id="quiz">
            <h2>DO YOU KNOW WHAT YOU WANT TO BE IN FUTURE?</h2>
            <p>If you are unsure or clueless, EduSens AI is here for you!</p>
            <p>Take our super fun quiz and let's match you with careers you'll actually love. The more you share, the better it gets.</p>
            <p>Ready to explore? Let's go! 🌔</p>
            <a href="#" className="cta-button">Take AI Quiz</a>
          </div>
          
          <div className={`tab-panel ${activeTab === 'shadowing' ? 'active' : ''}`} id="shadowing">
            <h2>Take it to the next level with job shadowing</h2>
            <p>GET 3 days of real-life job experience - side by side with a professional in the field.</p>
            <p>See what the job is really like, ask questions, and get a taste of your future before it even begins!</p>
            <a href="#" className="cta-button">APPLY</a>
          </div>
          
          <div className={`tab-panel ${activeTab === 'explore' ? 'active' : ''}`} id="explore">
            <h2>So, you know what you want to be in the future — that's awesome!</h2>
            <p>But do you really know what it takes to get there?</p>
            <p>Skills, subjects, day-to-day life?</p>
            <p>Let's take you on a discovery adventure. Get everything you need to know at your finger tips.</p>
            <a href="#" className="cta-button">Explore my Career</a>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2023 EduSens AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EduSensServices;