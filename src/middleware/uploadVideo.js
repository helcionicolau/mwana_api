const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Diretório de upload para vídeos
const uploadDir = path.join(__dirname, '../uploads/videos');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const id = req.params.id || 'new';
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${id}_${timestamp}${ext}`);
  },
});

// Filtro para validar o tipo de arquivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/mkv', 'video/avi'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo inválido. Apenas MP4, MKV e AVI são aceitos.'));
  }
};

// Configuração do Multer
const uploadVideo = multer({
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

module.exports = { uploadVideo, handleMulterErrors };
