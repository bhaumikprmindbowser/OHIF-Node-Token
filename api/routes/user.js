const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
// const checkAuth = require('../middleware/check-auth');

router.get("/token", UserController.user_token);

module.exports = router;
