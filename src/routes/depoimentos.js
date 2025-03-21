const express = require('express');
const depoimentosController = require('../controllers/depoimentosController');
const { uploadDepoimentoFoto, handleMulterErrors } = require('../middleware/uploadDepoimentoFoto');

const router = express.Router();

router.get('/', depoimentosController.getAll);
router.get('/:id', depoimentosController.getById);
router.post('/', uploadDepoimentoFoto.single('foto'), handleMulterErrors, depoimentosController.create);
router.put('/:id', uploadDepoimentoFoto.single('foto'), handleMulterErrors, depoimentosController.update);
router.delete('/:id', depoimentosController.delete);

module.exports = router;
