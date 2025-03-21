// src/routes/cadastros.js
const express = require('express');
const cadastroController = require('../controllers/cadastroController');

const router = express.Router();

// Listar todos os cadastros
router.get('/', cadastroController.getAll);

// Buscar um cadastro por ID
router.get('/:id', cadastroController.getById);

// Criar um novo cadastro
router.post('/', cadastroController.create);

// Atualizar um cadastro existente
router.put('/:id', cadastroController.update);

// Deletar um cadastro
router.delete('/:id', cadastroController.delete);

module.exports = router;
