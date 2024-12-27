const express = require('express');
const userController = require("../controllers/userController");

//initialize the router
const router = express.Router();

//define the routes
router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.post("/forgotpassword",userController.forgetPassword)
router.post("/resetpassword",userController.resetPassword)

module.exports = router;