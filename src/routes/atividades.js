const express = require('express');
const atividadesController = require('../controllers/atividadesController');
const { uploadAtividadeVideo, handleMulterErrors } = require('../middleware/uploadAtividadeVideo');

const router = express.Router();

// Listar todas as atividades
router.get('/', atividadesController.getAll);

// Buscar uma atividade por ID
router.get('/:id', atividadesController.getById);

// Criar uma atividade com upload de vídeo
router.post(
  '/',
  uploadAtividadeVideo.single('video'), // Middleware de upload antes do controller
  handleMulterErrors, // Tratamento de erros do multer
  atividadesController.createWithVideo
);

// Atualizar uma atividade e o vídeo
router.put(
  '/:id',
  uploadAtividadeVideo.single('video'), // Middleware de upload antes do controller
  handleMulterErrors,
  atividadesController.updateWithVideo
);

// Deletar uma atividade
router.delete('/:id', atividadesController.delete);

module.exports = router;
