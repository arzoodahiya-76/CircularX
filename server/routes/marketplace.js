const express = require('express');
const router = express.Router();
const { mockInventory } = require('../data/mockData');

router.get('/items', (req, res) => {
  const availableItems = mockInventory.filter(i => i.status === 'Available' && i.quantity > 0);
  
  res.json({
    success: true,
    count: availableItems.length,
    items: availableItems
  });
});

router.get('/items/:id', (req, res) => {
  const item = mockInventory.find(i => i.id === req.params.id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json({ success: true, item });
});

router.post('/request', (req, res) => {
  const { itemIds, quantity, buyerInfo } = req.body;
  
  if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
    return res.status(400).json({ error: 'Item IDs are required' });
  }

  const request = {
    id: 'REQ-' + Date.now().toString(36).toUpperCase(),
    itemIds,
    quantity: quantity || 1,
    buyerInfo: buyerInfo || {},
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  res.json({
    success: true,
    request,
    message: 'Purchase request submitted successfully'
  });
});

router.get('/categories', (req, res) => {
  const categories = [...new Set(mockInventory.map(i => i.type))];
  res.json({ success: true, categories });
});

module.exports = router;
