// src/models/instituicao.js
module.exports = (sequelize, DataTypes) => {
    const Instituicao = sequelize.define(
        'Instituicao',
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
            email: {
                type: DataTypes.STRING(255),
                allowNull: true,
                validate: { isEmail: { msg: 'Insira um email válido.' } },
            },
            telefone: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            endereco: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            horario_funcionamento: {
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
            tableName: 'instituicao',
            timestamps: false,
        }
    );

    Instituicao.associate = (models) => {
        Instituicao.hasMany(models.Historia, { foreignKey: 'instituicao_id', as: 'historias' });
        Instituicao.hasMany(models.MissaoVisaoValores, { foreignKey: 'instituicao_id', as: 'missaoVisaoValores' });
        Instituicao.hasMany(models.Equipe, { foreignKey: 'instituicao_id', as: 'equipe' });
        Instituicao.hasMany(models.Parceiros, { foreignKey: 'instituicao_id', as: 'parceiros' });
    };

    return Instituicao;
};
