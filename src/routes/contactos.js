const express = require('express');
const contactoController = require('../controllers/contactoController');

const router = express.Router();

router.get('/', contactoController.getAll);
router.get('/:id', contactoController.getById);
router.post('/', contactoController.create);
router.put('/:id', contactoController.update);
router.delete('/:id', contactoController.delete);

module.exports = router;
