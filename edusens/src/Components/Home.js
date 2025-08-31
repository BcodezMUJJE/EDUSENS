import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
// eslint-disable-next-line
import { FaRobot, FaChartLine, FaUserTie, FaPlay, FaPause } from 'react-icons/fa';
import { GiMagnifyingGlass } from 'react-icons/gi';
import heroImage from "../Assets/GRAD.jpeg";
import introVideo from '../Assets/eDusens.mp4';

// Video component
const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="video-section">
      <div className="video-container">
        <h2>Discover Your Future with EduSens</h2>
        <p>Watch our introductory video to learn how we help students find their career path</p>
        
        <div className="video-wrapper">
          <video 
            ref={videoRef}
            className="intro-video"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23e2e8f0'/%3E%3Cpath d='M6,3 L10,5 L6,7 Z' fill='%230ea5e9'/%3E%3C/svg%3E"
            controls
          >
            {/* In a real implementation, you would add your video source here */}
            <source src={introVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {!isPlaying && (
            <div className="video-overlay" onClick={togglePlay}>
              <button className="play-button">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          )}
        </div>
        
        <div className="video-caption">
          <p>EduSens Africa - Guiding students to their perfect career since 2023</p>
        </div>
      </div>
    </section>
  );
};

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

      {/* Video Section */}
      <VideoPlayer />

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