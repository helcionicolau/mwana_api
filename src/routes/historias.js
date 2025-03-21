const express = require('express');
const historiaController = require('../controllers/historiaController');

const router = express.Router();

router.get('/', historiaController.getAll);
router.get('/:id', historiaController.getById);
router.post('/', historiaController.create);
router.put('/:id', historiaController.update);
router.delete('/:id', historiaController.delete);

module.exports = router;
