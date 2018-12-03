const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Admin List
exports.admin_user_list = (req, res, next) => {
    User.find({})
      .then(user => {
        newdata = {};
        for (const s in user) {
          const data = user[s]
          newdata[data._id] = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role: data.role,
            password: data.password
          };
        }
        res.status(200).json(newdata)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
};
  
// Admin Edit
exports.admin_user_edit = (req, res, next) => {
User.findOneAndUpdate({_id: req.params.userId}, req.body)
    .exec()
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
};

// Admin Delete
exports.admin_user_delete = (req, res, next) => {
User.find({_id: req.params.userId})
    .exec()
    .then(user => {
    if (user[0].role === 'admin') {
        res.status(500).json({
        message: "Cannot Delete Admin Account"
        })
    }
    else {
        User.deleteOne({_id: req.params.userId})
        .exec()
        .then(
            res.status(202).json({
            message: 'User Account Deleted'
            })
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
            error: err
            });
        })
    }
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
    })
};