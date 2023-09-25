const express = require("express")
const productController = require("../controllers/productController")
const authController = require("../middleware/authMiddleware");
const uploads = require("../middleware/uplod_image")
const router = express.Router()

router.get("/all-product",  productController.getAllProduct)
router.post("/create-product",uploads.single("product_image"), productController.createProduct)
router.get("/single-product/:id", productController.getSingleProduct)
router.get("/comman-product/:id", productController.commanProduct)
router.get('/dashboard',productController.dashboardData),
router.post('/addToCart',productController.addToCart);
router.get('/getAllCart',productController.getAllCart)
router.delete('/removeCart/:id',productController.cardDataRemove)
router.get('/get-single-cart/:id',productController.getSingleCart)



module.exports = router