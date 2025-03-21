// src/models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
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
      senha: {
        type: DataTypes.STRING(255),
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
      tableName: 'users',
      timestamps: false, // O Sequelize não gerencia automaticamente created_at e updated_at
    }
  );

  User.associate = (models) => {
    // Definir associações futuras aqui, se necessário
    // Exemplo: User.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
  };

  return User;
};
