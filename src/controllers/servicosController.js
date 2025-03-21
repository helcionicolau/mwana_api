const { models } = require('../models');

const servicosController = {
  getAll: async (req, res) => {
    try {
      const servicos = await models.Servicos.findAll();
      res.status(200).json(servicos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar serviços.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const servico = await models.Servicos.findByPk(id);

      if (!servico) {
        return res.status(404).json({ error: 'Serviço não encontrado.' });
      }

      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar serviço.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { titulo, descricao, icone } = req.body;

      if (!titulo || !descricao) {
        return res.status(400).json({ error: 'Os campos título e descrição são obrigatórios.' });
      }

      const novoServico = await models.Servicos.create({ titulo, descricao, icone });

      res.status(201).json(novoServico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar serviço.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao, icone } = req.body;

      const servico = await models.Servicos.findByPk(id);
      if (!servico) {
        return res.status(404).json({ error: 'Serviço não encontrado.' });
      }

      await servico.update({ titulo, descricao, icone });

      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar serviço.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const servico = await models.Servicos.findByPk(id);

      if (!servico) {
        return res.status(404).json({ error: 'Serviço não encontrado.' });
      }

      await servico.destroy();
      res.status(200).json({ message: 'Serviço removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar serviço.', details: error.message });
    }
  }
};

module.exports = servicosController;
