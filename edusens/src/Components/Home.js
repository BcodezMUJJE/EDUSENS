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
import thumbnailImage from '../Assets/ThumbEdu.png';

// Video component - YouTube-style implementation
const VideoPlayer = () => {
  // eslint-disable-next-line
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);

  // Play the video and hide the thumbnail
  const playVideo = () => {
    if (videoRef.current) {
      // Hide the thumbnail first
      setShowThumbnail(false);
      
      // Then play the video (slight delay to allow for smooth transition)
      setTimeout(() => {
        videoRef.current.play();
        setIsPlaying(true);
      }, 50);
    }
  };

  // Handle when video ends or is manually reset
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowThumbnail(true);
    
    // Reset the video time to beginning
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Initialize the video player
  useEffect(() => {
    // Ensure the video is ready
    if (videoRef.current) {
      // Add event listeners for better control
      videoRef.current.addEventListener('ended', handleVideoEnd);
      
      // Remove event listeners on cleanup
      return () => {
        if (videoRef.current) {
          // eslint-disable-next-line
          videoRef.current.removeEventListener('ended', handleVideoEnd);
        }
      };
    }
  }, []);

  return (
    <section className="video-section">
      <div className="video-container">
        <h2>Discover Your Future with EduSens</h2>
        <p>Watch our introductory video to learn how we help students find their career path</p>
        
        <div className="video-wrapper youtube-style-player">
          {/* The actual video element - hidden initially */}
          <video 
            ref={videoRef}
            className="intro-video"
            preload="metadata"
            controls={!showThumbnail} // Only show controls after the thumbnail is hidden
          >
            <source src={introVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Custom thumbnail overlay with YouTube-style play button */}
          {showThumbnail && (
            <>
              <div 
                ref={thumbnailRef}
                className="custom-thumbnail" 
                style={{ 
                  backgroundImage: `url(${thumbnailImage})`,
                  opacity: 1.9 /* Decreased opacity of the thumbnail */
                }}
                onClick={playVideo}
              />
              <div className="video-overlay" onClick={playVideo}>
                <button className="play-button play-button-animation" aria-label="Play video">
                  <FaPlay size={30} />
                </button>
              </div>
            </>
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