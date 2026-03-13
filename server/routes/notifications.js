const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let notifications = [
  {
    id: 'NOT-001',
    type: 'reminder',
    title: 'Pickup Tomorrow',
    message: 'Your e-waste pickup is scheduled for tomorrow. Please prepare your items.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: 'NOT-002',
    type: 'success',
    title: 'Pickup Completed',
    message: 'Your pickup has been completed. Thank you for contributing to a greener planet!',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true
  },
  {
    id: 'NOT-003',
    type: 'info',
    title: 'New Marketplace Listing',
    message: 'New refurbished devices are now available in the marketplace.',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: true
  }
];

const scheduledPickups = [];

router.get('/', (req, res) => {
  res.json({
    success: true,
    notifications
  });
});

router.get('/unread-count', (req, res) => {
  const count = notifications.filter(n => !n.read).length;
  res.json({ success: true, count });
});

router.post('/mark-read/:id', (req, res) => {
  const { id } = req.params;
  const notification = notifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
  res.json({ success: true });
});

router.post('/mark-all-read', (req, res) => {
  notifications.forEach(n => n.read = true);
  res.json({ success: true });
});

router.post('/schedule-pickup-reminder', (req, res) => {
  const { bookingId, date, timeSlot, type } = req.body;
  
  const reminder = {
    id: 'NOT-' + uuidv4().split('-')[0].toUpperCase(),
    type: 'reminder',
    title: `Pickup Scheduled: ${date}`,
    message: `Your ${type} pickup is scheduled for ${date} (${timeSlot}). Please prepare your items.`,
    timestamp: new Date().toISOString(),
    read: false,
    bookingId
  };
  
  notifications.unshift(reminder);
  scheduledPickups.push({ bookingId, date, timeSlot, type, reminderId: reminder.id });
  
  res.json({ success: true, notification: reminder });
});

router.post('/send-summary', (req, res) => {
  const { userId, period } = req.body;
  
  const summaryNotification = {
    id: 'NOT-' + uuidv4().split('-')[0].toUpperCase(),
    type: 'summary',
    title: 'Environmental Impact Summary',
    message: `Great job! This month you helped recycle ${Math.floor(Math.random() * 50 + 10)} devices, saving ${Math.floor(Math.random() * 100 + 50)}kg CO2.`,
    timestamp: new Date().toISOString(),
    read: false,
    userId
  };
  
  notifications.unshift(summaryNotification);
  
  res.json({ success: true, notification: summaryNotification });
});

router.get('/upcoming-pickups', (req, res) => {
  res.json({
    success: true,
    pickups: scheduledPickups
  });
});

module.exports = router;
