// src/models/clinicaInstituicao.js
module.exports = (sequelize, DataTypes) => {
    const ClinicaInstituicao = sequelize.define(
      'ClinicaInstituicao',
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
        descricao: {
          type: DataTypes.TEXT,
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
        endereco: {
          type: DataTypes.STRING(255),
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
        tableName: 'clinicas_instituicoes',
        timestamps: false,
      }
    );
  
    ClinicaInstituicao.associate = (models) => {
      // Definir associações futuras aqui, se necessário
    };
  
    return ClinicaInstituicao;
  };
  