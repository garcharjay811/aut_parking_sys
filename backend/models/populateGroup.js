const Sequelize = require('sequelize');
const sequelize = require('./../db')
const Sport = require('./sport');
const Group = require('./group');
const Institute = require('./institute');

const populateGroup = sequelize.define('populateGroup', {
    group_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Group,
            key: 'group_name',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
    },
    sport_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Sport,
            key: 'sport_name',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
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
    }
});

// populateGroup.sync({ force: true })

module.exports = populateGroup
