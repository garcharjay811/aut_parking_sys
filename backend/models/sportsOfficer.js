const Sequelize = require('sequelize');
const sequelize = require('./../db')
const Institute = require('./institute');

const SportsOfficer = sequelize.define('SportsOfficer', {
    so_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    so_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    inst_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Institute,
            key: 'inst_name',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    phone: {
        type: Sequelize.BIGINT,
        min: 1111111111,
        max: 9999999999,
        allowNull: false,
    }
});

// SportsOfficer.sync({ force: true })

module.exports = SportsOfficer
