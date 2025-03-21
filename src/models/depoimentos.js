// src/models/depoimentos.js
module.exports = (sequelize, DataTypes) => {
    const Depoimentos = sequelize.define(
      'Depoimentos',
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        texto: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        foto: {
          type: DataTypes.STRING(255),
          allowNull: true, // URL da foto da pessoa, se aplicável
        },
        cargo: {
          type: DataTypes.STRING(255),
          allowNull: true, // Profissão ou relação com a Mwana
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        tableName: 'depoimentos',
        timestamps: false,
      }
    );
  
    return Depoimentos;
  };
  