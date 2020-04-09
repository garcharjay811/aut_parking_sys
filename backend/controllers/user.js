const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/admin");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    // console.log(req.body.email)
    User.create({
      email: req.body.email,
      password: hash
    })
    .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "User exists already."
      });
    });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ where: {email: req.body.email} })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        emailId: fetchedUser.email
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}
