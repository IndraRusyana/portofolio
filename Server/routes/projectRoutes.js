const router = require('express').Router();
const projectController = require('../controllers/projectController');
const authorization = require('../middleware/authorization');
const multer = require('multer');

// --- GUNAKAN KONFIGURASI BARU (Memory Storage) ---
// Ini penting agar file masuk ke RAM (Buffer) dulu untuk diproses Controller Hybrid
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// --- ROUTES ---

// PUBLIC
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// PROTECTED (Admin Only)
// Urutan middleware: Cek Token (authorization) -> Proses File (upload) -> Controller
router.post('/', authorization, upload.single('image'), projectController.createProject);
router.put('/:id', authorization, upload.single('image'), projectController.updateProject);
router.delete('/:id', authorization, projectController.deleteProject);

module.exports = router;