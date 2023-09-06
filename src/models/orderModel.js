const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "An order must belong to a userId"]
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "An order must belong to a productId"]
    },
   
    country: {
        type: String,
        required: [true, "order item must have a Country"]
    },
    phoneNumber: {
        type: String,
        required: [true, "order item must have a Phone Number"]
    },
    zipCode: {
        type: String,
        required: [true, "order item must have a ZipCode"]
    },
    address: {
        type: String,
        required: [true, "order item must have a Address"]
    },
    stage: {
        type: String,
        enum: ["shipping", "complete"],
    },
    quentity:{
    type: Number,
    required: true
    },
    productName: {
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
    product_image: {
        type:String,
        required: true
    },
    paymentId:{
        type:String,
        required: true   
    },
    currency:{
        type:String,
        required: true   
    },
    // price: {
    //     type: Number,
    //     required: [true, "An order must have a price"]
    // },
    // transactionID: {
    //     type: String,
    //     required: [true, "An order must have a transcation ID"]
    // },
    // address: {
    //     type: {
    //         addressLine1 : {
    //             type: String,
    //             required: true
    //         },
    //         addressLine2: {
    //             type: String
    //         },
    //         city: {
    //             type: String,
    //             required: true,
    //         },
    //         state: {
    //             type: String,
    //             required: true
    //         },
    //         pincode: {
    //             type: String,
    //             required: true
    //         }
    //     },
    //     required: [true, "An order must have a address"],        
    // },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order