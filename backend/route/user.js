const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require('passport');
const config = require("../connection/config");
const User = require("../model/User");

router.post("/register", (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
   User.getUserByEmail(req.body.email, (err, user) => {
    if (!user) {
      User.addUser(newUser, (err, suc) => {
        if (err) {
          res.json({
            success: false,
            message: "Failed to Register User",
            data: err
          });
        } else {
          res.json({
            success: true,
            message: "User Added Successfully"
          });
        }
      });
    } else {
      res.json({
        success: true,
        msg: "username",
        data: user.email
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.getUserByEmail(email, (err, user) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      return res.json({
        success: false,
        msg: "User Not Found"
      });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        User.findOne({ email: email }, function(err, avl) {
          if (avl == null) {
            return res.json({
              success: false,
              msg: "User Login Denied!"
            });
          } else {
            const token = jwt.sign({ dpk: user }, config.secret, {
              expiresIn: "604800"
            });

            res.json({
              success: true,
              token: "JWT " + token,
              name: user.name,
              email: user.email,
              id: user._id
            });
          }
        });
      } else {
        return res.json({
          success: false,
          msg: "Wrong Password"
        });
      }
    });
  });
});

module.exports = router;
