const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('BASE44_API_KEY:', process.env.BASE44_API_KEY ? 'set' : 'not set');
console.log('BASE44_APP_ID:', process.env.BASE44_APP_ID ? 'set' : 'not set');

const express = require('express');
const cors = require('cors');

const aiRoutes = require('./routes/ai');
const serpApiRoutes = require('./routes/serpapi');
const scheduleRoutes = require('./routes/schedule');
const inventoryRoutes = require('./routes/inventory');
const marketplaceRoutes = require('./routes/marketplace');
const notificationRoutes = require('./routes/notifications');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/ai', aiRoutes);
app.use('/api/ai', serpApiRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CircularX API is running' });
});

app.listen(PORT, () => {
  console.log(`CircularX server running on http://localhost:${PORT}`);
});
