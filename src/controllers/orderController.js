const crypto = require("crypto")
const rp = require("razorpay")
const Order = require("../models/orderModel")
const service = require("../service/OrderService");
const { errorHandling ,errorHandlStatus ,statusOk} = require("../utils/errorHandler");
const checkValidation = require("../utils/validation");
const {Message} = require('../utils/message')
const { uuid } = require('uuidv4')


exports.createOrder = async(req,res)=>{
    try {
        const { error } = checkValidation.orderSchema.validate(req.body);

        if (error) {
        return res.status(400).json({ error: error.details[0].message });
        }
    
        const createProduct = await service.saveOrder(req.body ,'create')

    
        if (createProduct) {
            
        statusOk(res,200,{status: true, message:Message.PRODUCT_SAVE ,Product: createProduct})
        
        } else {
        errorHandlStatus(res, 422, "order");
        }
    } catch (error) {
    console.log(error ,"jfv");
    errorHandling(res, error, "order");     
    }
}

exports.getOrderProduct = async(req,res)=>{
    try {
        const findOrder = await service.getOrderData(req.query.id)
        statusOk(res ,200 ,{status:true,order:findOrder})
    } catch (error) {
        console.log(error ,"jfv");
        errorHandling(res, error, "order");     
    }
}

exports.paymentIntent = async(req,res)=>{
    try {
    const paymentIntent = await service.PaymenetIntentCreate(req.body)
    
    statusOk(res ,200 ,{status:true,order:paymentIntent})
        
    } catch (error) {
        console.log(error ,"jfv");
        errorHandling(res, error, "payment");   
    }
}

exports.paymentVerify = async(req,res)=>{
    try {
    const paymentIntent = await service.PaymenetIntentVerify(req.body)

    const updateOrder = await service.OrderUpdate(req.body)
    if(updateOrder){
    statusOk(res ,200 ,{status:true,order:paymentIntent})
    }
    } catch (error) {
    console.log(error ,"jfv");
    errorHandling(res, error, "payment");  
    }
}

exports.makePayment = async (req, res)=>{
    const pay = new rp({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET
    })
    const options = {
        amount: req.body.amount*100,
        currency: "INR",
        receipt: uuid(),
        payment_capture: 1
    }
    const order = await pay.orders.create(options)
    if(!order){
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
    res.status(200).json({
        status: "success",
        order
    })
}

exports.verifyPayment = async (req, res)=>{
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpaySignature,
    } = req.body.rpData;
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");
    if (digest !== razorpaySignature){
        return res.status(400).json({
            message: "Payment verification failed, please try again"
        })
    }
    const {items, price, address} = req.body.order
    const user = req.user._id
    Order.create({
        items,
        price,
        user,
        address,
        transactionID: razorpayPaymentId
    }).then(data =>{
        res.status(201).json({
            order: data
        })
    }).catch(err => {
        errorHandling(res, err, 'order')
    })
}

exports.getOrderData = async(req,res)=>{
    try {
        const OrderFind = await service.getAllOrderData(req)
        statusOk(res ,200 ,{status:true,orderList:OrderFind});
    } catch (error) {
        
    }
}

exports.getUserOrders = (req, res)=>{
    Order.find({user: req.user._id}).then(data =>{
        return res.status(200).json({
            orders: data
        })
    }).catch(err =>{
        errorHandling(res, err, 'order')
    })
}

exports.dashboardData = async(req,res)=>{
   try {
    const OrderFind = await service.dashboardDataCreate(req) 
    statusOk(res ,200 ,{status:true,dashboard: OrderFind});
   } catch (error) {
    errorHandling(res, err, 'order')
   }
}