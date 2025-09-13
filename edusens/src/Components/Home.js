import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
// eslint-disable-next-line
import { FaRobot, FaChartLine, FaUserTie, FaPlay, FaPause } from 'react-icons/fa';
import { GiMagnifyingGlass } from 'react-icons/gi';
import s1 from "../Assets/s1.jpg";
import s2 from "../Assets/s2.jpg";
import s3 from "../Assets/s3.jpg";
import introVideo from '../Assets/eddd.mp4';

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
          <p>EduSens Africa - Guiding students to their perfect career.</p>
        </div>
      </div>
    </section>
  );
};

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [s1, s2, s3];
  
  // Slideshow effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(slideInterval);
  }, [slides.length]);
  
  // Example backend call (non-disruptive)
  useEffect(() => {
    let mounted = true;
    import('../apiClient').then(({ getTest }) => {
      getTest().then(data => {
        if (mounted) {
          // eslint-disable-next-line no-console
          console.log('Backend test endpoint response:', data);
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.warn('Backend test endpoint failed:', err.message);
      });
    });
    return () => { mounted = false; };
  }, []);
  
  return (
    <div className="home-container">
      {/* Hero Section with Slideshow */}
      <section className="hero-section">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
            ></div>
          ))}
          <div className="overlay"></div>
        </div>
        
        <div className="hero-content centered">
          <div className="text-container">
            <h1>Journey To Your Future <span className="emphasized-word">Starts</span> Now</h1>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoPlayer />

      {/* Steps Section */}
      <section className="steps-section">
        <h2>Don't just choose a career, EduSens helps you<br />choose your purpose in 3 simple steps!</h2>
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