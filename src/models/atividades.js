// src/models/atividades.js
module.exports = (sequelize, DataTypes) => {
    const Atividades = sequelize.define(
      'Atividades',
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
        video_path: {
          type: DataTypes.STRING(255),
          allowNull: true, // URL do vídeo, se aplicável
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
        tableName: 'atividades',
        timestamps: false,
      }
    );
  
    return Atividades;
  };
  