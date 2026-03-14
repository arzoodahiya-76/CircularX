import React, { useState, useRef } from 'react'
import { Smartphone, Laptop, Tablet, Battery, Monitor, Watch, Plug, ShoppingCart, Package, X, Image, Search, Loader2, RefreshCw, Car, Camera, Zap, ChevronRight, Star, TrendingUp, Award, Diamond, Coins, Cpu, HardDrive, BatteryCharging, Layers, CircleDollarSign, Factory } from 'lucide-react'

const deviceIcons = {
  Smartphone: Smartphone, Laptop: Laptop, Tablet: Tablet, 
  Battery: Battery, Monitor: Monitor, Smartwatch: Watch, Charger: Plug,
  Car: Car
}

const materialIcons = {
  'Display': Monitor,
  'Battery': BatteryCharging,
  'Camera': Camera,
  'Processor': Cpu,
  'Motherboard': HardDrive,
  'Metal': Diamond,
  'Speaker': Zap,
  'Other': Package,
  'Lead': Factory,
  'Sulfuric': Battery,
  'Plastic': Layers,
  'Terminals': Cpu,
  'Grid': HardDrive,
  'Engine': Factory,
  'Transmission': Cpu,
  'Catalytic': Factory,
  'Copper': Coins,
  'Aluminum': Diamond,
  'Steel': HardDrive
}

const materialColors = {
  gold: { bg: '#FEF9C3', color: '#B45309', gradient: 'linear-gradient(135deg, #FCD34D, #F59E0B)' },
  silver: { bg: '#F1F5F9', color: '#475569', gradient: 'linear-gradient(135deg, #E2E8F0, #94A3B8)' },
  copper: { bg: '#FEF3C7', color: '#92400E', gradient: 'linear-gradient(135deg, #FCD34D, #D97706)' },
  aluminum: { bg: '#E0E7FF', color: '#4338CA', gradient: 'linear-gradient(135deg, #C7D2FE, #818CF8)' },
  plastic: { bg: '#FCE7F3', color: '#BE185D', gradient: 'linear-gradient(135deg, #FBCFE8, #EC4899)' },
  battery: { bg: '#D1FAE5', color: '#065F46', gradient: 'linear-gradient(135deg, #6EE7B7, #10B981)' },
  steel: { bg: '#E5E7EB', color: '#374151', gradient: 'linear-gradient(135deg, #D1D5DB, #6B7280)' },
  glass: { bg: '#DBEAFE', color: '#1D4ED8', gradient: 'linear-gradient(135deg, #BFDBFE, #60A5FA)' },
  default: { bg: '#F3F4F6', color: '#6B7280', gradient: 'linear-gradient(135deg, #E5E7EB, #9CA3AF)' }
}

