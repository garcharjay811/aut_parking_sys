const Sequelize = require('sequelize');
const sequelize = require('./../db')

const Group = require('./group');
const Sport = require('./sport');
const Venue = require('./venue');
const Referee = require('./referee');
const Institute = require('./institute');

const TeamMatch = sequelize.define('TeamMatch', {
    match_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    institute1: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Institute,
            key: 'inst_name',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    institute2: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Institute,
            key: 'inst_name',
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
    venue_name: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: Venue,
            key: 'venue_name',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    date: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    referee_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Referee,
            key: 'referee_id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    winner: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

TeamMatch.sync({ force: true })

module.exports = TeamMatch
