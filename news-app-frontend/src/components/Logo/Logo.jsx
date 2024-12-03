
import React from 'react';

const Logo = () => {
  return (
    <div className="flex justify-center items-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="50" 
        height="50" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-indigo-600"
      >
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2z" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
        <path d="M9 8h6" />
      </svg>
    </div>
  );
};

export default Logo;