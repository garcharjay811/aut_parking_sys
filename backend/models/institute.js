const Sequelize = require('sequelize');
const sequelize = require('./../db')

const Institute = sequelize.define('Institute', {
    inst_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});

// Institute.sync({ force: true })

module.exports = Institute