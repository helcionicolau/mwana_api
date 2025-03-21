// src/models/publicidade.js
module.exports = (sequelize, DataTypes) => {
    const Publicidade = sequelize.define(
      'Publicidade',
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
        imagem: {
          type: DataTypes.STRING(255),
          allowNull: false,
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
        tableName: 'publicidades',
        timestamps: false,
      }
    );
  
    Publicidade.associate = (models) => {
      // Definir associações futuras aqui, se necessário
    };
  
    return Publicidade;
  };
  