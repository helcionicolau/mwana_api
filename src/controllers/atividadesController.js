const { models } = require('../models');
const path = require('path');
const fs = require('fs');

const atividadesController = {
  // Listar todas as atividades
  getAll: async (req, res) => {
    try {
      const atividades = await models.Atividades.findAll();
      res.status(200).json(atividades);
    } catch (error) {
      console.error("❌ Erro ao buscar atividades:", error);
      res.status(500).json({ error: 'Erro ao buscar atividades.', details: error.message });
    }
  },

  // Buscar uma atividade por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const atividade = await models.Atividades.findByPk(id);

      if (!atividade) {
        return res.status(404).json({ error: 'Atividade não encontrada.' });
      }

      res.status(200).json(atividade);
    } catch (error) {
      console.error("❌ Erro ao buscar atividade:", error);
      res.status(500).json({ error: 'Erro ao buscar atividade.', details: error.message });
    }
  },

  // Criar uma nova atividade com upload de vídeo
  createWithVideo: async (req, res) => {
    try {
      const { titulo, descricao } = req.body;

      console.log("📌 Dados recebidos:", req.body);
      console.log("📂 Arquivo recebido:", req.file);

      if (!titulo || !descricao) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
      }

      const videoPath = `uploads/atividades/videos/${req.file.filename}`;

      console.log("📁 Caminho do vídeo salvo:", videoPath);

      const novaAtividade = await models.Atividades.create({
        titulo,
        descricao,
        video_path: videoPath,
      });

      console.log("✅ Atividade criada:", novaAtividade);

      res.status(201).json(novaAtividade);
    } catch (error) {
      console.error("❌ Erro ao criar atividade:", error);
      res.status(500).json({ error: 'Erro ao criar atividade.', details: error.message });
    }
  },

  // Atualizar uma atividade existente
  updateWithVideo: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao } = req.body;
      const atividade = await models.Atividades.findByPk(id);

      if (!atividade) {
        return res.status(404).json({ error: 'Atividade não encontrada.' });
      }

      let videoPath = atividade.video_path;

      if (req.file) {
        console.log("📂 Novo arquivo recebido:", req.file.filename);

        if (atividade.video_path) {
          const oldVideoPath = path.join(__dirname, '..', atividade.video_path);
          if (fs.existsSync(oldVideoPath)) {
            fs.unlinkSync(oldVideoPath);
          }
        }
        videoPath = `uploads/atividades/videos/${req.file.filename}`;
      }

      await atividade.update({ titulo, descricao, video_path: videoPath });

      console.log("✅ Atividade atualizada:", atividade);
      res.status(200).json(atividade);
    } catch (error) {
      console.error("❌ Erro ao atualizar atividade:", error);
      res.status(500).json({ error: 'Erro ao atualizar atividade.', details: error.message });
    }
  },

  // Deletar uma atividade
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const atividade = await models.Atividades.findByPk(id);

      if (!atividade) {
        return res.status(404).json({ error: 'Atividade não encontrada.' });
      }

      if (atividade.video_path) {
        const videoFilePath = path.join(__dirname, '..', atividade.video_path);
        if (fs.existsSync(videoFilePath)) {
          fs.unlinkSync(videoFilePath);
        }
      }

      await atividade.destroy();

      console.log("🗑️ Atividade removida:", id);
      res.status(200).json({ message: 'Atividade removida com sucesso.' });
    } catch (error) {
      console.error("❌ Erro ao deletar atividade:", error);
      res.status(500).json({ error: 'Erro ao deletar atividade.', details: error.message });
    }
  },
};

module.exports = atividadesController;