const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productType: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    status:{
    type: String, 
    },
    product_image: {
        type:String,
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

const Product = mongoose.model("Product", productSchema)

module.exports = Product