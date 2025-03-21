// src/routes/users.js
const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Rotas CRUD para Usuários
router.get(
  '/',
  usersController.getAll
); // Listar todos os usuários

router.get(
  '/:id',
  usersController.getById
); // Buscar um usuário por ID

router.get(
  '/by-email/:email',
  usersController.getByEmail
); // Buscar um usuário por Email

router.post(
  '/',
  usersController.create
); // Criar um novo usuário

router.put(
  '/:id',
  usersController.update
); // Atualizar um usuário existente

router.delete(
  '/:id',
  usersController.delete
); // Deletar um usuário

module.exports = router;
