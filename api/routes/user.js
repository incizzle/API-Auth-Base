const express = require("express");
const router = express.Router();

var ExpressBrute = require('express-brute');
var MongooseStore = require('express-brute-mongoose');
var bruteSchema = require('../models/brute');
var store = new MongooseStore(bruteSchema);
var bruteforce = new ExpressBrute(store);

const UserController = require('../controllers/user');
const checkUserAuth = require('../middleware/userauth');
const checkAdminAuth = require('../middleware/adminauth');
const checkIsOwner = require('../middleware/isowner');

router.post("/signup", bruteforce.prevent, UserController.user_signup);

router.post("/login", bruteforce.prevent, UserController.user_login);

router.get("/me", checkIsOwner, UserController.user_me);

router.put("/me", checkIsOwner, UserController.user_editme);

router.post("/changepassword", checkIsOwner, UserController.user_changepassword);

module.exports = router;