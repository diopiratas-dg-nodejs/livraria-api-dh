const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Livro = sequelize.define(
        "Livro",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            titulo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            quantidadePaginas: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            autor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            anoLancamento: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            estoque: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            tableName: "livros",
            underscored: true,
            timestamps: false,
        }
    );

    return Livro;
}