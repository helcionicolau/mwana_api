const express = require('express');
const publicidadeController = require('../controllers/publicidadeController');
const { uploadPublicidadeImagem, handleMulterErrors } = require('../middleware/uploadPublicidadeImagem');

const router = express.Router();

router.get('/', publicidadeController.getAll);
router.get('/:id', publicidadeController.getById);
router.post('/', uploadPublicidadeImagem.single('imagem'), handleMulterErrors, publicidadeController.create);
router.put('/:id', uploadPublicidadeImagem.single('imagem'), handleMulterErrors, publicidadeController.update);
router.delete('/:id', publicidadeController.delete);

module.exports = router;
