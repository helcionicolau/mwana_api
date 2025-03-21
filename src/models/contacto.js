// src/models/contacto.js
module.exports = (sequelize, DataTypes) => {
    const Contacto = sequelize.define(
      'Contacto',
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
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: { isEmail: { msg: 'Insira um email válido.' } },
        },
        telefone: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        assunto: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        mensagem: {
          type: DataTypes.TEXT,
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
        tableName: 'contactos',
        timestamps: false,
      }
    );
  
    Contacto.associate = (models) => {
      // Definir associações futuras aqui, se necessário
    };
  
    return Contacto;
  };
  