
const Sequelize = require('sequelize');
const sequelize = require('./../db')

const Admin = sequelize.define('Admin', {
    // attributes
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
      type: Sequelize.STRING,
      unique: true
    }
  });

//  Admin.sync({ force: true })

module.exports = Admin
