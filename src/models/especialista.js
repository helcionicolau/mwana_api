// src/models/especialista.js
module.exports = (sequelize, DataTypes) => {
    const Especialista = sequelize.define(
      'Especialista',
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
        especialidade: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        imagem: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        contato: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        redes_sociais: {
          type: DataTypes.JSON,
          allowNull: true,
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
        tableName: 'especialistas',
        timestamps: false,
      }
    );
  
    Especialista.associate = (models) => {
      // Definir associações futuras aqui, se necessário
    };
  
    return Especialista;
  };
  