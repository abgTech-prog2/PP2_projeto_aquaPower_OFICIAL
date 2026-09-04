const { DataTypes } = require("sequelize");

const Sequelize = require("../config/bd");

const Consumo = Sequelize.define("Consumo", {

    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    mes: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

});

module.exports = Consumo;