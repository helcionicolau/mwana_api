require("dotenv").config();

module.exports = {
    secret: process.env.JWT_SECRET, // Coloque isso no .env em produção
    expiresIn: '1h', // Token válido por 1 hora
};
