const router = require('express').Router();
const projectController = require('../controllers/projectController');
const authorization = require('../middleware/authorization');
const upload = require('../middleware/upload');
const multer = require('multer');

// PUBLIC (Siapa saja bisa lihat)
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// PROTECTED (Hanya Admin yang punya Token)
// Tambahkan 'authorization' sebagai argumen kedua
router.post('/', authorization, upload.single('image'), projectController.createProject);
router.put('/:id', authorization, upload.single('image'), projectController.updateProject);
router.delete('/:id', authorization, projectController.deleteProject);

module.exports = router;