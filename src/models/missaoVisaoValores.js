// src/models/missaoVisaoValores.js
module.exports = (sequelize, DataTypes) => {
    const MissaoVisaoValores = sequelize.define(
      'MissaoVisaoValores',
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        tipo: {
          type: DataTypes.ENUM('missao', 'visao', 'valores', 'objectivos'),
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
        tableName: 'missao_visao_valores',
        timestamps: false,
      }
    );
  
    MissaoVisaoValores.associate = (models) => {
      MissaoVisaoValores.belongsTo(models.Instituicao, {
        foreignKey: 'instituicao_id',
        as: 'instituicao',
        onDelete: 'CASCADE',
      });
    };
  
    return MissaoVisaoValores;
  };
  