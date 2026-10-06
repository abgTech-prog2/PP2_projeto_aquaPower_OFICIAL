const { DataTypes } = require("sequelize")
const Sequelize = require("../config/bd")

const Consumo = Sequelize.define("Consumo", {

    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

})

module.exports = Consumo