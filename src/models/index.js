// src/models/index.js - Configuração do Sequelize
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Configurações do banco de dados
const sequelize = new Sequelize('api_mwana_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// const sequelize = new Sequelize('securegestdb_v2', '331882_sec', 'kjdhi%%##$', {
//   host: 'mysql-securegestdb.alwaysdata.net',
//   dialect: 'mysql',
//   logging: false,
// });

// Carrega os modelos dinamicamente
const models = {};
const modelsPath = path.join(__dirname);

fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith('.js') && file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  });

// Configura associações, se necessário
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, models };
