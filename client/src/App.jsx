import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import AIRecognition from './pages/AIRecognition'
import Scheduler from './pages/Scheduler'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Splash from './pages/Splash'
import Home from './pages/Home'
import { Leaf, Camera, Calendar, LayoutDashboard, LogOut, User, Wallet, Bell, Settings, Menu, X, Home as HomeIcon, Sparkles, ArrowRight, Package, Truck, BarChart3, Globe, Shield, Zap, Recycle } from 'lucide-react'

function AppContent() {
  const [activeTab, setActiveTab] = useState('ai')
  const [showSplash, setShowSplash] = useState(true)
  const [showHome, setShowHome] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { user, logout } = useAuth()

  if (showSplash) {
    return <Splash onComplete={() => { setShowSplash(false); setShowHome(true) }} />
  }

  if (showHome) {
    return <Home onGetStarted={() => setShowHome(false)} />
  }

  if (!user) {
    return <Login />
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'ai': return <AIRecognition />
      case 'schedule': return <Scheduler />
      case 'dashboard': return <Dashboard user={user} />
      default: return <AIRecognition />
    }
  }

  const navItems = [
    { id: 'ai', icon: Camera, label: 'AI Recognition' },
    { id: 'schedule', icon: Calendar, label: 'Schedule Pickup' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' }
  ]

  return (
    <div className="app-container">
      <nav className="navbar-modern">
        <div className="nav-left">
          <div className="logo-modern">
            <div className="logo-icon-modern">
              <Leaf size={22} />
            </div>
            <span className="logo-text">CircularX</span>
          </div>
        </div>

        <div className="nav-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="nav-right">
          <button className="notification-btn-modern" onClick={() => setShowUserMenu(!showUserMenu)}>
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>

          <div className="user-profile-modern" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="user-avatar-modern">
              <User size={18} />
            </div>
            <div className="user-info-modern">
              <span className="user-name-modern">{user.name}</span>
              <span className="user-role">Eco Warrior</span>
            </div>
          </div>

          {showUserMenu && (
            <div className="user-menu-modern">
              <div className="menu-header">
                <div className="menu-avatar">
                  <User size={24} />
                </div>
                <div>
                  <div className="menu-name">{user.name}</div>
                  <div className="menu-email">{user.email}</div>
                </div>
              </div>
              <div className="menu-items">
                <button className="menu-item"><Wallet size={18} /> My Wallet</button>
                <button className="menu-item"><Bell size={18} /> Notifications <span className="badge-count">3</span></button>
                <button className="menu-item"><Settings size={18} /> Settings</button>
                <div className="menu-divider"></div>
                <button className="menu-item logout" onClick={logout}><LogOut size={18} /> Sign Out</button>
              </div>
            </div>
          )}

          <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {showMobileMenu && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => { setActiveTab(item.id); setShowMobileMenu(false) }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="menu-divider"></div>
            <button className="mobile-nav-item" onClick={logout}>
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </nav>

      <main className="main-content-modern">
        {renderPage()}
      </main>

      <style>{`
        .app-container {
          min-height: 100vh;
          background: #F8FAFC;
        }

        .navbar-modern {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          height: 70px;
          background: linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .nav-left {
          display: flex;
          align-items: center;
        }

        .logo-modern {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon-modern {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }

        .logo-text {
          font-family: 'Sora', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          letter-spacing: -0.5px;
        }

        .nav-center {
          display: flex;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          padding: 6px;
          border-radius: 14px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .nav-item:hover {
          color: white;
          background: rgba(255,255,255,0.1);
        }

        .nav-item.active {
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }

        .notification-btn-modern {
          position: relative;
          width: 42px;
          height: 42px;
          border: none;
          background: rgba(255,255,255,0.1);
          color: white;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .notification-btn-modern:hover {
          background: rgba(255,255,255,0.2);
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 10px;
          height: 10px;
          background: #EF4444;
          border-radius: 50%;
          border: 2px solid #1E3A5F;
        }

        .user-profile-modern {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 12px 6px 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-profile-modern:hover {
          background: rgba(255,255,255,0.15);
        }

        .user-avatar-modern {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #F59E0B, #D97706);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .user-info-modern {
          display: flex;
          flex-direction: column;
        }

        .user-name-modern {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .user-role {
          color: #10B981;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .user-menu-modern {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 280px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          overflow: hidden;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .menu-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          background: linear-gradient(135deg, #0F172A, #1E3A5F);
          color: white;
        }

        .menu-avatar {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-name {
          font-weight: 600;
          font-size: 1rem;
        }

        .menu-email {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .menu-items {
          padding: 8px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: none;
          color: #374151;
          font-size: 0.9rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .menu-item:hover {
          background: #F3F4F6;
          color: #0F172A;
        }

        .menu-item.logout {
          color: #EF4444;
        }

        .menu-item.logout:hover {
          background: #FEE2E2;
        }

        .badge-count {
          margin-left: auto;
          background: #EF4444;
          color: white;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .menu-divider {
          height: 1px;
          background: #E5E7EB;
          margin: 8px 0;
        }

        .mobile-menu-btn {
          display: none;
          border: none;
          background: none;
          color: white;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          padding: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px 16px;
          border: none;
          background: none;
          color: #374151;
          font-size: 1rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mobile-nav-item.active {
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
        }

        .main-content-modern {
          padding: 32px;
          max-width: 1500px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .nav-center {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
          .mobile-menu {
            display: block;
          }
          .user-info-modern {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .navbar-modern {
            padding: 0 16px;
          }
          .main-content-modern {
            padding: 16px;
          }
          .logo-text {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
