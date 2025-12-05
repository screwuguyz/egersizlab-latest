import React from 'react';

interface AnimatedLogoProps {
  size?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 80 }) => {
  return (
    <div className="animated-logo-container" style={{ width: size, height: size }}>
      <style>{`
        .animated-logo-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .logo-svg {
          width: 100%;
          height: 100%;
        }
        
        /* Pulse ring animation */
        .pulse-ring {
          animation: pulseRing 2s ease-out infinite;
          transform-origin: center;
        }
        
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }
        
        /* Figure bounce animation */
        .figure-body {
          animation: figureMove 3s ease-in-out infinite;
          transform-origin: center bottom;
        }
        
        @keyframes figureMove {
          0%, 100% { transform: translateY(0) scaleY(1); }
          25% { transform: translateY(-3px) scaleY(1.02); }
          50% { transform: translateY(0) scaleY(0.98); }
          75% { transform: translateY(-2px) scaleY(1.01); }
        }
        
        /* Arms animation */
        .arm-left {
          animation: armSwingLeft 2s ease-in-out infinite;
          transform-origin: 28px 32px;
        }
        
        .arm-right {
          animation: armSwingRight 2s ease-in-out infinite;
          transform-origin: 52px 32px;
        }
        
        @keyframes armSwingLeft {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(30deg); }
        }
        
        @keyframes armSwingRight {
          0%, 100% { transform: rotate(20deg); }
          50% { transform: rotate(-30deg); }
        }
        
        /* Gradient rotation */
        .gradient-bg {
          animation: gradientShift 4s linear infinite;
        }
        
        @keyframes gradientShift {
          0% { stop-color: #667eea; }
          50% { stop-color: #764ba2; }
          100% { stop-color: #667eea; }
        }
        
        /* Sparkle effect */
        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .sparkle:nth-child(1) { animation-delay: 0s; }
        .sparkle:nth-child(2) { animation-delay: 0.5s; }
        .sparkle:nth-child(3) { animation-delay: 1s; }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      
      <svg viewBox="0 0 80 80" className="logo-svg">
        <defs>
          {/* Main gradient */}
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" className="gradient-bg" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          
          {/* Secondary gradient */}
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle with pulse */}
        <circle cx="40" cy="40" r="36" fill="url(#logoGradient)" opacity="0.15" className="pulse-ring" />
        <circle cx="40" cy="40" r="32" fill="url(#logoGradient)" opacity="0.1" />
        
        {/* Main circle border */}
        <circle 
          cx="40" 
          cy="40" 
          r="35" 
          fill="none" 
          stroke="url(#logoGradient)" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="180 220"
          className="pulse-ring"
        />
        
        {/* Human figure */}
        <g className="figure-body">
          {/* Head */}
          <circle cx="40" cy="24" r="8" fill="url(#logoGradient)" filter="url(#glow)" />
          
          {/* Body */}
          <path 
            d="M40 32 L40 52" 
            stroke="url(#logoGradient)" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          
          {/* Legs */}
          <path 
            d="M40 52 L32 66" 
            stroke="url(#logoGradient)" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          <path 
            d="M40 52 L48 66" 
            stroke="url(#logoGradient)" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
        </g>
        
        {/* Arms - animated */}
        <path 
          d="M40 36 L26 28" 
          stroke="url(#logoGradient)" 
          strokeWidth="4" 
          strokeLinecap="round"
          className="arm-left"
        />
        <path 
          d="M40 36 L54 28" 
          stroke="url(#logoGradient)" 
          strokeWidth="4" 
          strokeLinecap="round"
          className="arm-right"
        />
        
        {/* Dumbbell on left hand */}
        <g className="arm-left">
          <rect x="20" y="22" width="12" height="4" rx="2" fill="url(#accentGradient)" />
          <circle cx="20" cy="24" r="4" fill="url(#accentGradient)" />
          <circle cx="32" cy="24" r="4" fill="url(#accentGradient)" />
        </g>
        
        {/* Sparkles */}
        <circle cx="18" cy="18" r="2" fill="#f59e0b" className="sparkle" />
        <circle cx="62" cy="45" r="1.5" fill="#10b981" className="sparkle" />
        <circle cx="25" cy="58" r="1.5" fill="#667eea" className="sparkle" />
        
        {/* Motion lines */}
        <path 
          d="M12 40 Q8 42, 12 44" 
          stroke="#667eea" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.5"
          strokeLinecap="round"
          className="pulse-ring"
        />
        <path 
          d="M68 40 Q72 42, 68 44" 
          stroke="#667eea" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.5"
          strokeLinecap="round"
          className="pulse-ring"
        />
      </svg>
    </div>
  );
};

export default AnimatedLogo;

