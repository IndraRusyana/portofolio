const { Pool } = require('pg');
require('dotenv').config();

const isProduction = !!process.env.DATABASE_URL;

const pool = new Pool({
  // === OPSI 1: Koneksi via Connection String (Prioritas Utama untuk Neon) ===
  connectionString: process.env.DATABASE_URL || undefined,

  // === OPSI 2: Koneksi via Parameter Individual (Fallback untuk Local) ===
  // Ini hanya akan dipakai jika connectionString di atas bernilai undefined
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

  // === Pengaturan SSL (Otomatis) ===
  // Jika ada DATABASE_URL (Neon), aktifkan SSL. Jika local, matikan (false).
  ssl: isProduction ? { rejectUnauthorized: false } : false,
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