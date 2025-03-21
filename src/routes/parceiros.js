const express = require('express');
const parceirosController = require('../controllers/parceirosController');
const { uploadParceiroLogo, handleMulterErrors } = require('../middleware/uploadParceiroLogo');

const router = express.Router();

router.get('/', parceirosController.getAll);
router.get('/:id', parceirosController.getById);
router.post('/', uploadParceiroLogo.single('logo'), handleMulterErrors, parceirosController.create);
router.put('/:id', uploadParceiroLogo.single('logo'), handleMulterErrors, parceirosController.update);
router.delete('/:id', parceirosController.delete);

module.exports = router;
