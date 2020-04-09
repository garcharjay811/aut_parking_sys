const Sequelize = require('sequelize');
const sequelize = require('./../db')
const Sport = require('./sport');

const Group = sequelize.define('Group', {
    group_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    sport_name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Sport,
            key: 'sport_name',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
    },
    group_winner: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

//Group.sync({ force: true })

module.exports = Group
