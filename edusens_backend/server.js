const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Health/test route
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'EduSens backend is running' });
});

// Example future route placeholder
app.get('/api/info', (req, res) => {
  res.json({ app: 'EduSens', version: '1.0.0' });
});

// 404 handler for API
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err); // eslint-disable-line no-console
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`EduSens backend listening on port ${PORT}`); // eslint-disable-line no-console
});
