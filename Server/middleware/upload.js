const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Simpan di folder 'uploads'
  },
  filename: function (req, file, cb) {
    // Format nama file: project-TIMESTAMP.jpg
    cb(null, 'project-' + Date.now() + path.extname(file.originalname));
  }
});

// Filter agar hanya menerima gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung! Hanya jpg/png.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal 5MB
  fileFilter: fileFilter
});

module.exports = upload;