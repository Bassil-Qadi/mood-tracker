import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.svg';
import './LogoAnimation.css';

interface LogoAnimationProps {
  onComplete?: () => void;
  duration?: number;
}

const LogoAnimation = ({ onComplete, duration = 2000 }: LogoAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade-out animation to complete before calling onComplete
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
        // Remove from DOM after animation
        setTimeout(() => {
          setShouldRender(false);
        }, 600);
      }, 600);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!shouldRender) return null;

  return (
    <div className={`logo-animation-container ${isVisible ? 'visible' : 'fade-out'}`}>
      <div className="logo-animation-wrapper">
        <div className="logo-glow"></div>
        <img src={logo} alt="Logo" className="logo-animated" />
      </div>
    </div>
  );
};

export default LogoAnimation;

