import React from 'react';
import './JobShadowing.css';

const JobShadowing = () => {
  const handleApplyClick = () => {
    // You can add navigation logic here later
    alert('Application process starting soon!');
  };

  return (
    <div className="job-shadowing-container">
      <div className="job-shadowing-content">
        <h1 className="job-shadowing-title">
          Wanna Test Drive Your Dream Job?
        </h1>
        <p className="job-shadowing-description">
          Link up with a pro, get 3 days of real job experience,<br />
          and see what it's all about!
        </p>
        <button className="apply-button" onClick={handleApplyClick}>
          APPLY
        </button>
      </div>
    </div>
  );
};

export default JobShadowing;