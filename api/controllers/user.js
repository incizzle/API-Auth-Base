const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      if (req.body.password <= 3) {
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
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash,
              role: "user"
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "Account Account Created"
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
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              role: user[0].role
            },
            "5Fp1PF3Y896NXQVu",
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

// Test Endpoint
exports.user_test = (req, res, next) => {
  res.status(200).json({
    message: "Hello World!"
  })
};

// User Info
exports.user_me = (req, res, next) => {
  User.find({_id: req.userData.userId})
    .then(user => {
      res.status(200).json({
        _id: user[0]._id,
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
      message: "Cannot Change Role"
    });
  }
  else {
    User.findOneAndUpdate({_id: req.userData.userId}, req.body)
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