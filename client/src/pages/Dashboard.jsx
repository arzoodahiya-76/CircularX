import React, { useState } from 'react'
import { 
  Package, Recycle, DollarSign, TrendingUp, Smartphone, Battery, Monitor, Plug, Watch, 
  ShoppingCart, Filter, TreePine, Zap, Trash2, Award, Target, Leaf, Download, FileText, 
  Plus, X, CreditCard, Wallet, Building, Check, AlertCircle, Truck, Globe, Moon, Sun,
  Activity, PieChart, BarChart, ArrowUp, ArrowDown, Search, Eye
} from 'lucide-react'
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area } from 'recharts'

const typeIcons = {
  Smartphone: Smartphone,
  Laptop: Monitor,
  Tablet: Monitor,
  Charger: Plug,
  Battery: Battery,
  Monitor: Monitor,
  Smartwatch: Watch
}

const BADGES = [
  { id: 'first', name: 'First Collection', description: 'Collected your first item', icon: Award, color: '#10B981' },
  { id: 'eco10', name: 'Eco Warrior', description: 'Saved 10kg CO2', icon: Leaf, color: '#059669' },
  { id: 'tree50', name: 'Tree Planter', description: 'Equivalent to planting 50 trees', icon: TreePine, color: '#047857' },
  { id: 'energy100', name: 'Energy Saver', description: 'Saved 100 kWh energy', icon: Zap, color: '#F59E0B' },
  { id: 'cleanup', name: 'Clean Up Hero', description: 'Diverted 5kg from landfill', icon: Trash2, color: '#DC2626' },
  { id: 'century', name: 'Century Club', description: 'Collected 100 items', icon: Target, color: '#8B5CF6' }
]

