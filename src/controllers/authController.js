// src/controllers/authController.js
const { models } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwtConfig');

const authController = {

  // 🔹 Login do user
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Verifica se o user existe
      const user = await models.User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Verifica a senha
      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // Gera o token JWT
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          telefone: user.telefone,
        },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      res.status(200).json({
        token,
        user,
      });

    } catch (error) {
      res.status(500).json({ error: 'Erro ao fazer login.', details: error.message });
    }
  },

  // 🔹 Logout do user
  logout: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(400).json({ error: 'Token não fornecido.' });
      }
      // Decodificar o token para obter informações
      const decoded = jwt.verify(token, jwtConfig.secret, { ignoreExpiration: false });
      res.status(200).json({ message: 'Logout realizado com sucesso.' });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ error: 'Token já expirado.' });
      }
      res.status(500).json({ error: 'Erro ao fazer logout.', details: error.message });
    }
  },

  // 🔹 Solicitar redefinição de senha
  requestReset: async (req, res) => {
    try {
      const { email } = req.body;

      // Verifica se o user existe
      const user = await models.User.findOne({
        where: { email }
      });

      if (!user) {
        return res.status(404).json({ error: 'E-mail não encontrado.' });
      }

      // Gerar um token seguro
      const token = crypto.randomBytes(32).toString("hex");

      // Definir tempo de expiração (15 minutos)
      const expires_at = new Date();
      expires_at.setMinutes(expires_at.getMinutes() + 15);

      // Salvar o token no banco de dados
      await models.ResetToken.create({
        user_id: user.id,
        token,
        expires_at,
      });

      // Enviar e-mail com o link de reset
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetLink = `${process.env.FRONTEND_URL}auth/reset-password/${token}`;

      await transporter.sendMail({
        from: `"SecureGest" <no-reply@securegest.com>`,
        to: email,
        subject: "Redefinição de Senha",
        text: `Clique no link para redefinir sua senha: ${resetLink}`,
        html: `<p>Clique no link abaixo para redefinir sua senha:</p><a href="${resetLink}">${resetLink}</a>`,
      });

      res.status(200).json({ message: "E-mail de redefinição enviado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao solicitar redefinição de senha.", details: error.message });
    }
  },

  // 🔹 Validar Token
  validateResetToken: async (req, res) => {
    try {
      const { token } = req.params;

      const resetToken = await models.ResetToken.findOne({
        where: {
          token,
          expires_at: { [Op.gt]: new Date() }, // Verifica se não expirou
          usado: false,
        },
      });

      if (!resetToken) {
        return res.status(400).json({ error: "Token inválido ou expirado." });
      }

      res.status(200).json({ message: "Token válido." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao validar token.", details: error.message });
    }
  },

  // 🔹 Redefinir Senha
  resetPassword: async (req, res) => {
    try {
      const { token, novaSenha } = req.body;

      const resetToken = await models.ResetToken.findOne({
        where: {
          token,
          expires_at: { [Op.gt]: new Date() }, // Token ainda válido?
          usado: false,
        },
      });

      if (!resetToken) {
        return res.status(400).json({ error: "Token inválido ou expirado." });
      }

      const user = await models.User.findByPk(resetToken.user_id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Criptografar a nova senha
      const hashedSenha = await bcrypt.hash(novaSenha, 10);
      await user.update({ senha: hashedSenha });

      // Marcar token como usado
      await resetToken.update({ usado: true });

      res.status(200).json({ message: "Senha redefinida com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao redefinir senha.", details: error.message });
    }
  }

};

module.exports = authController;
