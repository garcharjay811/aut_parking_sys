const Sequelize = require('sequelize');
const sequelize = require('./../db')
const Sport = require('./sport')

const Referee = sequelize.define('Referee', {
    referee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    referee_name: {
        type: Sequelize.STRING,
        allowNull: false,
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
    phone: {
        type: Sequelize.BIGINT,
        min: 1111111111,
        max: 9999999999,
        allowNull: false,
    }
});

// Referee.sync({ force: true });

module.exports = Referee
