const express = require('express')
const router = express.Router()
const pizzaRouter = require("./pizzaRoutes")
const userRouter = require("./userRoutes")
const orderRouter = require("./orderRoutes")
const reviewRouter = require("./reviewRoutes")
const productRouter = require("./productRoutes")

const initAPIs = (app) => {
app.use("/api/pizzas", pizzaRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/product",productRouter)
}


module.exports = initAPIs