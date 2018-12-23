const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../../config.json')

const User = require("../models/user");

// User Signup
exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      // Email Exist Check
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email Already Exists"
        });
      } 
      // Password Length Check
      if (req.body.password.length <= 3) {
        return res.status(409).json({
          message: "Password Must Be Longer Than 3 Characters"
        })
      }
      // Encrypt Password And Create User Account
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              createdAt: new Date(),
              lastloginAt: undefined,
              updatedAt: undefined,
              picture: "https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-shadow-fill-circle-512.png",
              role: "user",
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "Account Successfully Created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

// User Login
exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed"
          });
        }
        if (result) {
          User.findOneAndUpdate({_id: user[0]._id}, {lastloginAt: new Date()})
            .then()
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
                role: user[0].role,
                lastloginAt: user[0].lastloginAt
              },
              config.jwt_secret,
              {
                expiresIn: "1d"
              }
            );
            return res.status(200).json({
              message: "Auth Successful",
              token: token
            });
        }
        res.status(401).json({
          message: "Auth Failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// User Info
exports.user_me = (req, res, next) => {
  User.find({_id: req.userData.userId})
    .then(user => {
      res.status(200).json({
        _id: user[0]._id,
        createdAt: user[0].createdAt,
        lastloginAt: user[0].lastloginAt,
        updatedAt: user[0].updatedAt,
        picture: user[0].picture,
        role: user[0].role,
        firstname: user[0].firstname,
        lastname: user[0].lastname,
        email: user[0].email
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
};

// User Edit
exports.user_editme = (req, res, next) => {
  if (req.body.role !== undefined) {
      res.status(401).json({
        message: "Cannot Change role"
      });
  }
  else if (req.body._id !== undefined) {
      res.status(401).json({
          message: "Cannot Change _id"
        });
  }
  else if (req.body.createdAt !== undefined) {
      res.status(401).json({
          message: "Cannot Change createdAt"
        });
  }
  else if (req.body.password !== undefined) {
      res.status(401).json({
          message: "Cannot Change password"
        });
  }
  else if (req.body.lastloginAt !== undefined) {
    res.status(401).json({
        message: "Cannot Change lastloginAt"
      });
  }
  else if (req.body.updatedAt !== undefined) {
    res.status(401).json({
        message: "Cannot Change lastloginAt"
      });
  }
  else {
    var request = req.body
    request.updatedAt = new Date()
    User.findOneAndUpdate({_id: req.userData.userId}, request)
    .then(user => {
      res.status(200).json({
        message: 'Account Eddited'
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
  }
};

exports.user_changepassword = (req, res, next) => {
  User.find({ _id: req.userData.userId })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      bcrypt.compare(req.body.oldpassword, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            message: "oldpassword Does not match"
          });
        }
        if (result) {
          if (req.body.newpassword.length <= 3) {
            res.status(401).json({
              message: "Password must be longer than 3 characters"
            })
          }
          else {
            bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
              User.findOneAndUpdate({_id: req.userData.userId}, {password: hash})
              .then(
                res.status(200).json({
                  message: "Password Changed"
                })
              );
            })
          }
        }
      })
  })
};