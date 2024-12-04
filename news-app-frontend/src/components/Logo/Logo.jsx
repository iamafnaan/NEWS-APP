
import React from 'react';

const Logo = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={className}
    >
      <circle cx="50" cy="50" r="45" fill="#3B82F6" />
      <path 
        d="M30 35 Q50 25, 70 35 L70 65 Q50 75, 30 65 Z" 
        fill="white" 
      />
      <circle cx="50" cy="50" r="10" fill="white" />
    </svg>
  );
};

export default Logo;