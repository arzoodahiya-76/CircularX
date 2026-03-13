const express = require('express');
const router = express.Router();
const { mockInventory, generateDashboardMetrics } = require('../data/mockData');
const { v4: uuidv4 } = require('uuid');

let searchCount = 0
let totalValueSearched = 0
let totalSales = 0
let activePickups = 0
let totalRevenue = 0

router.get('/', (req, res) => {
  const { status, type, sort } = req.query;
  
  let filtered = [...mockInventory];
  
  if (status && status !== 'all') {
    filtered = filtered.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }
  
  if (type && type !== 'all') {
    filtered = filtered.filter(i => i.type.toLowerCase() === type.toLowerCase());
  }
  
  if (sort) {
    const [field, order] = sort.split('-');
    filtered.sort((a, b) => {
      if (order === 'asc') return a[field] > b[field] ? 1 : -1;
      return a[field] < b[field] ? 1 : -1;
    });
  }

  res.json({
    success: true,
    count: filtered.length,
    items: filtered
  });
});

router.get('/metrics', (req, res) => {
  const metrics = generateDashboardMetrics();
  metrics.totalSearches = searchCount;
  metrics.totalValueSearched = totalValueSearched;
  metrics.totalSales = totalSales;
  metrics.activePickups = activePickups;
  metrics.totalRevenue = totalRevenue;
  res.json({ success: true, metrics });
});

router.post('/add', (req, res) => {
  const { type, condition, weight, materials, price, quantity, listedBy } = req.body;
  
  if (!type || !condition) {
    return res.status(400).json({ error: 'Type and condition are required' });
  }

  const item = {
    id: 'INV-' + uuidv4().split('-')[0].toUpperCase(),
    type,
    condition,
    weight: weight || 100,
    materials: materials || {},
    status: 'Available',
    price: price || 0,
    quantity: quantity || 1,
    listedBy: listedBy || 'user',
    listedAt: new Date().toISOString()
  };

  mockInventory.push(item);
  
  res.json({
    success: true,
    item,
    message: 'Product listed successfully!'
  });
});

router.post('/record-search', (req, res) => {
  const { itemCount, totalValue } = req.body;
  searchCount += itemCount || 1;
  totalValueSearched += totalValue || 0;
  
  res.json({
    success: true,
    stats: {
      totalSearches: searchCount,
      totalValueSearched
    }
  });
});

router.post('/record-sale', (req, res) => {
  const { itemIds, totalAmount } = req.body;
  
  totalSales += itemIds.length;
  activePickups += itemIds.length;
  totalRevenue += totalAmount || 0;
  
  itemIds.forEach(itemId => {
    const index = mockInventory.findIndex(i => i.id === itemId);
    if (index !== -1) {
      mockInventory[index].quantity -= 1;
      if (mockInventory[index].quantity <= 0) {
        mockInventory[index].status = 'Sold';
      }
    }
  });
  
  res.json({
    success: true,
    stats: {
      totalSales,
      activePickups,
      totalRevenue
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const index = mockInventory.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  mockInventory[index] = { ...mockInventory[index], ...updates };
  
  res.json({
    success: true,
    item: mockInventory[index]
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = mockInventory.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  mockInventory.splice(index, 1);
  
  res.json({ success: true, message: 'Item deleted' });
});

router.get('/search-stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalSearches: searchCount,
      totalValueSearched,
      totalSales,
      activePickups,
      totalRevenue
    }
  });
});

module.exports = router;
