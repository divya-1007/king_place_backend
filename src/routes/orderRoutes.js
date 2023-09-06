const express = require("express")
const orderController = require("../controllers/orderController")
const authController = require("../middleware/authMiddleware")
const userController = require("../controllers/userController")
const router = express.Router()

router.get("/", authController.loginRequired, orderController.getUserOrders)
router.post("/create-order", authController.loginRequired, orderController.createOrder)
router.post("/pay", authController.loginRequired, orderController.makePayment)
router.post("/verify", authController.loginRequired, orderController.verifyPayment)
router.get('/getAllUser', authController.loginRequired,userController.getAllUserData);
router.get('/getOrder',orderController.getOrderData)
router.get('/getOrder-product',orderController.getOrderProduct);
router.post('/payment-intent',orderController.paymentIntent);
router.post('/payment-verify',orderController.paymentVerify);
module.exports = router