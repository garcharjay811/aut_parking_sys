const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');

const adminLoginRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const app = express();

const sequelize = require('./db')
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/adminLogin", adminLoginRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
// module.exports.sequelize = sequelize;
