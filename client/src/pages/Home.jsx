import React, { useState } from 'react'
import { Leaf, Recycle, Smartphone, Laptop, Battery, Truck, ArrowRight, ChevronRight, Zap, Coins, Shield, Globe, Star, Play, Users, TrendingUp, CheckCircle } from 'lucide-react'

function Home({ onGetStarted }) {
  const [showVideo, setShowVideo] = useState(false)

  const features = [
    { icon: Smartphone, title: 'AI Recognition', desc: 'Identify your e-waste instantly with AI', color: '#10B981' },
    { icon: Coins, title: 'Get Cash', desc: 'Turn old devices into money', color: '#F59E0B' },
    { icon: Truck, title: 'Free Pickup', desc: 'We collect from your door', color: '#3B82F6' },
    { icon: Recycle, title: 'Eco-Friendly', desc: 'Proper recycling guaranteed', color: '#8B5CF6' }
  ]

  const stats = [
    { value: '10K+', label: 'Devices Recycled', icon: Smartphone },
    { value: '₹5Cr+', label: 'Cash Given', icon: Coins },
    { value: '50T', label: 'CO2 Prevented', icon: Leaf },
    { value: '99%', label: 'Satisfaction', icon: Star }
  ]

  const testimonials = [
    { name: 'Rahul S.', text: 'Got ₹12,000 for my old iPhone 13. Super easy process!', rating: 5 },
    { name: 'Priya M.', text: 'Best e-waste recycling service. Free pickup was great!', rating: 5 },
    { name: 'Amit K.', text: 'Turned my old laptop into cash within 24 hours.', rating: 5 }
  ]

  const steps = [
    { num: '01', title: 'Upload Photo', desc: 'Take a photo of your device' },
    { num: '02', title: 'Get Quote', desc: 'AI identifies and values your device' },
    { num: '03', title: 'Get Paid', desc: 'Receive payment after pickup' }
  ]

  return (
    <div className="home-page">
      <nav className="home-nav">
        <div className="nav-logo">
          <div className="logo-icon"><Leaf size={22} /></div>
          <span>CircularX</span>
        </div>
        <button className="nav-cta" onClick={onGetStarted}>Get Started</button>
      </nav>

      <section className="hero-section">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} /> India's #1 E-Waste Platform
          </div>
          
          <h1 className="hero-title">
            Turn Your E-Waste<br />
            <span className="highlight">Into Cash</span>
          </h1>
          
          <p className="hero-subtitle">
            Recycle old phones, laptops, and electronics and earn money while saving the environment. Free pickup, instant payment.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={onGetStarted}>
              Start Now <ArrowRight size={20} />
            </button>
            <button className="secondary-btn" onClick={() => setShowVideo(true)}>
              <Play size={18} /> How It Works
            </button>
          </div>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat" style={{ animationDelay: `${i * 0.1}s` }}>
                <stat.icon size={20} />
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="app-header">
                <Leaf size={20} />
                <span>CircularX</span>
              </div>
              <div className="app-content">
                <div className="app-icon"><Smartphone size={32} /></div>
                <div className="app-text">iPhone 15 Pro</div>
                <div className="app-price">₹79,900</div>
                <div className="app-components">
                  <span>Display: ₹12,000</span>
                  <span>Battery: ₹2,500</span>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-cards">
            <div className="float-card card-1">
              <CheckCircle size={18} color="#10B981" />
              <span>Instant Payment</span>
            </div>
            <div className="float-card card-2">
              <Truck size={18} color="#3B82F6" />
              <span>Free Pickup</span>
            </div>
          </div>
        </div>
      </section>

      <section className="steps-section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Simple 3-step process to earn money from your e-waste</p>
        
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div key={i} className="step-card" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="step-number">{step.num}</div>
              <div className="step-icon">
                {i === 0 ? <Smartphone size={28} /> : i === 1 ? <Zap size={28} /> : <Coins size={28} />}
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              {i < steps.length - 1 && <div className="step-arrow"><ChevronRight size={24} /></div>}
            </div>
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose CircularX?</h2>
        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon" style={{ background: feature.color }}>
                <feature.icon size={24} color="white" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">What People Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="stars">
                {[...Array(testimonial.rating)].map((_, j) => <Star key={j} size={16} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p>"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.name[0]}</div>
                <span>{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Earn?</h2>
          <p>Join thousands of people who are turning e-waste into wealth</p>
          <button className="cta-btn" onClick={onGetStarted}>
            Get Started Now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-icon"><Leaf size={22} /></div>
            <span>CircularX</span>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Service</h4>
              <a>AI Recognition</a>
              <a>Pickup</a>
              <a>Marketplace</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a>About</a>
              <a>Contact</a>
              <a>Careers</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a>Privacy</a>
              <a>Terms</a>
            </div>
          </div>
          <div className="footer-badges">
            <div className="badge"><Shield size={16} /> Secure</div>
            <div className="badge"><Globe size={16} /> Pan India</div>
            <div className="badge"><Recycle size={16} /> Certified</div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 CircularX. All rights reserved.
        </div>
      </footer>

      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div className="video-content" onClick={e => e.stopPropagation()}>
            <button className="close-video" onClick={() => setShowVideo(false)}>×</button>
            <div className="video-placeholder">
              <Play size={48} />
              <p>Video Demo Coming Soon</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .home-page {
          min-height: 100vh;
          background: #0F172A;
          color: white;
          overflow-x: hidden;
        }

        .home-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 1.3rem;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-cta {
          padding: 10px 24px;
          background: linear-gradient(135deg, #10B981, #059669);
          border: none;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .nav-cta:hover {
          transform: scale(1.05);
        }

        .hero-section {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding: 120px 40px 60px;
          position: relative;
        }

        .hero-bg-shapes {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          background: #10B981;
          top: 10%;
          left: -10%;
        }

        .shape-2 {
          width: 300px;
          height: 300px;
          background: #8B5CF6;
          bottom: 20%;
          right: 10%;
        }

        .shape-3 {
          width: 200px;
          height: 200px;
          background: #F59E0B;
          top: 40%;
          right: 30%;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 25px;
          color: #10B981;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 24px;
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 24px;
          animation: fadeInUp 0.6s ease 0.1s forwards;
          opacity: 0;
        }

        .hero-title .highlight {
          background: linear-gradient(135deg, #10B981, #34D399, #F59E0B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          max-width: 500px;
          margin-bottom: 32px;
          animation: fadeInUp 0.6s ease 0.2s forwards;
          opacity: 0;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          animation: fadeInUp 0.6s ease 0.3s forwards;
          opacity: 0;
        }

        .primary-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #10B981, #059669);
          border: none;
          border-radius: 30px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .primary-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(16, 185, 129, 0.5);
        }

        .secondary-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 30px;
          color: white;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .secondary-btn:hover {
          background: rgba(255,255,255,0.15);
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          animation: fadeInUp 0.6s ease 0.4s forwards;
          opacity: 0;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        .hero-stat svg {
          color: #10B981;
        }

        .hero-stat .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .hero-stat .stat-label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .phone-mockup {
          width: 280px;
          height: 550px;
          background: #1E293B;
          border-radius: 40px;
          padding: 12px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          position: relative;
          z-index: 1;
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #0F172A, #1E3A5F);
          border-radius: 30px;
          overflow: hidden;
          padding: 20px;
        }

        .app-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .app-content {
          text-align: center;
          padding: 30px 10px;
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
        }

        .app-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .app-text {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .app-price {
          font-size: 1.8rem;
          font-weight: 700;
          color: #10B981;
          margin-bottom: 20px;
        }

        .app-components {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
        }

        .floating-cards {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .float-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          font-weight: 500;
          animation: float 3s ease-in-out infinite;
        }

        .card-1 {
          top: 20%;
          right: -20px;
          animation-delay: 0s;
        }

        .card-2 {
          bottom: 25%;
          left: -30px;
          animation-delay: 1.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 12px;
        }

        .section-subtitle {
          text-align: center;
          color: rgba(255,255,255,0.6);
          margin-bottom: 48px;
        }

        .steps-section, .features-section, .testimonials-section {
          padding: 80px 40px;
          background: #0F172A;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        .step-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 32px;
          text-align: center;
          position: relative;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        .step-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 3rem;
          font-weight: 700;
          color: rgba(16, 185, 129, 0.2);
        }

        .step-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .step-card h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
        }

        .step-card p {
          color: rgba(255,255,255,0.6);
          font-size: 0.9rem;
        }

        .step-arrow {
          position: absolute;
          right: -30px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
        }

        .steps-grid .step-card:last-child .step-arrow {
          display: none;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-8px);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .feature-card h3 {
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .feature-card p {
          color: rgba(255,255,255,0.6);
          font-size: 0.85rem;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 20px;
          padding: 28px;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        .stars {
          display: flex;
          gap: 4px;
          margin-bottom: 16px;
        }

        .testimonial-card p {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .cta-section {
          padding: 80px 40px;
          background: linear-gradient(135deg, #10B981, #059669);
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 32px;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 40px;
          background: white;
          color: #059669;
          border: none;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .cta-btn:hover {
          transform: scale(1.05);
        }

        .home-footer {
          background: #0A0F1C;
          padding: 60px 40px 20px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto 40px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 1.3rem;
        }

        .footer-links {
          display: flex;
          gap: 60px;
        }

        .link-group h4 {
          margin-bottom: 16px;
          color: rgba(255,255,255,0.9);
        }

        .link-group a {
          display: block;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          margin-bottom: 10px;
          font-size: 0.9rem;
        }

        .footer-badges {
          display: flex;
          gap: 16px;
        }

        .footer-badges .badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
          font-size: 0.85rem;
        }

        .video-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .video-content {
          width: 90%;
          max-width: 800px;
          position: relative;
        }

        .close-video {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
        }

        .video-placeholder {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #1E293B, #0F172A);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
        }

        @media (max-width: 1024px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 100px;
          }
          .hero-subtitle {
            margin: 0 auto 32px;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
          }
          .hero-visual {
            display: none;
          }
          .steps-grid, .features-grid, .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .step-arrow {
            display: none;
          }
          .footer-content {
            flex-direction: column;
            gap: 40px;
          }
          .footer-links {
            flex-wrap: wrap;
            gap: 30px;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
