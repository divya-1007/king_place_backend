const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const { ObjectId } = require("mongodb");
const stripe = require("../utils/payment");



exports.saveOrder = async(orderData ,type)=>{
const paymentIdCreate = await stripe.createStripeCustomer()
if(paymentIdCreate){
const createData = new Order({
    customerId: orderData.customerId,
    productId: orderData.productId,
    country: orderData.country,
    phoneNumber: orderData.phoneNumber,
    zipCode: orderData.zipCode,
    address: orderData.address,
    productName:orderData?.productName,
    productType:orderData?.productType,
    price:orderData?.price,
    product_image:orderData?.product_image,
    quentity:orderData?.quentity,
    paymentId:paymentIdCreate?.id,
    currency:orderData?.currency,
    stage:'shipping'
    });
    return await createData.save(); 
}else{
    console.log("cumtomer Not Create");
}
}

exports.OrderUpdate = async(userData)=>{
  await Order.findOneAndUpdate(
    { _id: userData?.productId},
    { $set: {stage:'complete'} },
    { new: true }
  );
}

exports.PaymenetIntentCreate = async(userData)=>{
    const order = await Order.findOne({productId:userData?.productId}) 
    const paymentIntent = await stripe.paymentIntentData(order);
    if(paymentIntent){
     const updateOrder =  await Order.findOneAndUpdate(
        { _id: order._id },
        { $set: {stage:'complete'} },
        { new: true }
      );
      return updateOrder
    }
}

exports.PaymenetIntentVerify = async(paymentData)=>{
const paymentsucess = await stripe.paymentConformData(paymentData.paymentIntent, paymentData.paymentMethod); 
if(paymentsucess){
    return paymentsucess
  } 
}

exports.getAllOrderData = async(req)=>{
  console.log(req?.query.type ,"sfcjdn");
  if(req?.query.type == 'All'){
   return await Order.find({})
  }else{
  return await Order.find({customerId:req?.query.type})
  }
}


exports.getOrderData = async(customerId)=>{
 const order = await Order.findOne({customerId:customerId})
 const product = await Product.findOne({_id:order?.productId})
   const productData ={
    quentity:product?.quentity,
    productName:product?.productName,
    productType:product?.productType,
    price:product?.price,
    product_image:product?.product_image,
    orderId: order?._id,
    customerId:order?.customerId,
    productId: order?.productId,
    country:order?.country,
    phoneNumber:order?.phoneNumber,
    zipCode:order?.zipCode,
    address:order?.address,
    }
    return productData
}

exports.dashboardDataCreate = async(reqst)=>{
  if(reqst.query.type ==='all'){
    const totalUser = await User.find().count()
    const totalProduct = await Product.find().count()
    const totalOrder = await Order.find().count()
    const totalfood = await Order.find({productType:'food'}).count()
    const Totalwedding = await Order.find({productType:'wedding'}).count()
    const Totalroom = await Order.find({productType:'room'}).count()
    return {TotalUser:totalUser ,TotalProduct:totalProduct,TotalOrder:totalOrder,Totalfood:totalfood,Totalwedding:Totalwedding,Totalroom:Totalroom}

  }else{
    const clientfood = await Order.find({customerId:reqst.query.type,productType:'food'}).count()
    const clientwedding = await Order.find({customerId:reqst.query.type,productType:'wedding'}).count()
    const clientroom = await Order.find({customerId:reqst.query.type,productType:'room'}).count()
    return {clientfood:clientfood ,clientroom:clientroom ,clientwedding:clientwedding}
  }
}