const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkUserAuth = require('../middleware/userauth');
const checkAdminAuth = require('../middleware/adminauth');
const checkIsOwner = require('../middleware/isowner');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.get("/me", checkIsOwner, UserController.user_me);

router.put("/me", checkIsOwner, UserController.user_editme);

module.exports = router;