const { models } = require('../models');

const cadastroController = {
  // 📌 Listar todos os cadastros
  getAll: async (req, res) => {
    try {
      const cadastros = await models.Cadastro.findAll();
      res.status(200).json(cadastros);
    } catch (error) {
      console.error("❌ Erro ao buscar cadastros:", error);
      res.status(500).json({ error: 'Erro ao buscar cadastros.', details: error.message });
    }
  },

  // 📌 Buscar um cadastro por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const cadastro = await models.Cadastro.findByPk(id);

      if (!cadastro) {
        return res.status(404).json({ error: 'Cadastro não encontrado.' });
      }

      res.status(200).json(cadastro);
    } catch (error) {
      console.error("❌ Erro ao buscar cadastro:", error);
      res.status(500).json({ error: 'Erro ao buscar cadastro.', details: error.message });
    }
  },

  // 📌 Criar um novo cadastro
  create: async (req, res) => {
    try {
      const { nome, email, telefone, mae, pai, morada, sexo, idade, inserido_escola, acompanhamento_medico } = req.body;

      if (!nome || !email || !sexo) {
        return res.status(400).json({ error: 'Nome, email e sexo são obrigatórios.' });
      }

      const novoCadastro = await models.Cadastro.create({
        nome,
        email,
        telefone,
        mae,
        pai,
        morada,
        sexo,
        idade,
        inserido_escola,
        acompanhamento_medico
      });

      console.log("✅ Cadastro criado:", novoCadastro);
      res.status(201).json(novoCadastro);
    } catch (error) {
      console.error("❌ Erro ao criar cadastro:", error);
      res.status(500).json({ error: 'Erro ao criar cadastro.', details: error.message });
    }
  },

  // 📌 Atualizar um cadastro existente
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, telefone, mae, pai, morada, sexo, idade, inserido_escola, acompanhamento_medico } = req.body;

      const cadastro = await models.Cadastro.findByPk(id);

      if (!cadastro) {
        return res.status(404).json({ error: 'Cadastro não encontrado.' });
      }

      await cadastro.update({
        nome,
        email,
        telefone,
        mae,
        pai,
        morada,
        sexo,
        idade,
        inserido_escola,
        acompanhamento_medico
      });

      console.log("✅ Cadastro atualizado:", cadastro);
      res.status(200).json(cadastro);
    } catch (error) {
      console.error("❌ Erro ao atualizar cadastro:", error);
      res.status(500).json({ error: 'Erro ao atualizar cadastro.', details: error.message });
    }
  },

  // 📌 Deletar um cadastro
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const cadastro = await models.Cadastro.findByPk(id);

      if (!cadastro) {
        return res.status(404).json({ error: 'Cadastro não encontrado.' });
      }

      await cadastro.destroy();

      console.log("🗑️ Cadastro removido:", id);
      res.status(200).json({ message: 'Cadastro removido com sucesso.' });
    } catch (error) {
      console.error("❌ Erro ao deletar cadastro:", error);
      res.status(500).json({ error: 'Erro ao deletar cadastro.', details: error.message });
    }
  }
};

module.exports = cadastroController;
