const Sequelize = require('sequelize');
const sequelize = require('./../db')

const Venue = sequelize.define('Venue', {
    venue_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

// Venue.sync({ force: true })

module.exports = Venue
