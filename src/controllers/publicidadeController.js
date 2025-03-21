const { models } = require('../models');
const path = require('path');
const fs = require('fs');

const publicidadeController = {
  getAll: async (req, res) => {
    try {
      const publicidades = await models.Publicidade.findAll();
      res.status(200).json(publicidades);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar publicidades.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const publicidade = await models.Publicidade.findByPk(id);

      if (!publicidade) {
        return res.status(404).json({ error: 'Publicidade não encontrada.' });
      }

      res.status(200).json(publicidade);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar publicidade.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { titulo, descricao } = req.body;
      const imagem = req.file ? `/uploads/publicidades/${req.file.filename}` : null;

      if (!titulo || !descricao || !imagem) {
        return res.status(400).json({ error: 'Os campos título, descrição e imagem são obrigatórios.' });
      }

      const novaPublicidade = await models.Publicidade.create({
        titulo,
        descricao,
        imagem
      });

      res.status(201).json(novaPublicidade);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar publicidade.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao } = req.body;
      const publicidade = await models.Publicidade.findByPk(id);

      if (!publicidade) {
        return res.status(404).json({ error: 'Publicidade não encontrada.' });
      }

      let imagem = publicidade.imagem;
      if (req.file) {
        // Deleta a imagem antiga antes de atualizar
        if (imagem) {
          const oldImagePath = path.join(__dirname, '../uploads/publicidades', imagem);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        imagem = req.file.filename;
      }

      await publicidade.update({
        titulo,
        descricao,
        imagem
      });

      res.status(200).json(publicidade);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar publicidade.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const publicidade = await models.Publicidade.findByPk(id);

      if (!publicidade) {
        return res.status(404).json({ error: 'Publicidade não encontrada.' });
      }

      // Remove o arquivo da imagem ao excluir a publicidade
      if (publicidade.imagem) {
        const imagemPath = path.join(__dirname, '../uploads/publicidades', publicidade.imagem);
        if (fs.existsSync(imagemPath)) {
          fs.unlinkSync(imagemPath);
        }
      }

      await publicidade.destroy();
      res.status(200).json({ message: 'Publicidade removida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar publicidade.', details: error.message });
    }
  }
};

module.exports = publicidadeController;