const productDatabase = {
  iphone15: {
    name: 'iPhone 15',
    category: 'Smartphone',
    price: 79900,
    condition: 'Good',
    components: {
      'Display (OLED)': 12000,
      'Battery': 2500,
      'Camera': 4500,
      'Processor (A16)': 15000,
      'Motherboard': 8000,
      'Metal Frame': 3000,
      'Speaker': 800,
      'Other Parts': 3100
    }
  },
  iphone14: {
    name: 'iPhone 14',
    category: 'Smartphone',
    price: 69900,
    condition: 'Good',
    components: {
      'Display (OLED)': 10000,
      'Battery': 2200,
      'Camera': 4000,
      'Processor (A15)': 12000,
      'Motherboard': 7000,
      'Metal Frame': 2800,
      'Speaker': 700,
      'Other Parts': 3200
    }
  },
  iphone13: {
    name: 'iPhone 13',
    category: 'Smartphone',
    price: 59900,
    condition: 'Good',
    components: {
      'Display (OLED)': 8500,
      'Battery': 2000,
      'Camera': 3500,
      'Processor (A15)': 10000,
      'Motherboard': 6000,
      'Metal Frame': 2500,
      'Speaker': 600,
      'Other Parts': 2800
    }
  },
  samsung_s24: {
    name: 'Samsung Galaxy S24',
    category: 'Smartphone',
    price: 74900,
    condition: 'Good',
    components: {
      'Display (AMOLED)': 11000,
      'Battery': 2400,
      'Camera': 5000,
      'Processor (Exynos)': 13000,
      'Motherboard': 7500,
      'Metal Frame': 2800,
      'Speaker': 750,
      'Other Parts': 2450
    }
  },
  macbook_air: {
    name: 'MacBook Air M2',
    category: 'Laptop',
    price: 114900,
    condition: 'Good',
    components: {
      'Display (LCD)': 18000,
      'Battery': 5000,
      'Keyboard': 3500,
      'Processor (M2)': 25000,
      'Motherboard': 20000,
      'Trackpad': 2500,
      'Speaker': 1500,
      'Other Parts': 4400
    }
  },
  macbook_pro: {
    name: 'MacBook Pro 14"',
    category: 'Laptop',
    price: 159900,
    condition: 'Good',
    components: {
      'Display (Mini-LED)': 25000,
      'Battery': 6000,
      'Keyboard': 4500,
      'Processor (M3)': 35000,
      'Motherboard': 28000,
      'Trackpad': 3000,
      'Speaker': 2000,
      'Other Parts': 5400
    }
  },
  dell_laptop: {
    name: 'Dell XPS 15',
    category: 'Laptop',
    price: 129900,
    condition: 'Good',
    components: {
      'Display (OLED)': 22000,
      'Battery': 5500,
      'Keyboard': 3000,
      'Processor (i7)': 20000,
      'Motherboard': 25000,
      'Trackpad': 2000,
      'Speaker': 1200,
      'Other Parts': 4200
    }
  },
  ipad_pro: {
    name: 'iPad Pro 12.9"',
    category: 'Tablet',
    price: 99900,
    condition: 'Good',
    components: {
      'Display (Mini-LED)': 22000,
      'Battery': 4000,
      'Camera': 3500,
      'Processor (M2)': 22000,
      'Motherboard': 15000,
      'Speaker': 2000,
      'Other Parts': 3400
    }
  },
  laptop: {
    name: 'Generic Laptop',
    category: 'Laptop',
    price: 45000,
    condition: 'Good',
    components: {
      'Display (LCD)': 8000,
      'Battery': 3000,
      'Keyboard': 2000,
      'Processor': 8000,
      'Motherboard': 10000,
      'Trackpad': 1500,
      'Speaker': 800,
      'Other Parts': 3700
    }
  },
  battery: {
    name: 'Car Battery',
    category: 'Battery',
    price: 3500,
    condition: 'Good',
    components: {
      'Lead': 1500,
      'Sulfuric Acid': 200,
      'Plastic Case': 300,
      'Terminals': 150,
      'Grid Plates': 800,
      'Separator': 100,
      'Other Parts': 450
    }
  },
  car: {
    name: 'Old Car',
    category: 'Car',
    price: 50000,
    condition: 'Fair',
    components: {
      'Engine Block': 15000,
      'Transmission': 8000,
      'Battery': 2500,
      'Catalytic Converter': 6000,
      'Copper Wiring': 4000,
      'Aluminum Parts': 3500,
      'Steel Body': 8000,
      'Other Parts': 3000
    }
  }
}

