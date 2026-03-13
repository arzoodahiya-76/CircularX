import React, { useState } from 'react'
import { Leaf, Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Globe, Shield, Zap, Recycle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, register } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!isLogin && !name) {
      setError('Please enter your name')
      return
    }

    let result
    if (isLogin) {
      result = login(email, password)
    } else {
      result = register(name, email, password)
    }

    if (!result.success) {
      setError(result.error)
    }
  }

  const features = [
    { icon: Zap, title: 'AI-Powered', desc: 'Smart device recognition' },
    { icon: Recycle, title: 'Eco-Friendly', desc: 'Sustainable recycling' },
    { icon: Shield, title: 'Secure', desc: 'Safe data handling' }
  ]

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      <div className="login-container">
        <div className="login-brand">
          <div className="brand-icon">
            <Leaf size={32} />
          </div>
          <h1>CircularX</h1>
          <p>E-Waste Management Platform</p>
        </div>

        <div className="login-card">
          <div className="login-header">
            <h2>{isLogin ? 'Welcome Back' : 'Join CircularX'}</h2>
            <p>{isLogin ? 'Sign in to continue your eco journey' : 'Start recycling e-waste today'}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
              {isLogin ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
            </button>
          </form>

          <div className="login-divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button className="social-btn">
              <Globe size={20} />
              <span>Google</span>
            </button>
            <button className="social-btn">
              <Shield size={20} />
              <span>Auth</span>
            </button>
          </div>

          <div className="login-footer">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => { setIsLogin(!isLogin); setError('') }}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="demo-info">
              <span>Demo Credentials:</span>
              <code>gargansh2207@gmail.com</code>
              <code>2207@Anshgarg</code>
            </div>
          )}
        </div>

        <div className="login-features">
          {features.map((feature, i) => (
            <div key={i} className="feature-badge">
              <feature.icon size={18} />
              <div>
                <span className="feature-title">{feature.title}</span>
                <span className="feature-desc">{feature.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%);
        }

        .login-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .shape-1 {
          width: 500px;
          height: 500px;
          background: #10B981;
          top: -100px;
          left: -100px;
          animation: float 8s ease-in-out infinite;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: #F59E0B;
          bottom: -50px;
          right: -50px;
          animation: float 10s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 300px;
          height: 300px;
          background: #3B82F6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
        }

        .login-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .login-brand {
          text-align: center;
        }

        .brand-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
          animation: float 6s ease-in-out infinite;
        }

        .login-brand h1 {
          font-family: 'Sora', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
        }

        .login-brand p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
        }

        .login-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-header h2 {
          font-family: 'Sora', sans-serif;
          font-size: 1.75rem;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .login-header p {
          color: #6B7280;
          font-size: 0.95rem;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 8px;
          color: #374151;
          font-size: 0.9rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
        }

        .input-wrapper input {
          width: 100%;
          padding: 14px 14px 14px 46px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.2s;
          background: #F9FAFB;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: #10B981;
          background: white;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
          padding: 0;
        }

        .error-message {
          background: #FEE2E2;
          color: #DC2626;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .login-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.5);
        }

        .login-divider {
          display: flex;
          align-items: center;
          margin: 24px 0;
        }

        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #E5E7EB;
        }

        .login-divider span {
          padding: 0 16px;
          color: #9CA3AF;
          font-size: 0.85rem;
        }

        .social-login {
          display: flex;
          gap: 12px;
        }

        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          border: 2px solid #E5E7EB;
          background: white;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .social-btn:hover {
          border-color: #10B981;
          background: #F0FDF4;
        }

        .login-footer {
          text-align: center;
          margin-top: 24px;
        }

        .login-footer p {
          color: #6B7280;
          font-size: 0.9rem;
        }

        .login-footer button {
          background: none;
          border: none;
          color: #10B981;
          font-weight: 600;
          cursor: pointer;
          margin-left: 6px;
        }

        .login-footer button:hover {
          text-decoration: underline;
        }

        .demo-info {
          margin-top: 20px;
          padding: 16px;
          background: linear-gradient(135deg, #F0FDF4, #ECFDF5);
          border-radius: 12px;
          text-align: center;
        }

        .demo-info span {
          display: block;
          font-size: 0.8rem;
          color: #6B7280;
          margin-bottom: 8px;
        }

        .demo-info code {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #059669;
          margin-top: 4px;
        }

        .login-features {
          display: flex;
          gap: 16px;
        }

        .feature-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          color: white;
        }

        .feature-badge svg {
          color: #10B981;
        }

        .feature-title {
          display: block;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .feature-desc {
          display: block;
          font-size: 0.7rem;
          opacity: 0.7;
        }

        @media (max-width: 640px) {
          .login-features {
            display: none;
          }
          .login-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  )
}

export default Login
