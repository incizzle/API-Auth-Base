const express = require("express");
const router = express.Router();

const UserController = require('../controllers/admin');
const checkUserAuth = require('../middleware/userauth');
const checkAdminAuth = require('../middleware/adminauth');
const checkIsOwner = require('../middleware/isowner');

router.get("/userlist", checkAdminAuth, UserController.admin_user_list);

router.delete("/user/:userId", checkAdminAuth, UserController.admin_user_delete);

router.put("/user/:userId", checkAdminAuth, UserController.admin_user_edit);

module.exports = router;