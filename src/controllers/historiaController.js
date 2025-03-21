const { models } = require('../models');

const historiaController = {
  getAll: async (req, res) => {
    try {
      const historias = await models.Historia.findAll({
        include: [{ model: models.Instituicao, as: 'instituicao' }]
      });
      res.status(200).json(historias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar histórias.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const historia = await models.Historia.findByPk(id, {
        include: [{ model: models.Instituicao, as: 'instituicao' }]
      });

      if (!historia) {
        return res.status(404).json({ error: 'História não encontrada.' });
      }

      res.status(200).json(historia);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar história.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { titulo, descricao, instituicao_id } = req.body;

      if (!titulo || !descricao) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
      }

      const novaHistoria = await models.Historia.create({
        titulo,
        descricao,
        instituicao_id: instituicao_id || null
      });

      res.status(201).json(novaHistoria);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar história.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao, instituicao_id } = req.body;

      const historia = await models.Historia.findByPk(id);

      if (!historia) {
        return res.status(404).json({ error: 'História não encontrada.' });
      }

      await historia.update({
        titulo,
        descricao,
        instituicao_id: instituicao_id || historia.instituicao_id
      });

      res.status(200).json(historia);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar história.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const historia = await models.Historia.findByPk(id);

      if (!historia) {
        return res.status(404).json({ error: 'História não encontrada.' });
      }

      await historia.destroy();
      res.status(200).json({ message: 'História removida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar história.', details: error.message });
    }
  }
};

module.exports = historiaController;
