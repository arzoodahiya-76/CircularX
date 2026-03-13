const API_BASE = '/api'

export const aiApi = {
  recognize: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${API_BASE}/ai/recognize`, {
      method: 'POST',
      body: formData
    })
    return response.json()
  },
  
  recognizeMultiple: async (files) => {
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    
    const response = await fetch(`${API_BASE}/ai/recognize-multiple`, {
      method: 'POST',
      body: formData
    })
    return response.json()
  },
  
  getDeviceTypes: async () => {
    const response = await fetch(`${API_BASE}/ai/device-types`)
    return response.json()
  },
  
  getRecentSearches: async () => {
    const response = await fetch(`${API_BASE}/ai/recent-searches`)
    return response.json()
  },
  
  getSearchStats: async () => {
    const response = await fetch(`${API_BASE}/ai/search-stats`)
    return response.json()
  },
  
  analyzeByCategory: async (category, aiPredictions) => {
    const response = await fetch(`${API_BASE}/ai/analyze-by-category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, aiPredictions })
    })
    return response.json()
  },
  
  searchWithAI: async (imageUrls, query) => {
    const response = await fetch(`${API_BASE}/ai/search-internet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrls, query })
    })
    return response.json()
  },
  
  searchWithGoogleLens: async (imageUrl) => {
    const response = await fetch(`${API_BASE}/ai/google-lens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl })
    })
    return response.json()
  }
}

export const scheduleApi = {
  getHubs: async (lat, lng) => {
    const response = await fetch(`${API_BASE}/schedule/hubs?lat=${lat}&lng=${lng}`)
    return response.json()
  },
  
  getSlots: async (date) => {
    const response = await fetch(`${API_BASE}/schedule/slots/${date}`)
    return response.json()
  },
  
  createBooking: async (bookingData) => {
    const response = await fetch(`${API_BASE}/schedule/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
    return response.json()
  },
  
  getBookings: async () => {
    const response = await fetch(`${API_BASE}/schedule/bookings`)
    return response.json()
  }
}

export const inventoryApi = {
  getItems: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}/inventory?${query}`)
    return response.json()
  },
  
  getMetrics: async () => {
    const response = await fetch(`${API_BASE}/inventory/metrics`)
    return response.json()
  },
  
  addItem: async (itemData) => {
    const response = await fetch(`${API_BASE}/inventory/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData)
    })
    return response.json()
  },
  
  updateItem: async (id, updates) => {
    const response = await fetch(`${API_BASE}/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    return response.json()
  },
  
  getSearchStats: async () => {
    const response = await fetch(`${API_BASE}/inventory/search-stats`)
    return response.json()
  }
}

export const marketplaceApi = {
  getItems: async () => {
    const response = await fetch(`${API_BASE}/marketplace/items`)
    return response.json()
  },
  
  requestPurchase: async (requestData) => {
    const response = await fetch(`${API_BASE}/marketplace/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    })
    return response.json()
  }
}

export const paymentApi = {
  getWallet: async (userId) => {
    const response = await fetch(`${API_BASE}/payment/wallet/${userId}`)
    return response.json()
  },
  
  addFunds: async (userId, amount) => {
    const response = await fetch(`${API_BASE}/payment/wallet/add-funds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount })
    })
    return response.json()
  },
  
  processPayment: async (userId, itemIds, amounts) => {
    const response = await fetch(`${API_BASE}/payment/process-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemIds, amounts })
    })
    return response.json()
  },
  
  getInvoices: async (userId) => {
    const response = await fetch(`${API_BASE}/payment/invoices/${userId}`)
    return response.json()
  },
  
  createInvoice: async (userId, items, amounts, buyerInfo) => {
    const response = await fetch(`${API_BASE}/payment/create-invoice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items, amounts, buyerInfo })
    })
    return response.json()
  }
}

export const notificationApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/notifications`)
    return response.json()
  },
  
  getUnreadCount: async () => {
    const response = await fetch(`${API_BASE}/notifications/unread-count`)
    return response.json()
  },
  
  markRead: async (id) => {
    const response = await fetch(`${API_BASE}/notifications/mark-read/${id}`, {
      method: 'POST'
    })
    return response.json()
  },
  
  markAllRead: async () => {
    const response = await fetch(`${API_BASE}/notifications/mark-all-read`, {
      method: 'POST'
    })
    return response.json()
  }
}
