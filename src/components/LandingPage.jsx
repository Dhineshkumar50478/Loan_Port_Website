// SplashScreen.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SplashScreen.css'; // Import the CSS for animations

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 4000); // Delay before redirecting

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="logo-box animate-bounce-in">
        <p className="logo-text">
          <span className="logo-letter">L</span>
          <span className="logo-word">oan</span>
          <span className="logo-letter">P</span>
          <span className="logo-word">ort</span>
        </p>
        <div className="slogan-box">
          <p className="slogan animate-slide-up">Funding Your Next Big Move</p>
          <p className="slogan animate-slide-up delay-1">Fast. Easy. Secure. Trusted.</p>
          <p className="slogan animate-slide-up delay-2">We fund your future 🔑</p>
        </div>
      </div>
    </div>
  );};

export default LandingPage;
