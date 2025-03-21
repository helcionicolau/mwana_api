const { models } = require('../models');

const especialistaController = {
  getAll: async (req, res) => {
    try {
      const especialistas = await models.Especialista.findAll();
      res.status(200).json(especialistas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar especialistas.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const especialista = await models.Especialista.findByPk(id);

      if (!especialista) {
        return res.status(404).json({ error: 'Especialista não encontrado.' });
      }

      res.status(200).json(especialista);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar especialista.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, especialidade, contato, redes_sociais } = req.body;
      const imagem = req.file ? `/uploads/especialistas/${req.file.filename}` : null;

      if (!nome || !especialidade || !imagem) {
        return res.status(400).json({ error: 'Nome, especialidade e imagem são obrigatórios.' });
      }

      const novoEspecialista = await models.Especialista.create({
        nome,
        especialidade,
        imagem,
        contato,
        redes_sociais: redes_sociais ? JSON.parse(redes_sociais) : null,
      });

      res.status(201).json(novoEspecialista);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar especialista.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, especialidade, contato, redes_sociais } = req.body;
      const imagem = req.file ? `/uploads/especialistas/${req.file.filename}` : null;

      const especialista = await models.Especialista.findByPk(id);

      if (!especialista) {
        return res.status(404).json({ error: 'Especialista não encontrado.' });
      }

      await especialista.update({
        nome,
        especialidade,
        imagem: imagem || especialista.imagem,
        contato,
        redes_sociais: redes_sociais ? JSON.parse(redes_sociais) : especialista.redes_sociais,
      });

      res.status(200).json(especialista);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar especialista.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const especialista = await models.Especialista.findByPk(id);

      if (!especialista) {
        return res.status(404).json({ error: 'Especialista não encontrado.' });
      }

      await especialista.destroy();
      res.status(200).json({ message: 'Especialista removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar especialista.', details: error.message });
    }
  }
};

module.exports = especialistaController;
