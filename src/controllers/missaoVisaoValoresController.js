const { models } = require('../models');

const missaoVisaoValoresController = {
  getAll: async (req, res) => {
    try {
      const registros = await models.MissaoVisaoValores.findAll({
        include: { model: models.Instituicao, as: 'instituicao' }
      });
      res.status(200).json(registros);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar registros.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const registro = await models.MissaoVisaoValores.findByPk(id, {
        include: { model: models.Instituicao, as: 'instituicao' }
      });

      if (!registro) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }

      res.status(200).json(registro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar registro.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { tipo, descricao, instituicao_id } = req.body;

      if (!tipo || !descricao) {
        return res.status(400).json({ error: 'Tipo e descrição são obrigatórios.' });
      }

      if (!['missao', 'visao', 'valores', 'objectivos'].includes(tipo)) {
        return res.status(400).json({ error: 'Tipo inválido. Use "missao", "visao" ou "valores".' });
      }

      const novoRegistro = await models.MissaoVisaoValores.create({
        tipo,
        descricao,
        instituicao_id
      });

      res.status(201).json(novoRegistro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar registro.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { tipo, descricao, instituicao_id } = req.body;

      const registro = await models.MissaoVisaoValores.findByPk(id);

      if (!registro) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }

      await registro.update({
        tipo,
        descricao,
        instituicao_id
      });

      res.status(200).json(registro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar registro.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const registro = await models.MissaoVisaoValores.findByPk(id);

      if (!registro) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }

      await registro.destroy();
      res.status(200).json({ message: 'Registro removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar registro.', details: error.message });
    }
  }
};

module.exports = missaoVisaoValoresController;
