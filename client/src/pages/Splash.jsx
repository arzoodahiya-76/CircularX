import React, { useState, useEffect } from 'react'
import { Leaf } from 'lucide-react'

function Splash({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 500)
          }, 800)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo">
          <div className="logo-animation">
            <div className="logo-circle">
              <Leaf size={48} color="white" />
            </div>
            <div className="logo-ring ring-1"></div>
            <div className="logo-ring ring-2"></div>
            <div className="logo-ring ring-3"></div>
          </div>
        </div>
        
        <h1 className="splash-title">CircularX</h1>
        <p className="splash-tagline">E-Waste Management Platform</p>
        
        <div className="splash-progress">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{progress}%</span>
        </div>

        <div className="splash-features">
          <div className="feature-item">
            <span className="feature-dot"></span>
            AI Recognition
          </div>
          <div className="feature-item">
            <span className="feature-dot"></span>
            Smart Scheduling
          </div>
          <div className="feature-item">
            <span className="feature-dot"></span>
            Marketplace
          </div>
        </div>
      </div>

      <style>{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #0D4F4F 0%, #1A1A2E 50%, #0D4F4F 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .splash-content {
          text-align: center;
          animation: slideUp 0.8s ease;
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .splash-logo {
          margin-bottom: 24px;
        }

        .logo-animation {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto;
        }

        .logo-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #2ECC71, #0D4F4F);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        .logo-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid rgba(46, 204, 113, 0.3);
          animation: ringPulse 2s ease-out infinite;
        }

        .ring-1 {
          width: 100px;
          height: 100px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 130px;
          height: 130px;
          animation-delay: 0.3s;
        }

        .ring-3 {
          width: 160px;
          height: 160px;
          animation-delay: 0.6s;
        }

        @keyframes ringPulse {
          0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .splash-title {
          font-family: 'Sora', sans-serif;
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #fff, #2ECC71);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .splash-tagline {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          margin-bottom: 40px;
        }

        .splash-progress {
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 300px;
          margin: 0 auto 40px;
        }

        .progress-track {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #2ECC71, #F5A623);
          border-radius: 3px;
          transition: width 0.1s ease;
        }

        .progress-text {
          color: rgba(255, 255, 255, 0.8);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          min-width: 40px;
        }

        .splash-features {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
        }

        .feature-dot {
          width: 8px;
          height: 8px;
          background: #2ECC71;
          border-radius: 50%;
          animation: blink 1.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

export default Splash
