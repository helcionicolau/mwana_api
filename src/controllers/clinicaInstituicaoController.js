const { models } = require('../models');

const clinicaInstituicaoController = {
  getAll: async (req, res) => {
    try {
      const clinicas = await models.ClinicaInstituicao.findAll();
      res.status(200).json(clinicas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar clínicas.', details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const clinica = await models.ClinicaInstituicao.findByPk(id);

      if (!clinica) {
        return res.status(404).json({ error: 'Clínica não encontrada.' });
      }

      res.status(200).json(clinica);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar clínica.', details: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, descricao, contato, endereco } = req.body;
      const imagem = req.file ? `/uploads/clinicas_instituicoes/${req.file.filename}` : null;

      if (!nome || !descricao || !imagem) {
        return res.status(400).json({ error: 'Nome, descrição e imagem são obrigatórios.' });
      }

      const novaClinica = await models.ClinicaInstituicao.create({
        nome,
        descricao,
        imagem,
        contato,
        endereco
      });

      res.status(201).json(novaClinica);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar clínica.', details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, descricao, contato, endereco } = req.body;
      const imagem = req.file ? `/uploads/clinicas_instituicoes/${req.file.filename}` : null;

      const clinica = await models.ClinicaInstituicao.findByPk(id);

      if (!clinica) {
        return res.status(404).json({ error: 'Clínica não encontrada.' });
      }

      await clinica.update({
        nome,
        descricao,
        imagem: imagem || clinica.imagem,
        contato,
        endereco
      });

      res.status(200).json(clinica);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar clínica.', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const clinica = await models.ClinicaInstituicao.findByPk(id);

      if (!clinica) {
        return res.status(404).json({ error: 'Clínica não encontrada.' });
      }

      await clinica.destroy();
      res.status(200).json({ message: 'Clínica removida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar clínica.', details: error.message });
    }
  }
};

module.exports = clinicaInstituicaoController;
