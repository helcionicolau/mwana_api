const express = require('express');
const clinicaInstituicaoController = require('../controllers/clinicaInstituicaoController');
const { uploadClinicaImagem, handleMulterErrors } = require('../middleware/uploadClinicaImagem');

const router = express.Router();

router.get('/', clinicaInstituicaoController.getAll);
router.get('/:id', clinicaInstituicaoController.getById);
router.post('/', uploadClinicaImagem.single('imagem'), handleMulterErrors, clinicaInstituicaoController.create);
router.put('/:id', uploadClinicaImagem.single('imagem'), handleMulterErrors, clinicaInstituicaoController.update);
router.delete('/:id', clinicaInstituicaoController.delete);

module.exports = router;
