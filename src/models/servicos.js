// src/models/servicos.js
module.exports = (sequelize, DataTypes) => {
    const Servicos = sequelize.define(
      'Servicos',
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        titulo: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        descricao: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        icone: {
          type: DataTypes.STRING(255),
          allowNull: true, // Pode ser uma URL ou nome do ícone usado
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
        tableName: 'servicos',
        timestamps: false,
      }
    );
  
    return Servicos;
  };
  