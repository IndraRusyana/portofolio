const { Pool } = require('pg');
require('dotenv').config();

// Membuat koneksi "Pool" (Kumpulan koneksi agar lebih efisien)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Tes koneksi saat aplikasi jalan
pool.connect((err) => {
  if (err) {
    console.error('Koneksi ke Database GAGAL', err.stack);
  } else {
    console.log('Berhasil terhubung ke Database PostgreSQL');
  }
});

module.exports = pool;