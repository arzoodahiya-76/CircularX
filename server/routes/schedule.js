const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const { hubLocations, mockBookings } = require('../data/mockData');

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

router.get('/hubs', (req, res) => {
  const userLat = parseFloat(req.query.lat) || 28.6139;
  const userLng = parseFloat(req.query.lng) || 77.2090;
  
  const hubsWithDistance = hubLocations.map(hub => ({
    ...hub,
    distance: calculateDistance(userLat, userLng, hub.lat, hub.lng).toFixed(1)
  }));
  
  hubsWithDistance.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  
  res.json({
    success: true,
    hubs: hubsWithDistance,
    userLocation: { lat: userLat, lng: userLng }
  });
});

router.get('/slots/:date', (req, res) => {
  const { date } = req.params;
  const day = new Date(date).getDay();
  
  if (day === 0 || day === 6) {
    return res.json({ slots: [], message: 'No slots available on weekends' });
  }

  res.json({
    slots: [
      { id: 'AM', time: '9:00 AM - 12:00 PM', available: true },
      { id: 'PM', time: '2:00 PM - 5:00 PM', available: true }
    ]
  });
});

router.post('/create', async (req, res) => {
  try {
    const { type, date, timeSlot, location, items, hubId } = req.body;

    if (!type || !date || !timeSlot) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const bookingId = 'BK-' + uuidv4().split('-')[0].toUpperCase();
    const booking = {
      id: bookingId,
      type,
      date,
      timeSlot,
      location: type === 'hub' ? hubLocations.find(h => h.id === hubId) : location,
      items: items || [],
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    if (type === 'hub') {
      const qrData = JSON.stringify({
        bookingId,
        hubId,
        date,
        timeSlot,
        items: items?.length || 0
      });
      booking.qrCode = await QRCode.toDataURL(qrData);
    }

    mockBookings.push(booking);

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/bookings', (req, res) => {
  res.json({
    success: true,
    bookings: mockBookings
  });
});

router.get('/bookings/:id', (req, res) => {
  const booking = mockBookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json({ success: true, booking });
});

module.exports = router;
