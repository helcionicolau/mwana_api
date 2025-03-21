const express = require('express');
const missaoVisaoValoresController = require('../controllers/missaoVisaoValoresController');

const router = express.Router();

router.get('/', missaoVisaoValoresController.getAll);
router.get('/:id', missaoVisaoValoresController.getById);
router.post('/', missaoVisaoValoresController.create);
router.put('/:id', missaoVisaoValoresController.update);
router.delete('/:id', missaoVisaoValoresController.delete);

module.exports = router;
