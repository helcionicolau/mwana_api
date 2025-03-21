// src/models/videos.js
module.exports = (sequelize, DataTypes) => {
    const Videos = sequelize.define(
      'Videos',
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
        video_path: {
          type: DataTypes.STRING(255),
          allowNull: false, // URL do vídeo hospedado
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
        tableName: 'videos',
        timestamps: false,
      }
    );
  
    return Videos;
  };
  