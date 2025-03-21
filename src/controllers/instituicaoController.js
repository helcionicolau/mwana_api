const { models } = require('../models');

const instituicaoController = {
  getAll: async (req, res) => {
    try {
      const instituicoes = await models.Instituicao.findAll({
        include: [
          { model: models.Historia, as: 'historias' },
          { model: models.MissaoVisaoValores, as: 'missaoVisaoValores' },
          { model: models.Equipe, as: 'equipe' },
          { model: models.Parceiros, as: 'parceiros' }
        ]
      });
      res.status(200).json(instituicoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar instituições.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const instituicao = await models.Instituicao.findByPk(id, {
        include: [
          { model: models.Historia, as: 'historias' },
          { model: models.MissaoVisaoValores, as: 'missaoVisaoValores' },
          { model: models.Equipe, as: 'equipe' },
          { model: models.Parceiros, as: 'parceiros' }
        ]
      });

      if (!instituicao) {
        return res.status(404).json({ error: 'Instituição não encontrada.' });
      }

      res.status(200).json(instituicao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar instituição.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, descricao, email, telefone, endereco, horario_funcionamento } = req.body;

      if (!nome || !descricao) {
        return res.status(400).json({ error: 'Nome e descrição são obrigatórios.' });
      }

      const novaInstituicao = await models.Instituicao.create({
        nome,
        descricao,
        email,
        telefone,
        endereco,
        horario_funcionamento
      });

      res.status(201).json(novaInstituicao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar instituição.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, descricao, email, telefone, endereco, horario_funcionamento } = req.body;

      const instituicao = await models.Instituicao.findByPk(id);

      if (!instituicao) {
        return res.status(404).json({ error: 'Instituição não encontrada.' });
      }

      await instituicao.update({
        nome,
        descricao,
        email,
        telefone,
        endereco,
        horario_funcionamento
      });

      res.status(200).json(instituicao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar instituição.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const instituicao = await models.Instituicao.findByPk(id);

      if (!instituicao) {
        return res.status(404).json({ error: 'Instituição não encontrada.' });
      }

      await instituicao.destroy();
      res.status(200).json({ message: 'Instituição removida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar instituição.', details: error.message });
    }
  }
};

module.exports = instituicaoController;
