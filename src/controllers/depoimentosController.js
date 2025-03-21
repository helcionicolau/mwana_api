const { models } = require('../models');

const depoimentosController = {
  getAll: async (req, res) => {
    try {
      const depoimentos = await models.Depoimentos.findAll();
      res.status(200).json(depoimentos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar depoimentos.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const depoimento = await models.Depoimentos.findByPk(id);

      if (!depoimento) {
        return res.status(404).json({ error: 'Depoimento não encontrado.' });
      }

      res.status(200).json(depoimento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar depoimento.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, texto, cargo } = req.body;
      const foto = req.file ? `/uploads/depoimentos/${req.file.filename}` : null;

      if (!nome || !texto) {
        return res.status(400).json({ error: 'Nome e texto são obrigatórios.' });
      }

      const novoDepoimento = await models.Depoimentos.create({
        nome,
        texto,
        foto,
        cargo
      });

      res.status(201).json(novoDepoimento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar depoimento.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, texto, cargo } = req.body;
      const foto = req.file ? `/uploads/depoimentos/${req.file.filename}` : null;

      const depoimento = await models.Depoimentos.findByPk(id);

      if (!depoimento) {
        return res.status(404).json({ error: 'Depoimento não encontrado.' });
      }

      await depoimento.update({
        nome,
        texto,
        foto: foto || depoimento.foto,
        cargo
      });

      res.status(200).json(depoimento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar depoimento.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const depoimento = await models.Depoimentos.findByPk(id);

      if (!depoimento) {
        return res.status(404).json({ error: 'Depoimento não encontrado.' });
      }

      await depoimento.destroy();
      res.status(200).json({ message: 'Depoimento removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar depoimento.', details: error.message });
    }
  }
};

module.exports = depoimentosController;
