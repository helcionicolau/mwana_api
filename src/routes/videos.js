const express = require('express');
const videosController = require('../controllers/videosController');
const { uploadVideo, handleMulterErrors } = require('../middleware/uploadVideo');

const router = express.Router();

router.get('/', videosController.getAll);
router.get('/:id', videosController.getById);
router.post('/', uploadVideo.single('video'), handleMulterErrors, videosController.create);
router.put('/:id', uploadVideo.single('video'), handleMulterErrors, videosController.update);
router.delete('/:id', videosController.delete);

module.exports = router;
