const express = require("express")
const { loginRequired } = require("../middleware/authMiddleware")
const userController = require("../controllers/userController")

const router = express.Router()

router.post("/login", userController.logIn)
.post("/signup", userController.signIn)
.post("/forgotpassword", userController.forgotPassword)
.post("/resetpassword", userController.resetPassword)
.patch("/changepassword", loginRequired, userController.changePassword)
.patch("/", loginRequired, userController.editUser)
.post('/contact-us',userController.ContactUs)

module.exports = router