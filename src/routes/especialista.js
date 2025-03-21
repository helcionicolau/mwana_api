const express = require('express');
const especialistaController = require('../controllers/especialistaController');
const { uploadEspecialistaImagem, handleMulterErrors } = require('../middleware/uploadEspecialistaImagem');

const router = express.Router();

router.get('/', especialistaController.getAll);
router.get('/:id', especialistaController.getById);
router.post('/', uploadEspecialistaImagem.single('imagem'), handleMulterErrors, especialistaController.create);
router.put('/:id', uploadEspecialistaImagem.single('imagem'), handleMulterErrors, especialistaController.update);
router.delete('/:id', especialistaController.delete);

module.exports = router;
