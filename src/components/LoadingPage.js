import React from 'react';
import logo_spinner from '../assets/logo_spinner.svg';
import './LoadingPage.css';

function LoadingPage() {
  console.log('Rendering LoadingPage');
  return (
    <div className="loading-container">
      <img 
        src={logo_spinner} 
        alt="Loading..." 
        className="loading-spinner"
      />
      <p className="loading-text">Calculating ROI...</p>
    </div>
  );
}

export default LoadingPage; 