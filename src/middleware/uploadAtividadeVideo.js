// src/middleware/uploadAtividadeVideo.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Diretório de upload para vídeos das atividades
const uploadDir = path.join(__dirname, '../uploads/atividades/videos');

// Criar o diretório caso não exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const id = req.params.id || 'new'; // Se não houver ID, assume 'new'
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${id}_${timestamp}${ext}`);
  },
});

// Filtro para validação de tipo de arquivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/mkv', 'video/webm'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo inválido. Apenas MP4, MKV e WEBM são aceitos.'));
  }
};

// Configuração do Multer
const uploadAtividadeVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limite de 100MB
  fileFilter,
});

// Middleware para tratamento de erros do Multer
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'O vídeo excede o tamanho máximo permitido de 100MB.' });
    }
    return res.status(400).json({ error: 'Erro ao processar o upload.', details: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = { uploadAtividadeVideo, handleMulterErrors };