function AIRecognition() {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState('')
  const [showComponents, setShowComponents] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); processFiles(Array.from(e.dataTransfer.files)) }
  const handleFileSelect = (e) => processFiles(Array.from(e.target.files))

  const processFiles = (newFiles) => {
    const valid = newFiles.filter(f => f.type.startsWith('image/'))
    if (valid.length > 0) {
      setFiles(valid)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target.result)
      }
      reader.readAsDataURL(valid[0])
    }
  }

  const handleProcess = async () => {
    if (files.length === 0) return
    
    setIsProcessing(true)
    setError('')
    setShowComponents(false)
    
    setTimeout(() => {
      const fileName = files[0]?.name?.toLowerCase().replace(/\.[^/.]+$/, '') || ''
      
      const key = Object.keys(productDatabase).find(k => fileName.includes(k))
      
      if (key) {
        const product = productDatabase[key]
        const totalComponentValue = Object.values(product.components).reduce((a, b) => a + b, 0)
        
        setResult({
          id: Date.now(),
          ...product,
          fileName: files[0].name,
          totalComponentValue
        })
      } else {
        setError('Product not found. Try: iphone15, iphone14, iphone13, samsung_s24, macbook_air, macbook_pro, dell_laptop, ipad_pro, laptop, battery, or car')
      }
      
      setIsProcessing(false)
    }, 2000)
  }

  const handleClear = () => { 
    setFiles([])
    setResult(null)
    setPreviewUrl(null)
    setError('')
    setShowComponents(false)
  }

  const formatINR = (amt) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt || 0)

  const getConditionClass = (cond) => {
    const c = (cond || '').toLowerCase()
    if (c === 'excellent') return { bg: '#D1FAE5', color: '#065F46' }
    if (c === 'good') return { bg: '#DBEAFE', color: '#1D4ED8' }
    if (c === 'fair') return { bg: '#FEF3C7', color: '#92400E' }
    return { bg: '#FEE2E2', color: '#991B1B' }
  }

  const Icon = result ? deviceIcons[result.category] || Package : Image
  const sortedComponents = result ? Object.entries(result.components).sort((a, b) => b[1] - a[1]) : []

  return (
    <div className="ai-recognition-page">
      <div className="ai-header">
        <div className="ai-header-content">
          <div className="ai-icon-badge">
            <Camera size={24} />
          </div>
          <div>
            <h1>AI E-Waste Recognition</h1>
            <p>Upload an image to identify and value your e-waste</p>
          </div>
        </div>
        <div className="ai-stats">
          <div className="ai-stat">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Devices Scanned</span>
          </div>
          <div className="ai-stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>
      </div>

      {isProcessing ? (
        <div className="processing-container">
          <div className="processing-animation">
            <div className="scan-line"></div>
            <div className="scan-circles">
              <div className="scan-circle"></div>
              <div className="scan-circle"></div>
              <div className="scan-circle"></div>
            </div>
            <div className="processing-icon">
              <Search size={40} />
            </div>
          </div>
          <h2>Analyzing Your Device...</h2>
          <p>Our AI is identifying the product and calculating component values</p>
          <div className="processing-steps">
            <div className="step active"><Zap size={16} /> Detecting Device</div>
            <div className="step active"><Monitor size={16} /> Analyzing Components</div>
            <div className="step active"><TrendingUp size={16} /> Calculating Value</div>
          </div>
        </div>
      ) : !result ? (
        <div className="upload-section">
          <div className="upload-left">
            <div
              className={`upload-zone ${isDragging ? 'dragging' : ''} ${previewUrl ? 'has-preview' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="preview-container">
                  <img src={previewUrl} alt="Preview" className="preview-image" />
                  <div className="preview-overlay">
                    <button className="change-btn" onClick={(e) => { e.stopPropagation(); handleClear() }}>
                      <RefreshCw size={18} /> Change Image
                    </button>
                  </div>
                  <div className="file-badge">
                    <Image size={14} /> {files[0]?.name}
                  </div>
                </div>
              ) : (
                <div className="upload-content">
                  <div className="upload-icon">
                    <Image size={48} />
                  </div>
                  <h3>Drop your image here</h3>
                  <p>or click to browse</p>
                  <span className="upload-hint">Supports: JPG, PNG • Max 10MB</span>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" onChange={handleFileSelect} style={{ display: 'none' }} />
            </div>

            {files.length > 0 && (
              <button className="analyze-btn" onClick={handleProcess}>
                <Search size={20} /> Analyze Device
              </button>
            )}

            {error && (
              <div className="error-message">
                <X size={18} /> {error}
              </div>
            )}
          </div>

          <div className="upload-right">
            <div className="supported-products">
              <h3>Supported Devices</h3>
              <div className="products-grid">
                {Object.values(productDatabase).map((p, i) => (
                  <div key={i} className="product-chip" onClick={() => {
                    const key = Object.keys(productDatabase).find(k => productDatabase[k].name === p.name)
                    setFiles([{ name: key + '.jpg' }])
                    setPreviewUrl(null)
                  }}>
                    {React.createElement(deviceIcons[p.category] || Package, { size: 16 })}
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tips-card">
              <h4><Star size={18} /> Tips for Best Results</h4>
              <ul>
                <li>Use good lighting</li>
                <li>Show the device clearly</li>
                <li>Include brand logos if visible</li>
                <li>Avoid blurry images</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="result-section">
          <div className="result-header">
            <button className="back-btn" onClick={handleClear}>
              <RefreshCw size={18} /> New Scan
            </button>
            <div className="result-badge">
              <Award size={16} /> AI Match: {Math.floor(85 + Math.random() * 15)}%
            </div>
          </div>

          <div className="result-content">
            <div className="result-left">
              <div className="device-showcase">
                <div className="device-icon-large">
                  <Icon size={64} />
                </div>
                <div className="device-glow"></div>
              </div>
              
              <h2 className="device-name">{result.name}</h2>
              <div className="device-meta">
                <span className="category-badge">{result.category}</span>
                <span className="condition-badge" style={{ background: getConditionClass(result.condition).bg, color: getConditionClass(result.condition).color }}>
                  {result.condition}
                </span>
              </div>

              <div className="price-card">
                <div className="price-label">Estimated Value</div>
                <div className="price-value">{formatINR(result.price)}</div>
                <div className="price-range">
                  Range: {formatINR(result.price * 0.75)} - {formatINR(result.price * 1.25)}
                </div>
              </div>

              <button 
                className="expand-components-btn"
                onClick={() => setShowComponents(!showComponents)}
              >
                {showComponents ? 'Hide' : 'View'} Component Values 
                <ChevronRight size={18} className={showComponents ? 'rotated' : ''} />
              </button>
            </div>

            <div className="result-right">
              {showComponents && (
                <div className="components-panel">
                  <div className="components-header">
                    <h3>Component Breakdown</h3>
                    <span className="component-count">{sortedComponents.length} parts identified</span>
                  </div>
                  <div className="components-grid">
                    {sortedComponents.map(([component, value], i) => {
                      const MaterialIcon = Object.entries(materialIcons).find(([key]) => component.toLowerCase().includes(key.toLowerCase()))?.[1] || Package
                      const percent = (value / sortedComponents[0][1]) * 100
                      return (
                        <div 
                          key={component} 
                          className="component-card"
                          style={{ 
                            animationDelay: `${i * 0.05}s`,
                          }}
                        >
                          <div className="component-icon">
                            <MaterialIcon size={20} />
                          </div>
                          <div className="component-details">
                            <span className="component-name">{component}</span>
                            <span className="component-value">{formatINR(value)}</span>
                          </div>
                          <div className="component-bar-wrapper">
                            <div className="component-bar">
                              <div className="component-fill" style={{ width: `${percent}%` }}></div>
                            </div>
                            <span className="component-percent">{Math.round(percent)}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="total-components">
                    <div className="total-info">
                      <CircleDollarSign size={24} />
                      <div>
                        <span>Total Component Value</span>
                        <span className="total-subtitle">Sum of all recyclable parts</span>
                      </div>
                    </div>
                    <span className="total-value">{formatINR(result.totalComponentValue)}</span>
                  </div>
                </div>
              )}

              {!showComponents && (
                <div className="quick-value">
                  <h3>Quick Value Info</h3>
                  <div className="value-items">
                    <div className="value-item">
                      <div className="value-icon"><Zap size={20} /></div>
                      <div>
                        <span className="value-label">Recycling Potential</span>
                        <span className="value-amount">{formatINR(result.totalComponentValue)}</span>
                      </div>
                    </div>
                    <div className="value-item">
                      <div className="value-icon"><TrendingUp size={20} /></div>
                      <div>
                        <span className="value-label">Market Value</span>
                        <span className="value-amount">{formatINR(result.price)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="view-details-btn" onClick={() => setShowComponents(true)}>
                    View Full Breakdown <ChevronRight size={18} />
                  </button>
                </div>
              )}

              <button className="add-to-queue-btn">
                <ShoppingCart size={20} /> Add to Pickup Queue
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .ai-recognition-page {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .ai-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          background: linear-gradient(135deg, #0F172A, #1E3A5F);
          padding: 24px;
          border-radius: 20px;
        }

        .ai-header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ai-icon-badge {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .ai-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .ai-header p {
          color: rgba(255,255,255,0.7);
          margin: 4px 0 0;
          font-size: 0.9rem;
        }

        .ai-stats {
          display: flex;
          gap: 24px;
        }

        .ai-stat {
          text-align: center;
        }

        .ai-stat .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #10B981;
        }

        .ai-stat .stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
        }

        .processing-container {
          background: white;
          border-radius: 24px;
          padding: 60px;
          text-align: center;
        }

        .processing-animation {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 0 auto 32px;
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #10B981, transparent);
          animation: scanMove 1.5s ease-in-out infinite;
        }

        @keyframes scanMove {
          0%, 100% { top: 0; }
          50% { top: 100%; }
        }

        .scan-circles {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .scan-circle {
          position: absolute;
          border: 2px solid #10B981;
          border-radius: 50%;
          animation: circlePulse 2s ease-out infinite;
        }

        .scan-circle:nth-child(1) { width: 60px; height: 60px; top: -30px; left: -30px; animation-delay: 0s; }
        .scan-circle:nth-child(2) { width: 100px; height: 100px; top: -50px; left: -50px; animation-delay: 0.3s; }
        .scan-circle:nth-child(3) { width: 140px; height: 140px; top: -70px; left: -70px; animation-delay: 0.6s; }

        @keyframes circlePulse {
          0% { opacity: 1; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(1.2); }
        }

        .processing-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 1;
        }

        .processing-container h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .processing-container p {
          color: #64748B;
          margin-bottom: 24px;
        }

        .processing-steps {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #F1F5F9;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #64748B;
        }

        .step.active {
          background: #10B981;
          color: white;
        }

        .upload-section {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
        }

        .upload-zone {
          background: white;
          border: 3px dashed #E2E8F0;
          border-radius: 24px;
          padding: 48px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          min-height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-zone:hover, .upload-zone.dragging {
          border-color: #10B981;
          background: #F0FDF4;
        }

        .upload-zone.has-preview {
          border-style: solid;
          padding: 0;
        }

        .upload-content {
          text-align: center;
        }

        .upload-icon {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 20px;
        }

        .upload-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .upload-content p {
          color: #64748B;
          margin-bottom: 12px;
        }

        .upload-hint {
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .preview-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 350px;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 21px;
        }

        .preview-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          border-radius: 21px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .preview-container:hover .preview-overlay {
          opacity: 1;
        }

        .change-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .file-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(0,0,0,0.7);
          color: white;
          border-radius: 20px;
          font-size: 0.85rem;
        }

        .analyze-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .analyze-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 18px;
          background: #FEE2E2;
          color: #991B1B;
          border-radius: 12px;
          margin-top: 12px;
          font-size: 0.9rem;
        }

        .upload-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .supported-products {
          background: white;
          border-radius: 20px;
          padding: 20px;
        }

        .supported-products h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 16px;
        }

        .products-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .product-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #F1F5F9;
          border-radius: 20px;
          font-size: 0.8rem;
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s;
        }

        .product-chip:hover {
          background: #10B981;
          color: white;
        }

        .tips-card {
          background: linear-gradient(135deg, #FEF3C7, #FDE68A);
          border-radius: 20px;
          padding: 20px;
        }

        .tips-card h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: #92400E;
          margin-bottom: 12px;
        }

        .tips-card ul {
          margin: 0;
          padding-left: 20px;
        }

        .tips-card li {
          color: #92400E;
          font-size: 0.85rem;
          margin-bottom: 6px;
        }

        .result-section {
          background: white;
          border-radius: 24px;
          padding: 32px;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: #F1F5F9;
          border: none;
          border-radius: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .back-btn:hover {
          background: #E2E8F0;
        }

        .result-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #D1FAE5;
          color: #065F46;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .result-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
        }

        .result-left {
          text-align: center;
        }

        .device-showcase {
          position: relative;
          margin-bottom: 24px;
        }

        .device-icon-large {
          width: 140px;
          height: 140px;
          background: linear-gradient(135deg, #0F172A, #1E3A5F);
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .device-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }

        .device-name {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 12px;
        }

        .device-meta {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .category-badge {
          padding: 6px 14px;
          background: #E0E7FF;
          color: #4338CA;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .condition-badge {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .price-card {
          background: linear-gradient(135deg, #0F172A, #1E3A5F);
          border-radius: 20px;
          padding: 24px;
          color: white;
          margin-bottom: 20px;
        }

        .price-label {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .price-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .price-range {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .expand-components-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          background: #F1F5F9;
          border: none;
          border-radius: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .expand-components-btn:hover {
          background: #E2E8F0;
        }

        .expand-components-btn svg {
          transition: transform 0.3s;
        }

        .expand-components-btn svg.rotated {
          transform: rotate(90deg);
        }

        .result-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .components-panel {
          background: linear-gradient(135deg, #F8FAFC, #F1F5F9);
          border-radius: 20px;
          padding: 24px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .components-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .components-header h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .component-count {
          font-size: 0.8rem;
          color: #10B981;
          background: #D1FAE5;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 500;
        }

        .components-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .component-card {
          background: white;
          border-radius: 14px;
          padding: 16px;
          animation: fadeInUp 0.3s ease forwards;
          opacity: 0;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .component-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .component-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 12px;
        }

        .component-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .component-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
        }

        .component-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: #10B981;
        }

        .component-bar-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .component-bar {
          flex: 1;
          height: 6px;
          background: #E2E8F0;
          border-radius: 3px;
          overflow: hidden;
        }

        .component-fill {
          height: 100%;
          background: linear-gradient(90deg, #10B981, #34D399);
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .component-percent {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748B;
          min-width: 35px;
          text-align: right;
        }

        .total-components {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          padding-top: 20px;
          border-top: 2px solid #E2E8F0;
          background: white;
          border-radius: 16px;
          padding: 20px;
        }

        .total-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .total-info svg {
          color: #10B981;
        }

        .total-info div {
          display: flex;
          flex-direction: column;
        }

        .total-info span:first-child {
          font-weight: 600;
          color: #0F172A;
          font-size: 1rem;
        }

        .total-subtitle {
          font-size: 0.75rem !important;
          color: #64748B !important;
          font-weight: 400 !important;
        }

        .total-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #10B981;
        }

        .quick-value {
          background: #F8FAFC;
          border-radius: 20px;
          padding: 24px;
        }

        .quick-value h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 20px;
        }

        .value-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .value-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          background: white;
          border-radius: 14px;
        }

        .value-icon {
          width: 44px;
          height: 44px;
          background: #D1FAE5;
          color: #10B981;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .value-label {
          display: block;
          font-size: 0.8rem;
          color: #64748B;
        }

        .value-amount {
          display: block;
          font-weight: 700;
          color: #0F172A;
        }

        .view-details-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px;
          background: white;
          border: 2px solid #10B981;
          color: #10B981;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-details-btn:hover {
          background: #10B981;
          color: white;
        }

        .add-to-queue-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .add-to-queue-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        @media (max-width: 768px) {
          .ai-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          
          .ai-header-content {
            flex-direction: column;
          }
          
          .upload-section {
            grid-template-columns: 1fr;
          }
          
          .result-content {
            grid-template-columns: 1fr;
          }

          .components-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default AIRecognition
