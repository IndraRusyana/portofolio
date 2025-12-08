const serverless = require('serverless-http'); // --- [MODIFIKASI 1: Import library]
const express = require('express');
const cors = require('cors');
const pool = require('./Config/db'); 
const path = require('path');
require('dotenv').config();

// IMPORT ROUTES
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token', 'x-requested-with']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// GUNAKAN ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Route Test Sederhana
app.get('/', (req, res) => {
  res.send('Server Portfolio berjalan dengan baik!');
});

// Cek koneksi DB
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Koneksi DB Sukses', time: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

if (require.main === module) {
  // JIKA LOKAL: Jalankan app.listen seperti biasa
  app.listen(port, () => {
    console.log(`Server LOKAL berjalan di port ${port}`);
  });
} else {
  // JIKA LAMBDA: Jangan jalankan app.listen, tapi export handler
  module.exports.handler = serverless(app, {
    binary: ['image/*', 'multipart/form-data'] 
  });
}