const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { mockInventory } = require('../data/mockData');

let wallets = {
  '1': {
    userId: '1',
    balance: 50000,
    greenCredits: 250,
    transactions: [
      { id: 'TXN-001', type: 'credit', amount: 50000, description: 'Initial deposit', timestamp: new Date(Date.now() - 86400000 * 7).toISOString() },
      { id: 'TXN-002', type: 'debit', amount: 20000, description: 'Purchase: 5 Smartphones', timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: 'TXN-003', type: 'credit', amount: 500, description: 'Green Credit Earned', timestamp: new Date(Date.now() - 86400000).toISOString() }
    ]
  }
};

let invoices = [];
let purchaseOrders = [];
let activePickups = 0;
let totalRevenue = 0;

const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  NET_BANKING: 'net_banking',
  WALLET: 'wallet',
  COD: 'cod'
};

const mockCardDB = {
  '4111111111111111': { valid: true, name: 'Test Card', expiry: '12/28', balance: 1000000 },
  '5555555555554444': { valid: true, name: 'Test Card 2', expiry: '10/27', balance: 500000 }
};

function validateCard(cardNumber, expiry, cvv) {
  const card = mockCardDB[cardNumber];
  if (!card) return { valid: false, error: 'Card not found' };
  
  const [month, year] = expiry.split('/');
  const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  if (expDate < new Date()) return { valid: false, error: 'Card expired' };
  
  if (cvv.length !== 3 && cvv.length !== 4) return { valid: false, error: 'Invalid CVV' };
  
  return { valid: true, card };
}

function validateUPI(upiId) {
  const upiRegex = /^[a-zA-Z0-9]{3,}@[a-zA-Z]{3,}$/;
  if (!upiRegex.test(upiId)) return { valid: false, error: 'Invalid UPI ID format' };
  return { valid: true };
}

router.get('/payment-methods', (req, res) => {
  res.json({
    success: true,
    methods: [
      { id: 'card', name: 'Credit/Debit Card', icon: 'card' },
      { id: 'upi', name: 'UPI', icon: 'upi' },
      { id: 'net_banking', name: 'Net Banking', icon: 'bank' },
      { id: 'wallet', name: 'Wallet', icon: 'wallet' },
      { id: 'cod', name: 'Cash on Delivery', icon: 'cash' }
    ]
  });
});

router.post('/validate-payment', (req, res) => {
  const { method, cardNumber, expiry, cvv, upiId, bankId } = req.body;
  
  switch (method) {
    case PAYMENT_METHODS.CARD:
      const cardResult = validateCard(cardNumber, expiry, cvv);
      if (!cardResult.valid) {
        return res.json({ success: false, error: cardResult.error });
      }
      res.json({ success: true, method: 'card', validated: true });
      break;
      
    case PAYMENT_METHODS.UPI:
      const upiResult = validateUPI(upiId);
      if (!upiResult.valid) {
        return res.json({ success: false, error: upiResult.error });
      }
      res.json({ success: true, method: 'upi', validated: true });
      break;
      
    case PAYMENT_METHODS.NET_BANKING:
      if (!bankId) {
        return res.json({ success: false, error: 'Please select a bank' });
      }
      res.json({ success: true, method: 'net_banking', validated: true });
      break;
      
    case PAYMENT_METHODS.WALLET:
      res.json({ success: true, method: 'wallet', validated: true });
      break;
      
    case PAYMENT_METHODS.COD:
      res.json({ success: true, method: 'cod', validated: true });
      break;
      
    default:
      res.json({ success: false, error: 'Invalid payment method' });
  }
});

