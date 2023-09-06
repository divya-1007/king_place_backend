const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productName:{
        type: String,
        required: true
    },
    currentIp:{
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart