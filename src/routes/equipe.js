const express = require('express');
const equipeController = require('../controllers/equipeController');
const { uploadEquipeImagem, handleMulterErrors } = require('../middleware/uploadEquipeImagem');

const router = express.Router();

router.get('/', equipeController.getAll);
router.get('/:id', equipeController.getById);
router.post('/', uploadEquipeImagem.single('imagem'), handleMulterErrors, equipeController.create);
router.put('/:id', uploadEquipeImagem.single('imagem'), handleMulterErrors, equipeController.update);
router.delete('/:id', equipeController.delete);

module.exports = router;
