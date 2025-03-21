// src/models/cadastro.js
module.exports = (sequelize, DataTypes) => {
    const Cadastro = sequelize.define(
      'Cadastro',
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
          unique: { msg: 'O email deve ser único.' },
          validate: { isEmail: { msg: 'Insira um email válido.' } },
        },
        telefone: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        mae: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pai: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        morada: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        sexo: {
          type: DataTypes.ENUM('M', 'F', 'O'),
          allowNull: false,
        },
        idade: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        inserido_escola: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        acompanhamento_medico: {
          type: DataTypes.TEXT,
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
        tableName: 'cadastros',
        timestamps: false,
      }
    );
  
    Cadastro.associate = (models) => {
      // Definir associações futuras aqui, se necessário
    };
  
    return Cadastro;
  };
  