function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [metrics, setMetrics] = useState({ totalItemsCollected: 47, totalSearches: 128, totalValueSearched: 2450000, activePickups: 3, materialRecovered: { gold: 2.3, silver: 5.8, copper: 45.2, aluminum: 28.1, plastic: 156 }, environmentalImpact: { co2Saved: 156, energySaved: 2450, landfillsDiverted: 89, treesEquivalent: 42 } })
  const [inventory, setInventory] = useState([
    { id: 'INV-001', type: 'Smartphone', condition: 'Good', weight: 180, status: 'Available', price: 12500, quantity: 1 },
    { id: 'INV-002', type: 'Laptop', condition: 'Fair', weight: 1500, status: 'In-Transit', price: 28000, quantity: 1 },
    { id: 'INV-003', type: 'Tablet', condition: 'Excellent', weight: 450, status: 'Sold', price: 18000, quantity: 1 },
    { id: 'INV-004', type: 'Smartphone', condition: 'Damaged', weight: 175, status: 'Available', price: 4500, quantity: 1 },
    { id: 'INV-005', type: 'Battery', condition: 'Good', weight: 500, status: 'Available', price: 2500, quantity: 2 },
    { id: 'INV-006', type: 'Charger', condition: 'Fair', weight: 120, status: 'Available', price: 800, quantity: 3 },
  ])
  const [marketplace, setMarketplace] = useState([
    { id: 'MKT-001', type: 'Smartphone', condition: 'Good', weight: 180, status: 'Available', price: 12500, quantity: 1 },
    { id: 'MKT-002', type: 'Laptop', condition: 'Good', weight: 1500, status: 'Available', price: 45000, quantity: 1 },
    { id: 'MKT-003', type: 'Tablet', condition: 'Excellent', weight: 450, status: 'Available', price: 28000, quantity: 1 },
    { id: 'MKT-004', type: 'Smartwatch', condition: 'Fair', weight: 80, status: 'Available', price: 5500, quantity: 2 },
    { id: 'MKT-005', type: 'Monitor', condition: 'Good', weight: 3500, status: 'Available', price: 12000, quantity: 1 },
    { id: 'MKT-006', type: 'Charger', condition: 'New', weight: 120, status: 'Available', price: 1500, quantity: 5 },
  ])
  const [filters, setFilters] = useState({ status: 'all', type: 'all', search: '' })
  const [showListProduct, setShowListProduct] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [wallet, setWallet] = useState({ balance: 15680, greenCredits: 234 })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [newProduct, setNewProduct] = useState({ type: 'Smartphone', condition: 'Good', price: '', description: '' })

  const handleListProduct = () => {
    if (!newProduct.price || newProduct.price <= 0) {
      alert('Please enter a valid price')
      return
    }
    const newItem = {
      id: `MKT-${Date.now()}`,
      type: newProduct.type,
      condition: newProduct.condition,
      weight: Math.floor(Math.random() * 500) + 100,
      status: 'Available',
      price: parseInt(newProduct.price),
      quantity: 1
    }
    setMarketplace(prev => [newItem, ...prev])
    setInventory(prev => [{ ...newItem, id: `INV-${Date.now()}` }, ...prev])
    setShowListProduct(false)
    setNewProduct({ type: 'Smartphone', condition: 'Good', price: '', description: '' })
    alert(`Product "${newItem.type}" listed successfully for ${formatINR(newItem.price)}!`)
    setActiveTab('marketplace')
  }

  const filteredInventory = inventory.filter(item => {
    if (filters.status !== 'all' && item.status.toLowerCase().replace(' ', '-') !== filters.status) return false
    if (filters.type !== 'all' && item.type.toLowerCase() !== filters.type) return false
    if (filters.search && !item.type.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const handlePurchase = (item) => {
    setSelectedItems([item])
    setShowPayment(true)
  }

  const processPayment = () => {
    setShowPayment(false)
    setSelectedItems([])
    alert('Payment successful! Order placed.')
  }

  const handleExport = (type) => {
    const data = type === 'pdf' 
      ? { title: 'CircularX Report', generated: new Date().toISOString(), metrics, inventory, marketplace }
      : 'ID,Type,Condition,Weight,Status,Price,Quantity\n' + inventory.map(i => `${i.id},${i.type},${i.condition},${i.weight},${i.status},${i.price},${i.quantity}`).join('\n')
    
    const blob = new Blob([typeof data === 'string' ? data : JSON.stringify(data, null, 2)], { 
      type: type === 'pdf' ? 'application/json' : 'text/csv' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `circularx-report-${new Date().toISOString().split('T')[0]}.${type === 'pdf' ? 'json' : 'csv'}`
    a.click()
  }

  const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0)
  const formatNumber = (num) => num >= 1000000 ? (num / 1000000).toFixed(1) + 'M' : num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num?.toFixed(1) || '0'

  const getEarnedBadges = () => {
    if (!metrics) return []
    return BADGES.filter(badge => {
      switch(badge.id) {
        case 'first': return (metrics.totalItemsCollected || 0) >= 1
        case 'eco10': return (metrics.environmentalImpact?.co2Saved || 0) >= 10
        case 'tree50': return (metrics.environmentalImpact?.treesEquivalent || 0) >= 50
        case 'energy100': return (metrics.environmentalImpact?.energySaved || 0) >= 100
        case 'cleanup': return (metrics.environmentalImpact?.landfillsDiverted || 0) >= 5
        case 'century': return (metrics.totalItemsCollected || 0) >= 100
        default: return false
      }
    })
  }

  const getStatusColor = (status) => {
    if (status === 'Available') return { bg: '#D1FAE5', color: '#065F46' }
    if (status === 'Sold') return { bg: '#DBEAFE', color: '#1D4ED8' }
    if (status === 'In-Transit') return { bg: '#FEF3C7', color: '#92400E' }
    return { bg: '#FEE2E2', color: '#991B1B' }
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'inventory' && 'My Inventory'}
            {activeTab === 'marketplace' && 'Marketplace'}
          </h1>
          <p>
            {activeTab === 'dashboard' && 'Track your e-waste impact and environmental contribution'}
            {activeTab === 'inventory' && 'Manage your recycled devices and materials'}
            {activeTab === 'marketplace' && 'Browse and trade refurbished electronics'}
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn" onClick={() => handleExport('pdf')}>
            <FileText size={18} /> PDF
          </button>
          <button className="action-btn" onClick={() => handleExport('csv')}>
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      <div className="tabs-container">
        <button className={`tab-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <BarChart size={18} /> Dashboard
        </button>
        <button className={`tab-item ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
          <Package size={18} /> Inventory
        </button>
        <button className={`tab-item ${activeTab === 'marketplace' ? 'active' : ''}`} onClick={() => setActiveTab('marketplace')}>
          <ShoppingCart size={18} /> Marketplace
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div className="metrics-grid">
            {[
              { icon: Package, label: 'Total Items', value: metrics?.totalItemsCollected || 0, color: '#10B981', gradient: 'green', trend: '+12%' },
              { icon: TrendingUp, label: 'AI Searches', value: metrics?.totalSearches || 0, color: '#8B5CF6', gradient: 'purple', trend: '+8%' },
              { icon: DollarSign, label: 'Value Searched', value: formatINR(metrics?.totalValueSearched || 0), color: '#F59E0B', gradient: 'amber', isValue: true, trend: '+15%' },
              { icon: Truck, label: 'Active Pickups', value: metrics?.activePickups || 0, color: '#3B82F6', gradient: 'blue', trend: '+3' }
            ].map((item, i) => (
              <div key={i} className="metric-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`metric-icon ${item.gradient}`}><item.icon size={22} /></div>
                <div className="metric-content">
                  <span className="metric-value">{item.value}</span>
                  <span className="metric-label">{item.label}</span>
                </div>
                {item.trend && (
                  <span className="metric-trend positive">
                    <ArrowUp size={14} /> {item.trend}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card impact-card">
              <div className="card-header">
                <h3><Leaf size={20} /> Environmental Impact</h3>
                <span className="eco-badge">Eco Impact</span>
              </div>
              <div className="impact-grid">
                {[
                  { name: 'CO2 Saved', value: metrics?.environmentalImpact?.co2Saved || 0, unit: 'kg', color: '#10B981', icon: Globe },
                  { name: 'Energy Saved', value: metrics?.environmentalImpact?.energySaved || 0, unit: 'kWh', color: '#F59E0B', icon: Zap },
                  { name: 'Landfill Diverted', value: metrics?.environmentalImpact?.landfillsDiverted || 0, unit: 'kg', color: '#8B5CF6', icon: Trash2 },
                  { name: 'Trees Equivalent', value: metrics?.environmentalImpact?.treesEquivalent || 0, unit: 'trees', color: '#059669', icon: TreePine }
                ].map((item, i) => (
                  <div key={i} className="impact-item" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="impact-icon" style={{ background: item.color + '20', color: item.color }}>
                      <item.icon size={18} />
                    </div>
                    <div className="impact-info">
                      <span className="impact-value">{formatNumber(item.value)} {item.unit}</span>
                      <span className="impact-label">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="impact-chart">
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={[
                    { month: 'Jan', impact: 20 }, { month: 'Feb', impact: 35 },
                    { month: 'Mar', impact: 45 }, { month: 'Apr', impact: 60 },
                    { month: 'May', impact: 80 }, { month: 'Jun', impact: metrics?.environmentalImpact?.co2Saved || 100 }
                  ]}>
                    <defs>
                      <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="impact" stroke="#10B981" fill="url(#impactGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card wallet-card">
              <div className="card-header">
                <h3><Wallet size={20} /> Your Wallet</h3>
              </div>
              <div className="wallet-balance">
                <span className="balance-label">Available Balance</span>
                <span className="balance-value">{formatINR(wallet?.balance || 0)}</span>
              </div>
              <div className="green-credits">
                <Leaf size={18} />
                <span>{wallet?.greenCredits || 0} Green Credits</span>
              </div>
              <div className="wallet-actions">
                <button className="wallet-btn add">+ Add Funds</button>
                <button className="wallet-btn">History</button>
              </div>
            </div>

            <div className="dashboard-card badges-card">
              <div className="card-header">
                <h3><Award size={20} /> Achievements</h3>
                <span className="badge-count">{getEarnedBadges().length}/{BADGES.length}</span>
              </div>
              <div className="badges-grid">
                {BADGES.map((badge, i) => {
                  const earned = getEarnedBadges().find(b => b.id === badge.id)
                  return (
                    <div key={i} className={`badge-item ${earned ? 'earned' : ''}`} style={earned ? { background: badge.color + '15', borderColor: badge.color } : {}}>
                      <div className="badge-icon" style={earned ? { background: badge.color, color: 'white' } : {}}>
                        <badge.icon size={18} />
                      </div>
                      <div className="badge-info">
                        <span className="badge-name">{badge.name}</span>
                        <span className="badge-desc">{badge.description}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="dashboard-card materials-card">
              <div className="card-header">
                <h3><Recycle size={20} /> Material Recovery</h3>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <RechartsPie>
                  <Pie
                    data={[
                      { name: 'Gold', value: metrics?.materialRecovered?.gold || 0, color: '#FFD700' },
                      { name: 'Silver', value: metrics?.materialRecovered?.silver || 0, color: '#C0C0C0' },
                      { name: 'Copper', value: metrics?.materialRecovered?.copper || 0, color: '#B87333' },
                      { name: 'Aluminum', value: metrics?.materialRecovered?.aluminum || 0, color: '#A9A9A9' },
                      { name: 'Plastic', value: metrics?.materialRecovered?.plastic || 0, color: '#4A90D9' }
                    ]}
                    cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                    dataKey="value"
                  >
                    {[
                      { name: 'Gold', value: metrics?.materialRecovered?.gold || 0, color: '#FFD700' },
                      { name: 'Silver', value: metrics?.materialRecovered?.silver || 0, color: '#C0C0C0' },
                      { name: 'Copper', value: metrics?.materialRecovered?.copper || 0, color: '#B87333' },
                      { name: 'Aluminum', value: metrics?.materialRecovered?.aluminum || 0, color: '#A9A9A9' },
                      { name: 'Plastic', value: metrics?.materialRecovered?.plastic || 0, color: '#4A90D9' }
                    ].map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
              <div className="materials-legend">
                {[
                  { name: 'Gold', value: metrics?.materialRecovered?.gold, color: '#FFD700' },
                  { name: 'Silver', value: metrics?.materialRecovered?.silver, color: '#C0C0C0' },
                  { name: 'Copper', value: metrics?.materialRecovered?.copper, color: '#B87333' }
                ].map((item, i) => (
                  <div key={i} className="legend-item">
                    <span className="legend-dot" style={{ background: item.color }}></span>
                    <span>{item.name}: {item.value?.toFixed(2) || 0}kg</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'inventory' && (
        <div className="inventory-section">
          <div className="section-header">
            <div className="filter-group">
              <div className="search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <select className="filter-select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="in-transit">In-Transit</option>
              </select>
              <select className="filter-select" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                <option value="all">All Types</option>
                <option value="smartphone">Smartphone</option>
                <option value="laptop">Laptop</option>
                <option value="tablet">Tablet</option>
              </select>
            </div>
            <span className="item-count">{filteredInventory.length} items</span>
          </div>
          
          <div className="inventory-grid">
            {filteredInventory.map((item, i) => (
              <div key={item.id} className="inventory-card" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="inventory-icon" style={{ background: item.type === 'Smartphone' ? 'linear-gradient(135deg, #10B981, #059669)' : item.type === 'Laptop' ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                  {typeIcons[item.type] ? React.createElement(typeIcons[item.type], { size: 28 }) : <Package size={28} />}
                </div>
                <div className="inventory-info">
                  <h4>{item.type}</h4>
                  <p>{item.condition} • {item.weight}g</p>
                  <div className="inventory-meta">
                    <span className={`status ${item.status.toLowerCase().replace(' ', '-')}`} style={{ background: getStatusColor(item.status).bg, color: getStatusColor(item.status).color }}>{item.status}</span>
                    <span className="price">{formatINR(item.price)}</span>
                  </div>
                  <span className="quantity">Qty: {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'marketplace' && (
        <div className="marketplace-section">
          <div className="section-header">
            <h3>Available Products</h3>
            <button className="list-btn" onClick={() => setShowListProduct(true)}>
              <Plus size={18} /> List Product
            </button>
          </div>
          
          <div className="marketplace-grid">
            {marketplace.map((item, i) => {
              const Icon = typeIcons[item.type] || Package
              return (
                <div key={item.id} className="product-card" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="product-image">
                    <Icon size={40} />
                    <span className="product-badge">{item.condition}</span>
                  </div>
                  <div className="product-info">
                    <h4>{item.type}</h4>
                    <p>{item.weight}g • {item.quantity} available</p>
                    <div className="product-price">{formatINR(item.price)}</div>
                    <button className="buy-btn" onClick={() => handlePurchase(item)}>
                      <ShoppingCart size={16} /> Buy Now
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {showListProduct && (
        <div className="modal-overlay" onClick={() => setShowListProduct(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>List Your Product</h3>
              <button onClick={() => setShowListProduct(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Product Type</label>
                <select value={newProduct.type} onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}>
                  {Object.keys(typeIcons).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label>Condition</label>
                <select value={newProduct.condition} onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Damaged</option>
                </select>
              </div>
              <div className="form-field">
                <label>Price (₹)</label>
                <input type="number" placeholder="Enter price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea rows={3} placeholder="Describe your product" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
              </div>
              <button className="submit-btn" onClick={handleListProduct}>List Product</button>
            </div>
          </div>
        </div>
      )}

      {showPayment && (
        <div className="modal-overlay" onClick={() => setShowPayment(false)}>
          <div className="modal-content payment-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Complete Payment</h3>
              <button onClick={() => setShowPayment(false)}><X size={20} /></button>
            </div>
            <div className="payment-summary">
              <span>Total Amount</span>
              <span className="payment-value">{formatINR(selectedItems.reduce((s, i) => s + i.price, 0))}</span>
            </div>
            <div className="payment-methods">
              {[
                { id: 'card', icon: CreditCard, label: 'Card' },
                { id: 'upi', icon: Smartphone, label: 'UPI' },
                { id: 'wallet', icon: Wallet, label: 'Wallet' }
              ].map((method) => (
                <button key={method.id} className={`method-btn ${paymentMethod === method.id ? 'active' : ''}`} onClick={() => setPaymentMethod(method.id)}>
                  <method.icon size={20} />
                  <span>{method.label}</span>
                </button>
              ))}
            </div>
            <button className="pay-btn" onClick={processPayment}>
              Pay {formatINR(selectedItems.reduce((s, i) => s + i.price, 0))}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .dashboard-page {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .header-left h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .header-left p {
          color: #64748B;
          margin: 4px 0 0;
        }

        .header-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        .tabs-container {
          display: flex;
          gap: 8px;
          background: white;
          padding: 8px;
          border-radius: 16px;
          margin-bottom: 24px;
        }

        .tab-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: transparent;
          border: none;
          border-radius: 12px;
          font-weight: 500;
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-item.active {
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .tab-item:hover:not(.active) {
          background: #F1F5F9;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .metric-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .metric-icon.green { background: linear-gradient(135deg, #10B981, #059669); }
        .metric-icon.purple { background: linear-gradient(135deg, #8B5CF6, #6D28D9); }
        .metric-icon.amber { background: linear-gradient(135deg, #F59E0B, #D97706); }
        .metric-icon.blue { background: linear-gradient(135deg, #3B82F6, #1D4ED8); }

        .metric-content {
          flex: 1;
        }

        .metric-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #0F172A;
        }

        .metric-label {
          font-size: 0.85rem;
          color: #64748B;
        }

        .metric-trend {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 8px;
        }

        .metric-trend.positive {
          background: #D1FAE5;
          color: #065F46;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .dashboard-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .card-header h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          color: #0F172A;
          margin: 0;
        }

        .eco-badge {
          background: #D1FAE5;
          color: #065F46;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .impact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: #F8FAFC;
          border-radius: 14px;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .impact-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .impact-value {
          display: block;
          font-weight: 600;
          color: #0F172A;
          font-size: 1rem;
        }

        .impact-label {
          font-size: 0.75rem;
          color: #64748B;
        }

        .wallet-balance {
          text-align: center;
          padding: 20px;
          background: linear-gradient(135deg, #0F172A, #1E3A5F);
          border-radius: 16px;
          margin-bottom: 16px;
        }

        .balance-label {
          display: block;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
          margin-bottom: 4px;
        }

        .balance-value {
          font-size: 2rem;
          font-weight: 700;
          color: white;
        }

        .green-credits {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #10B981;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .wallet-actions {
          display: flex;
          gap: 10px;
        }

        .wallet-btn {
          flex: 1;
          padding: 12px;
          border: 1px solid #E2E8F0;
          background: white;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .wallet-btn.add {
          background: #10B981;
          color: white;
          border-color: #10B981;
        }

        .wallet-btn:hover {
          background: #F8FAFC;
        }

        .wallet-btn.add:hover {
          background: #059669;
        }

        .badge-count {
          background: #F1F5F9;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .badges-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: all 0.2s;
        }

        .badge-item.earned {
          transform: scale(1.02);
        }

        .badge-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F1F5F9;
          color: #94A3B8;
        }

        .badge-name {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
          color: #0F172A;
        }

        .badge-desc {
          font-size: 0.75rem;
          color: #64748B;
        }

        .materials-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 16px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #64748B;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #0F172A;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
        }

        .search-box input {
          border: none;
          outline: none;
          font-size: 0.9rem;
          width: 150px;
        }

        .filter-select {
          padding: 10px 16px;
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .filter-group {
          display: flex;
          gap: 10px;
        }

        .item-count {
          color: #64748B;
          font-size: 0.9rem;
        }

        .list-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .inventory-grid, .marketplace-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .inventory-card, .product-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .inventory-card:hover, .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }

        .inventory-icon, .product-image {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 14px;
        }

        .inventory-info h4, .product-info h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #0F172A;
          margin: 0 0 4px;
        }

        .inventory-info p, .product-info p {
          color: #64748B;
          font-size: 0.85rem;
          margin: 0 0 12px;
        }

        .inventory-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .status {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .price, .product-price {
          font-weight: 700;
          color: #10B981;
        }

        .quantity {
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .product-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 4px 10px;
          background: white;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .product-card {
          position: relative;
        }

        .buy-btn {
          width: 100%;
          padding: 10px;
          background: #F1F5F9;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .buy-btn:hover {
          background: #10B981;
          color: white;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 450px;
          animation: slideUp 0.3s;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 0;
        }

        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .modal-header button {
          width: 36px;
          height: 36px;
          border: none;
          background: #F1F5F9;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-body {
          padding: 24px;
        }

        .form-field {
          margin-bottom: 16px;
        }

        .form-field label {
          display: block;
          font-weight: 500;
          margin-bottom: 8px;
          color: #374151;
        }

        .form-field select, .form-field input, .form-field textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #E2E8F0;
          border-radius: 10px;
          font-size: 0.95rem;
        }

        .form-field select:focus, .form-field input:focus, .form-field textarea:focus {
          outline: none;
          border-color: #10B981;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }

        .payment-modal {
          max-width: 400px;
        }

        .payment-summary {
          display: flex;
          justify-content: space-between;
          padding: 16px 24px;
          background: #F8FAFC;
          margin: 16px 24px;
          border-radius: 12px;
        }

        .payment-value {
          font-weight: 700;
          font-size: 1.25rem;
          color: #10B981;
        }

        .payment-methods {
          display: flex;
          gap: 10px;
          padding: 0 24px;
          margin-bottom: 20px;
        }

        .method-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 14px;
          background: #F8FAFC;
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .method-btn.active {
          border-color: #10B981;
          background: #D1FAE5;
        }

        .pay-btn {
          width: calc(100% - 48px);
          margin: 0 24px 24px;
          padding: 16px;
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .inventory-grid, .marketplace-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .tabs-container {
            flex-wrap: wrap;
          }
          .filter-group {
            flex-wrap: wrap;
          }
          .inventory-grid, .marketplace-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
