const { models } = require('../models');
const path = require('path');
const fs = require('fs');

const parceirosController = {
  getAll: async (req, res) => {
    try {
      const parceiros = await models.Parceiros.findAll({
        include: { model: models.Instituicao, as: 'instituicao' }
      });
      res.status(200).json(parceiros);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar parceiros.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const parceiro = await models.Parceiros.findByPk(id, {
        include: { model: models.Instituicao, as: 'instituicao' }
      });

      if (!parceiro) {
        return res.status(404).json({ error: 'Parceiro não encontrado.' });
      }

      res.status(200).json(parceiro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar parceiro.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, descricao, instituicao_id } = req.body;
      const logo = req.file ? `/uploads/parceiros/${req.file.filename}` : null;

      if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório.' });
      }

      const novoParceiro = await models.Parceiros.create({
        nome,
        descricao,
        logo,
        instituicao_id
      });

      res.status(201).json(novoParceiro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar parceiro.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, descricao, instituicao_id } = req.body;
      const parceiro = await models.Parceiros.findByPk(id);

      if (!parceiro) {
        return res.status(404).json({ error: 'Parceiro não encontrado.' });
      }

      let logo = parceiro.logo;
      if (req.file) {
        // Deleta o logo antigo antes de atualizar
        if (logo) {
          const oldLogoPath = path.join(__dirname, '../uploads/parceiros', logo);
          if (fs.existsSync(oldLogoPath)) {
            fs.unlinkSync(oldLogoPath);
          }
        }
        logo = req.file.filename;
      }

      await parceiro.update({
        nome,
        descricao,
        instituicao_id,
        logo
      });

      res.status(200).json(parceiro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar parceiro.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const parceiro = await models.Parceiros.findByPk(id);

      if (!parceiro) {
        return res.status(404).json({ error: 'Parceiro não encontrado.' });
      }

      // Remove o arquivo da logo ao excluir o parceiro
      if (parceiro.logo) {
        const logoPath = path.join(__dirname, '../uploads/parceiros', parceiro.logo);
        if (fs.existsSync(logoPath)) {
          fs.unlinkSync(logoPath);
        }
      }

      await parceiro.destroy();
      res.status(200).json({ message: 'Parceiro removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar parceiro.', details: error.message });
    }
  }
};

module.exports = parceirosController;
