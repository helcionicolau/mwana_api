// src/models/parceiros.js
module.exports = (sequelize, DataTypes) => {
    const Parceiros = sequelize.define(
      'Parceiros',
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
          allowNull: true,
        },
        logo: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        instituicao_id: {
          type: DataTypes.BIGINT,
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
        tableName: 'parceiros',
        timestamps: false,
      }
    );
  
    Parceiros.associate = (models) => {
      Parceiros.belongsTo(models.Instituicao, {
        foreignKey: 'instituicao_id',
        as: 'instituicao',
        onDelete: 'CASCADE',
      });
    };
  
    return Parceiros;
  };
  