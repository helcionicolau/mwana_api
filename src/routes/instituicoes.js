const express = require('express');
const instituicaoController = require('../controllers/instituicaoController');

const router = express.Router();

router.get('/', instituicaoController.getAll);
router.get('/:id', instituicaoController.getById);
router.post('/', instituicaoController.create);
router.put('/:id', instituicaoController.update);
router.delete('/:id', instituicaoController.delete);

module.exports = router;
