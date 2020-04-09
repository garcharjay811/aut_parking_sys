const Sequelize = require('sequelize');
module.exports = new Sequelize('postgres://postgres:jay1211@localhost:5432/sport_db', {logging: false});