const { models } = require('../models');
const path = require('path');
const fs = require('fs');

const videosController = {
  getAll: async (req, res) => {
    try {
      const videos = await models.Videos.findAll();
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar vídeos.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await models.Videos.findByPk(id);

      if (!video) {
        return res.status(404).json({ error: 'Vídeo não encontrado.' });
      }

      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar vídeo.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'O upload do vídeo é obrigatório.' });
      }

      const { titulo } = req.body;
      if (!titulo) {
        return res.status(400).json({ error: 'O campo título é obrigatório.' });
      }

      const videoPath = `/uploads/videos/${req.file.filename}`;
      const novoVideo = await models.Videos.create({ titulo, video_path: videoPath });

      res.status(201).json(novoVideo);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar vídeo.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo } = req.body;

      const video = await models.Videos.findByPk(id);
      if (!video) {
        return res.status(404).json({ error: 'Vídeo não encontrado.' });
      }

      let videoPath = video.video_path;

      // Se um novo arquivo foi enviado, remove o antigo e atualiza o caminho
      if (req.file) {
        const oldVideoPath = path.join(__dirname, `../${video.video_path}`);
        if (fs.existsSync(oldVideoPath)) {
          fs.unlinkSync(oldVideoPath);
        }
        videoPath = `/uploads/videos/${req.file.filename}`;
      }

      await video.update({ titulo, video_path: videoPath });

      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar vídeo.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await models.Videos.findByPk(id);

      if (!video) {
        return res.status(404).json({ error: 'Vídeo não encontrado.' });
      }

      // Remove o arquivo físico do servidor
      const videoPath = path.join(__dirname, `../${video.video_path}`);
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }

      await video.destroy();
      res.status(200).json({ message: 'Vídeo removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar vídeo.', details: error.message });
    }
  }
};

module.exports = videosController;
