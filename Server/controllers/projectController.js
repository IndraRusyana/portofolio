const pool = require('../Config/db');
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

// --- 1. KONFIGURASI S3 CLIENT ---
// Inisialisasi hanya jika env variable ada
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-3',
});

// --- 2. HELPER FUNCTION: UPLOAD HANDLER (Hybrid) ---
const uploadFileHandler = async (file, req) => {
  if (!file) return null;

  const timestamp = Date.now();
  const fileExtension = path.extname(file.originalname);
  // Hapus spasi di nama file agar URL aman
  const cleanFileName = path.basename(file.originalname, fileExtension).replace(/\s+/g, '-');
  const fileName = `projects/${timestamp}-${cleanFileName}${fileExtension}`;

  // KONDISI A: UPLOAD KE S3 (Jika AWS_BUCKET_NAME ada di .env)
  if (process.env.AWS_BUCKET_NAME) {
    console.log("LOG: Mode Upload S3 Terdeteksi"); // Debugging

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    // Ambil region yang sama persis dengan config client
    const region = process.env.AWS_REGION || 'ap-southeast-3';
    
    // RETURN URL FORMAT BARU
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${region}.amazonaws.com/${fileName}`;
  } 
  
  // KONDISI B: SIMPAN DI LOCAL DISK
  else {
    console.log("LOG: Mode Upload Local Terdeteksi"); // Debugging

    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localFileName = `local-${timestamp}${fileExtension}`;
    const localPath = path.join(uploadDir, localFileName);

    fs.writeFileSync(localPath, file.buffer);

    return `${req.protocol}://${req.get('host')}/uploads/${localFileName}`;
  }
};

// --- CONTROLLERS ---

// 1. GET: Ambil semua project
const getAllProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 2. GET: Ambil project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM public.projects WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 3. POST: Tambah project baru (Hybrid Upload)
const createProject = async (req, res) => {
  try {
    const { title, description, tech_stack, repo_link, live_link, latar_belakang, tantangan_teknis, fitur_utama, catatan } = req.body;
    
    // Panggil Helper Upload
    let image_url = null;
    if (req.file) {
      image_url = await uploadFileHandler(req.file, req);
    }

    const newProject = await pool.query(
      `INSERT INTO public.projects (title, description, tech_stack, image_url, repo_link, live_link, latar_belakang, tantangan_teknis, fitur_utama, catatan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [title, description, tech_stack, image_url, repo_link, live_link, latar_belakang, tantangan_teknis, fitur_utama, catatan]
    );

    res.json(newProject.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 4. PUT: Update project (Hybrid Upload)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const bodyData = req.body || {}; 
    const { 
      title, description, tech_stack, repo_link, live_link, 
      latar_belakang, tantangan_teknis, fitur_utama, catatan 
    } = bodyData;

    let image_url = null;

    // Cek apakah ada file baru diupload
    if (req.file) {
      // Upload file baru (S3 atau Local)
      image_url = await uploadFileHandler(req.file, req);
    } else {
      // Jika tidak ada file baru, ambil URL lama dari DB
      const oldProject = await pool.query('SELECT image_url FROM public.projects WHERE id = $1', [id]);
      if (oldProject.rows.length > 0) {
        image_url = oldProject.rows[0].image_url;
      }
    }

    const updateQuery = await pool.query(
      `UPDATE public.projects SET 
        title = $1, description = $2, tech_stack = $3, image_url = $4, 
        repo_link = $5, live_link = $6, latar_belakang = $7, 
        tantangan_teknis = $8, fitur_utama = $9, catatan = $10
       WHERE id = $11 RETURNING *`,
      [title, description, tech_stack, image_url, repo_link, live_link, latar_belakang, tantangan_teknis, fitur_utama, catatan, id]
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

// 5. DELETE: Hapus project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    // Opsional: Anda bisa menambahkan logika di sini untuk menghapus gambar dari S3 
    // menggunakan DeleteObjectCommand sebelum menghapus data dari DB.
    await pool.query('DELETE FROM public.projects WHERE id = $1', [id]);
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