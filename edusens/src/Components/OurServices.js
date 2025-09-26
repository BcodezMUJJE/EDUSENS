import React from 'react';
import { Link } from 'react-router-dom';
import './OurServices.css';
import Ai from '../Assets/Ai.jpeg';
import Biz from '../Assets/BusinessMen.jpeg';
import Insights from '../Assets/Insight.jpeg';

const EduSensServices = () => {
  return (
    <div className="edusens-services-container">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>Our Services</h1>
          <p className="hero-subtitle">We help you skip the confusion and focus on what truly fits you</p>
          <div className="hero-description">
            <p>Consectetur adipiscing elit nullam nunc justo sagittis suscipit ultricies.</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="services-grid">
          <div className="service-card">
            <div className="card-image-container">
              <img src={Ai} alt="AI Career Guidance - Young African professional using technology" className="service-img" />
              <div className="card-overlay"></div>
            </div>
            <div className="service-content">
              <h3>AI Career Guidance</h3>
              <p>Get smart, personalized career suggestions based on your skills, interests, and personality.</p>
              <Link to="/Ai-Careers"><button className="service-cta">Learn More</button></Link>
            </div>
          </div>
          
          <div className="service-card">
            <div className="card-image-container">
              <img src={Insights} alt="Career Insights - African businesswoman in professional setting" className="service-img" />
              <div className="card-overlay"></div>
            </div>
            <div className="service-content">
              <h3>Career Insights</h3>
              <p>Understand what each path really involves  from day to day tasks to long term prospects.</p>
              <Link to="/Edusens-Careers"><button className="service-cta">Learn More</button></Link>
            </div>
          </div>
          
          <div className="service-card">
            <div className="card-image-container">
              <img src={Biz} alt="Job Shadowing - African professionals collaborating in workplace" className="service-img" />
              <div className="card-overlay"></div>
            </div>
            <div className="service-content">
              <h3>Job Shadowing</h3>
              <p>Spend time with real professionals in real workplaces to get firsthand experience.</p>
              <Link to="/job-shadowing"><button className="service-cta">Learn More</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Info */}
      <section className="additional-services">
        <div className="service-info">
          <div className="info-content">
            <h2>AI-Powered Career Matching</h2>
            <p>Our advanced algorithm analyzes your skills, interests, and personality to match you with careers that truly fit you.</p>
            <ul>
              <li>Personalized career recommendations</li>
              <li>Skills gap analysis</li>
              <li>Future job market trends</li>
            </ul>
          </div>
          <div className="info-image">
            <img src={Ai} alt="AI Career Matching" />
          </div>
        </div>

        <div className="service-info reversed">
          <div className="info-content">
            <h2>In-Depth Career Insights</h2>
            <p>Gain comprehensive understanding of various career paths with detailed information about requirements, salaries, and growth opportunities.</p>
            <ul>
              <li>Detailed career profiles</li>
              <li>Salary expectations and growth</li>
              <li>Educational requirements</li>
            </ul>
          </div>
          <div className="info-image">
            <img src={Insights} alt="Career Insights" />
          </div>
        </div>

        <div className="service-info">
          <div className="info-content">
            <h2>Real-World Job Shadowing</h2>
            <p>Experience a day in the life of professionals through our job shadowing program that connects you with industry experts.</p>
            <ul>
              <li>Hands-on experience</li>
              <li>Professional networking</li>
              <li>Mentorship opportunities</li>
            </ul>
          </div>
          <div className="info-image">
            <img src={Biz} alt="Job Shadowing" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="cta-content">
          <button className="get-started-btn" onClick={() => console.log('Get Started clicked')}>
            GET STARTED
          </button>
        </div>
      </section>
    </div>
  );
};

export default EduSensServices;