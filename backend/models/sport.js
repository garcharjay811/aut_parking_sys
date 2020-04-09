const Sequelize = require('sequelize');
const sequelize = require('./../db')

const Sport = sequelize.define('Sport', {
    sport_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    sport_type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['team', 'individual']]
        }
    }
});

// Sport.sync({ force: true });

module.exports = Sport
