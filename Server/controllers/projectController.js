const pool = require('../config/db');
const fs = require('fs'); // Untuk menghapus gambar lama jika perlu (opsional)

// 1. GET: Ambil semua project (Tidak berubah)
const getAllProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 2. GET: Ambil project by ID (Tidak berubah)
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 3. POST: Tambah project baru (DENGAN UPLOAD GAMBAR)
const createProject = async (req, res) => {
  try {
    // Tambahkan field baru di destructuring
    const { title, description, tech_stack, repo_link, live_link, latar_belakang, tantangan_teknis, fitur_utama, catatan } = req.body;
    
    // ... (Logika image_url biarkan sama) ...
    let image_url = null;
    if (req.file) {
      image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    // Update Query INSERT
    const newProject = await pool.query(
      `INSERT INTO projects (title, description, tech_stack, image_url, repo_link, live_link, latar_belakang, tantangan_teknis, fitur_utama, catatan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [title, description, tech_stack, image_url, repo_link, live_link, latar_belakang, tantangan_teknis, fitur_utama, catatan]
    );

    res.json(newProject.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 4. PUT: Update project (DENGAN UPLOAD GAMBAR)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Ambil Data dari Body
    // Gunakan fallback {} untuk mencegah error jika body undefined
    const bodyData = req.body || {}; 
    
    const { 
      title, 
      description, 
      tech_stack, 
      repo_link, 
      live_link, 
      latar_belakang, 
      tantangan_teknis, 
      fitur_utama, 
      catatan 
    } = bodyData;

    // 2. LOGIKA IMAGE URL (PENTING!)
    let image_url = null;

    if (req.file) {
      // KASUS A: User upload gambar baru
      // Buat URL baru berdasarkan file yang diupload
      image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    } else {
      // KASUS B: User TIDAK upload gambar (hanya edit teks)
      // Kita harus ambil URL gambar lama dari database agar tidak hilang
      const oldProject = await pool.query('SELECT image_url FROM projects WHERE id = $1', [id]);
      
      if (oldProject.rows.length > 0) {
        image_url = oldProject.rows[0].image_url;
      }
    }

    // 3. Update Query ke Database
    // Pastikan urutan variabel di array [...] SAMA PERSIS dengan urutan $1, $2, dst.
    const updateQuery = await pool.query(
      `UPDATE projects SET 
        title = $1, 
        description = $2, 
        tech_stack = $3, 
        image_url = $4, 
        repo_link = $5, 
        live_link = $6, 
        latar_belakang = $7, 
        tantangan_teknis = $8, 
        fitur_utama = $9, 
        catatan = $10
       WHERE id = $11 RETURNING *`,
      [
        title, 
        description, 
        tech_stack, 
        image_url,      // Ini variabel hasil logika di poin 2
        repo_link, 
        live_link, 
        latar_belakang, 
        tantangan_teknis, 
        fitur_utama, 
        catatan, 
        id              // ID masuk ke $11
      ]
    );

    if (updateQuery.rows.length === 0) {
        return res.status(404).json({ message: "Project tidak ditemukan" });
    }

    res.json({ message: "Project updated", project: updateQuery.rows[0] });

  } catch (err) {
    console.error("SERVER ERROR:", err.message);
    res.status(500).send('Server Error');
  }
};

// 5. DELETE: Hapus project (Tidak berubah)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};