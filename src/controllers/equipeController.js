const { models } = require('../models');

const equipeController = {
  getAll: async (req, res) => {
    try {
      const equipe = await models.Equipe.findAll({ include: ['instituicao'] });
      res.status(200).json(equipe);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar equipe.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const membro = await models.Equipe.findByPk(id, { include: ['instituicao'] });

      if (!membro) {
        return res.status(404).json({ error: 'Membro da equipe não encontrado.' });
      }

      res.status(200).json(membro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar membro da equipe.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, cargo, descricao, formacao, linkedin, instituicao_id } = req.body;
      const imagem = req.file ? `/uploads/equipe/${req.file.filename}` : null;

      if (!nome || !cargo) {
        return res.status(400).json({ error: 'Nome e cargo são obrigatórios.' });
      }

      const novoMembro = await models.Equipe.create({
        nome,
        cargo,
        descricao,
        formacao,
        linkedin,
        instituicao_id,
        imagem
      });

      res.status(201).json(novoMembro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar membro da equipe.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, cargo, descricao, formacao, linkedin, instituicao_id } = req.body;
      const imagem = req.file ? `/uploads/equipe/${req.file.filename}` : null;

      const membro = await models.Equipe.findByPk(id);

      if (!membro) {
        return res.status(404).json({ error: 'Membro da equipe não encontrado.' });
      }

      await membro.update({
        nome,
        cargo,
        descricao,
        formacao,
        linkedin,
        instituicao_id,
        imagem: imagem || membro.imagem
      });

      res.status(200).json(membro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar membro da equipe.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const membro = await models.Equipe.findByPk(id);

      if (!membro) {
        return res.status(404).json({ error: 'Membro da equipe não encontrado.' });
      }

      await membro.destroy();
      res.status(200).json({ message: 'Membro da equipe removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar membro da equipe.', details: error.message });
    }
  }
};

module.exports = equipeController;
