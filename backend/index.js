// index.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// parse JSON bodies (for later endpoints)
app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime_seconds: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// root (optional)
app.get('/', (req, res) => {
  res.send('MediGuide API running. Try GET /health');
});

app.listen(PORT, () => {
  console.log(`MediGuide API listening on http://localhost:${PORT}`);
});
