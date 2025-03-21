const { models } = require('../models');

const contactoController = {
  getAll: async (req, res) => {
    try {
      const contactos = await models.Contacto.findAll();
      res.status(200).json(contactos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar contactos.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const contacto = await models.Contacto.findByPk(id);

      if (!contacto) {
        return res.status(404).json({ error: 'Contacto não encontrado.' });
      }

      res.status(200).json(contacto);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar contacto.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, email, telefone, assunto, mensagem } = req.body;

      if (!nome || !email || !mensagem) {
        return res.status(400).json({ error: 'Nome, email e mensagem são obrigatórios.' });
      }

      const novoContacto = await models.Contacto.create({
        nome,
        email,
        telefone,
        assunto,
        mensagem
      });

      res.status(201).json(novoContacto);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar contacto.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, telefone, assunto, mensagem } = req.body;

      const contacto = await models.Contacto.findByPk(id);

      if (!contacto) {
        return res.status(404).json({ error: 'Contacto não encontrado.' });
      }

      await contacto.update({
        nome,
        email,
        telefone,
        assunto,
        mensagem
      });

      res.status(200).json(contacto);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar contacto.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const contacto = await models.Contacto.findByPk(id);

      if (!contacto) {
        return res.status(404).json({ error: 'Contacto não encontrado.' });
      }

      await contacto.destroy();

      res.status(200).json({ message: 'Contacto removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar contacto.', details: error.message });
    }
  }
};

module.exports = contactoController;
