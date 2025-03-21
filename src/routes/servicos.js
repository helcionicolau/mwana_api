const express = require('express');
const servicosController = require('../controllers/servicosController');

const router = express.Router();

router.get('/', servicosController.getAll);
router.get('/:id', servicosController.getById);
router.post('/', servicosController.create);
router.put('/:id', servicosController.update);
router.delete('/:id', servicosController.delete);

module.exports = router;
