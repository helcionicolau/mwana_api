// src/models/equipe.js
module.exports = (sequelize, DataTypes) => {
    const Equipe = sequelize.define(
      'Equipe',
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
        cargo: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        descricao: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        formacao: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        linkedin: {
          type: DataTypes.STRING(255),
          allowNull: true,
          validate: { isUrl: { msg: 'Insira um URL válido para o LinkedIn.' } },
        },
        instituicao_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        imagem: {
          type: DataTypes.STRING(255),
          allowNull: true, // URL da foto da pessoa, se aplicável
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
        tableName: 'equipe',
        timestamps: false,
      }
    );
  
    Equipe.associate = (models) => {
      Equipe.belongsTo(models.Instituicao, {
        foreignKey: 'instituicao_id',
        as: 'instituicao',
        onDelete: 'CASCADE',
      });
    };
  
    return Equipe;
  };
  