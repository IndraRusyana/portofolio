const pool = require('../Config/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator'); // Nanti kita buat file ini

// 2. LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek user
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password atau Email salah");
    }

    // Cek password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json("Password atau Email salah");
    }

    // Berikan Token
    const token = jwtGenerator(user.rows[0].id);
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { login };