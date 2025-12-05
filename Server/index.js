const express = require('express');
const cors = require('cors');
const pool = require('./Config/db'); // Import koneksi DB tadi
const path = require('path');
require('dotenv').config();

// IMPORT ROUTES DI SINI
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json()); // Agar bisa baca data JSON dari frontend (req.body)
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// GUNAKAN ROUTES DI SINI
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Route Test Sederhana
app.get('/', (req, res) => {
  res.send('Server Portfolio berjalan dengan baik!');
});

// Cek koneksi DB via route (Opsional, untuk memastikan)
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Koneksi DB Sukses', time: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});