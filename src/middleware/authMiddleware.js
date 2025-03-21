// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { models } = require('../models');
const jwtConfig = require('../config/jwtConfig');

const authMiddleware = {
  authenticate: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
      }

      // Verifica e decodifica o token
      jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }

        // Adiciona os dados do token ao request
        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro na autenticação.', details: error.message });
    }
  },
};

module.exports = authMiddleware;
