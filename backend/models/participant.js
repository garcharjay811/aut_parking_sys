const Sequelize = require('sequelize');
const sequelize = require('./../db')
const Institute = require('./institute');
const Sport = require('./sport');

const Participant = sequelize.define('Participant', {
    roll_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
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
    },
});
  
// Participant.sync({ force: true });
    
module.exports = Participant;
