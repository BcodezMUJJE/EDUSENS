import React from 'react';
import { Link } from 'react-router-dom';

const ScrollLink = ({ to, children, className, onClick, ...props }) => {
  const handleClick = (event) => {
    // Call the original onClick if provided
    if (onClick) {
      onClick(event);
    }
    
    // Small delay to ensure navigation completes first
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <Link 
      to={to} 
      className={className} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ScrollLink;