const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    // 1. Ambil token dari header (Authorization: Bearer <token>)
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Tidak diizinkan (Not Authorized)");
    }

    // 2. Cek validitas token
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;
    next(); // Lanjut ke proses berikutnya (Controller)
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Token tidak valid");
  }
};