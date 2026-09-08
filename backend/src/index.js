const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const programRoutes = require('./routes/programs');
const eventRoutes = require('./routes/events');
const blogRoutes = require('./routes/blogs');
const contactRoutes = require('./routes/contact');
const donationRoutes = require('./routes/donations');
const volunteerRoutes = require('./routes/volunteers');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Health check & API root
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'GTT Foundation NGO Backend API',
    timestamp: new Date().toISOString()
  });
});

const path = require('path');
const fs = require('fs');

// Serve static frontend files if built (for unified deployment on Render/Railway/Heroku/VPS)
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the GTT Foundation NGO API',
      docs: '/api/health'
    });
  });
}

// 404 handler for API routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start standalone server if run directly
if (process.env.NODE_ENV !== 'production' || require.main === module || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 NGO Backend API is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
