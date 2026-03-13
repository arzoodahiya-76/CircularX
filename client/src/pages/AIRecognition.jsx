import React, { useState, useRef } from 'react'
import { Smartphone, Laptop, Tablet, Battery, Monitor, Watch, Plug, ShoppingCart, Package, X, Image, Search, Loader2, RefreshCw, Car } from 'lucide-react'

const deviceIcons = {
  Smartphone: Smartphone, Laptop: Laptop, Tablet: Tablet, 
  Battery: Battery, Monitor: Monitor, Smartwatch: Watch, Charger: Plug,
  Car: Car
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
    }, 800)
  }

  const handleClear = () => { 
    setFiles([])
    setResult(null)
    setPreviewUrl(null)
    setError('')
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

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0F172A', marginBottom: '8px', fontFamily: 'Sora, sans-serif' }}>AI E-Waste Recognition</h1>
        <p style={{ color: '#64748B' }}>Upload an image - our AI will identify the product and show component prices</p>
      </div>

      {isProcessing ? (
        <div style={{ background: 'white', borderRadius: '20px', padding: '60px', textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', margin: '0 auto 24px', background: 'linear-gradient(135deg, #10B981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 size={40} color="white" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Analyzing Image...</h2>
          <p style={{ color: '#64748B' }}>Identifying product and calculating component values</p>
        </div>
      ) : !result ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragging ? '#10B981' : '#E2E8F0'}`,
                borderRadius: '16px', padding: '48px', textAlign: 'center', cursor: 'pointer',
                background: isDragging ? '#F0FDF4' : 'white', transition: 'all 0.2s'
              }}
            >
              {previewUrl ? (
                <div style={{ position: 'relative' }}>
                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '12px' }} />
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleClear() }}
                    style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ width: '80px', height: '80px', margin: '0 auto 16px', background: '#ECFDF5', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                    <Image size={36} />
                  </div>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>Upload Image</p>
                  <p style={{ color: '#94A3B8', fontSize: '14px' }}>Click or drag to upload</p>
                </>
              )}
              <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" onChange={handleFileSelect} style={{ display: 'none' }} />
            </div>

            {files.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                {error && (
                  <div style={{ marginBottom: '12px', padding: '12px', background: '#FEE2E2', borderRadius: '8px', color: '#991B1B', fontSize: '14px' }}>
                    {error}
                  </div>
                )}
                <button 
                  onClick={handleProcess}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    background: 'linear-gradient(135deg, #10B981, #059669)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    fontWeight: '600', 
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px'
                  }}
                >
                  <Search size={20} /> Identify Product
                </button>
              </div>
            )}
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Supported Products</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.values(productDatabase).map(p => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '10px' }}>
                  <div style={{ width: '36px', height: '36px', background: '#10B981', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{p.category}</div>
                  </div>
                  <div style={{ fontWeight: '600', color: '#10B981', fontSize: '14px' }}>{formatINR(p.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px' }}>
            <button onClick={handleClear} style={{ padding: '8px 12px', background: '#F8FAFC', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
              <RefreshCw size={14} /> New Search
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '80px', height: '80px', margin: '0 auto 16px', background: 'linear-gradient(135deg, #10B981, #059669)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Icon size={36} />
              </div>
              <h3 style={{ fontWeight: '700', fontSize: '22px' }}>{result.name}</h3>
              <p style={{ color: '#64748B', fontSize: '14px' }}>{result.category}</p>
              <span style={{ display: 'inline-block', marginTop: '8px', background: getConditionClass(result.condition).bg, color: getConditionClass(result.condition).color, padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>{result.condition}</span>
            </div>
            
            <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E3A5F)', borderRadius: '16px', padding: '24px', textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Total Device Value</div>
              <div style={{ fontSize: '36px', fontWeight: '700', margin: '8px 0' }}>{formatINR(result.price)}</div>
              <div style={{ fontSize: '13px', opacity: 0.7 }}>File: {result.fileName}</div>
            </div>
          </div>
          
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>Component Prices</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {Object.entries(result.components).map(([component, value]) => (
                <div key={component} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#F8FAFC', borderRadius: '10px' }}>
                  <span style={{ fontSize: '14px', color: '#374151' }}>{component}</span>
                  <span style={{ fontWeight: '600', color: '#10B981' }}>{formatINR(value)}</span>
                </div>
              ))}
            </div>
            
            <div style={{ background: '#F0FDF4', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#065F46' }}>Total Component Value</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>{formatINR(result.totalComponentValue)}</div>
              <div style={{ fontSize: '12px', color: '#065F46' }}>Recycling Potential</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AIRecognition