router.post('/process-payment', (req, res) => {
  const { userId, itemIds, amounts, method, paymentDetails } = req.body;
  
  if (!userId || !itemIds || !amounts || !method) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }
  
  const totalAmount = amounts.reduce((sum, a) => sum + a, 0);
  
  if (method === PAYMENT_METHODS.WALLET) {
    if (!wallets[userId]) {
      return res.status(400).json({ success: false, error: 'Wallet not found' });
    }
    
    if (wallets[userId].balance < totalAmount) {
      return res.status(400).json({ 
        success: false, 
        error: 'Insufficient wallet balance',
        required: totalAmount,
        available: wallets[userId].balance
      });
    }
    
    wallets[userId].balance -= totalAmount;
  }
  
  const greenCreditsEarned = Math.floor(totalAmount / 100);
  if (wallets[userId]) {
    wallets[userId].greenCredits += greenCreditsEarned;
  } else {
    wallets[userId] = {
      userId,
      balance: 0,
      greenCredits: greenCreditsEarned,
      transactions: []
    };
  }
  
  activePickups += itemIds.length;
  totalRevenue += totalAmount;
  
  const invoice = {
    id: 'INV-' + uuidv4().split('-')[0].toUpperCase(),
    invoiceNumber: 'CIRCX-' + Date.now(),
    userId,
    items: itemIds.map((itemId, i) => ({
      itemId,
      amount: amounts[i]
    })),
    totalAmount,
    method,
    greenCreditsEarned,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  
  invoices.push(invoice);
  
  itemIds.forEach(itemId => {
    const itemIndex = mockInventory.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
      mockInventory[itemIndex].quantity -= 1;
      if (mockInventory[itemIndex].quantity <= 0) {
        mockInventory[itemIndex].status = 'Sold';
      }
    }
  });
  
  res.json({ 
    success: true, 
    invoice,
    greenCreditsEarned,
    activePickups,
    totalRevenue,
    message: `Payment successful via ${method}! You earned ${greenCreditsEarned} Green Credits.`
  });
});

router.get('/wallet/:userId', (req, res) => {
  const { userId } = req.params;
  const wallet = wallets[userId] || {
    userId,
    balance: 0,
    greenCredits: 0,
    transactions: []
  };
  res.json({ success: true, wallet });
});

router.post('/wallet/add-funds', (req, res) => {
  const { userId, amount, method } = req.body;
  
  if (!wallets[userId]) {
    wallets[userId] = {
      userId,
      balance: 0,
      greenCredits: 0,
      transactions: []
    };
  }
  
  wallets[userId].balance += amount;
  wallets[userId].transactions.unshift({
    id: 'TXN-' + uuidv4().split('-')[0].toUpperCase(),
    type: 'credit',
    amount,
    method,
    description: `Funds added via ${method || 'payment gateway'}`,
    timestamp: new Date().toISOString()
  });
  
  res.json({ success: true, wallet: wallets[userId] });
});

router.post('/green-credits/add', (req, res) => {
  const { userId, credits, description } = req.body;
  
  if (!wallets[userId]) {
    wallets[userId] = {
      userId,
      balance: 0,
      greenCredits: 0,
      transactions: []
    };
  }
  
  wallets[userId].greenCredits += credits;
  wallets[userId].transactions.unshift({
    id: 'TXN-' + uuidv4().split('-')[0].toUpperCase(),
    type: 'credit',
    amount: credits,
    description: description || 'Green Credits Earned',
    timestamp: new Date().toISOString(),
    isGreenCredit: true
  });
  
  res.json({ success: true, wallet: wallets[userId] });
});

router.post('/create-invoice', (req, res) => {
  const { userId, items, amounts, buyerInfo } = req.body;
  
  const invoice = {
    id: 'INV-' + uuidv4().split('-')[0].toUpperCase(),
    invoiceNumber: 'CIRCX-' + Date.now(),
    userId,
    items: items.map((itemId, i) => ({
      itemId,
      amount: amounts[i]
    })),
    buyerInfo,
    totalAmount: amounts.reduce((sum, a) => sum + a, 0),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  invoices.push(invoice);
  
  res.json({ success: true, invoice });
});

router.get('/invoices/:userId', (req, res) => {
  const { userId } = req.params;
  const userInvoices = invoices.filter(inv => inv.userId === userId);
  res.json({ success: true, invoices: userInvoices });
});

router.get('/invoice/:id', (req, res) => {
  const { id } = req.params;
  const invoice = invoices.find(inv => inv.id === id);
  
  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  
  res.json({ success: true, invoice });
});

router.get('/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      activePickups,
      totalRevenue,
      totalInvoices: invoices.length,
      completedPayments: invoices.filter(i => i.status === 'completed').length
    }
  });
});

module.exports = router;
