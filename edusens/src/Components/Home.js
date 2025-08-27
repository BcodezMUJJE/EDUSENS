import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
// eslint-disable-next-line
import { FaRobot, FaChartLine, FaUserTie } from 'react-icons/fa';
import { GiMagnifyingGlass } from 'react-icons/gi';
import heroImage from "../Assets/GRAD.jpeg"


function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Future you <br />is calling</h1>
          <p className="subtitle">but like, who even <em>are</em> they ?</p>
          <p className="lead">Let's help you figure it out !</p>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Future calling" />
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <h2>Don't just choose a career, EduSens helps you<br />choose your purpose in 3 simple steps !</h2>
        <br /> <br /> <br />
        <div className="steps-container">
          <div className="step">
            <div className="step-number"></div>
            <div className="step-icon">
              <FaRobot className="icon" />
            </div>
            <h3>Smart AI Career Guidance</h3>
            <p className="step-description">Our advanced AI analyzes your skills and interests to recommend perfect career paths.</p>
          </div>
          
          <div className="step">
            <div className="step-number"></div>
            <div className="step-icon">
              <GiMagnifyingGlass className="icon" />
            </div>
            <h3>Indepth Career Insights</h3>
            <p className="step-description">Get detailed information about your career choice, what it entails, educational pathway, growth potential, salary etc.</p>
          </div>
          
          <div className="step">
            <div className="step-number"></div>
            <div className="step-icon">
              <FaUserTie className="icon" />
            </div>
            <h3>Real-world job shadowing</h3>
            <p className="step-description">Experience three days at the workplace alongside a professional in your field of interest.</p>
          </div>
        </div>
        
        <Link to="/Our-Services"><button className="cta-button">GET STARTED</button></Link>
      </section>
    </div>
  );
}

export default Home;