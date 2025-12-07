const pool = require('./Config/db');
const bcrypt = require('bcrypt');

const seedAdmin = async () => {
  try {
    // 1. Tentukan Username & Password Admin kamu di sini
    const username = "admin"; 
    const password = "password"; // Ganti ini dengan password yang kuat!

    console.log(`Sedang membuat akun admin: ${username}...`);

    // 2. Enkripsi Password (Hashing)
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 3. Masukkan ke Database
    // Pastikan tabel 'users' sudah dibuat sesuai langkah sebelumnya
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, bcryptPassword]
    );

    console.log("SUKSES! Admin berhasil dibuat.");
    console.log("ID:", newUser.rows[0].id);
    console.log("Username:", newUser.rows[0].username);
    
    // Matikan koneksi database setelah selesai
    pool.end();
  } catch (err) {
    console.error("GAGAL:", err.message);
    pool.end();
  }
};

seedAdmin();