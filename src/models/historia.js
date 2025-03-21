// src/models/historia.js
module.exports = (sequelize, DataTypes) => {
    const Historia = sequelize.define(
      'Historia',
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
        tableName: 'historia',
        timestamps: false,
      }
    );
  
    Historia.associate = (models) => {
      Historia.belongsTo(models.Instituicao, {
        foreignKey: 'instituicao_id',
        as: 'instituicao',
        onDelete: 'CASCADE',
      });
    };
  
    return Historia;
  };
  