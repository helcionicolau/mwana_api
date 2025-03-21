// src/controllers/usersController.js
const { models } = require('../models');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const usersController = {
  // Listar todos os usuários
  getAll: async (req, res) => {
    try {
      const users = await models.User.findAll();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários.', details: error.message });
    }
  },

  // Buscar um usuário por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await models.User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário.', details: error.message });
    }
  },

  // Buscar um usuário por email
  getByEmail: async (req, res) => {
    try {
      const { email } = req.params;

      const user = await models.User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: `Usuário com email ${email} não encontrado.` });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário pelo email.', details: error.message });
    }
  },

  // Criar um novo usuário
  create: async (req, res) => {
    try {
      const { name, email, telefone, senha } = req.body;

      // Verifica se o email já está cadastrado
      const existingUser = await models.User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

      const newUser = await models.User.create({
        name,
        email,
        telefone,
        senha: hashedPassword,
      });

      res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário.', details: error.message });
    }
  },

  // Atualizar um usuário por ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, telefone, senha } = req.body;

      const user = await models.User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      let updatedData = { name, email, telefone };
      
      // Se for fornecida uma nova senha, criptografa antes de atualizar
      if (senha) {
        updatedData.senha = await bcrypt.hash(senha, SALT_ROUNDS);
      }

      await user.update(updatedData);

      res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário.', details: error.message });
    }
  },

  // Deletar um usuário por ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await models.User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      await user.destroy();

      res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário.', details: error.message });
    }
  },
};

module.exports = usersController;
