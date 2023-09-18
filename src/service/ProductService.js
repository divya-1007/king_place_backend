const Product = require("../models/productModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel")
const { ObjectId } = require("mongodb");
// save Data
exports.saveProduct = async (userData, imageUrl, type) => {
  console.log(imageUrl);
  if (type == "update") {
    let updateProduct = "";
    if (imageUrl) {
      updateProduct = {
        userId: userData.userId,
        productName: userData.productName,
        productType: userData.productType,
        price: userData.price,
        product_image: 'https://king-place-backend.onrender.com/public'+imageUrl,
        // 'https://king-place-backend.onrender.com/public'
        status: userData.status,
        productDescription:userData.productDescription
      };
    } else {
      updateProduct = {
        userId: userData.userId,
        productName: userData.productName,
        productType: userData.productType,
        price: userData.price,
        status: userData.status,
        productDescription:userData.productDescription
      };

      await Product.findOneAndUpdate(
        { _id: userData.id },
        { $set: updateProduct },
        { new: true }
      );
      return await Product.findOne({ _id: userData.id });
    }
  } else {
    const createData = new Product({
      userId: userData.userId,
      productName: userData.productName,
      productType: userData.productType,
      price: userData.price,
      product_image: imageUrl,
      status: userData.status,
      productDescription:userData.productDescription
    });
    return await createData.save();
  }
};

exports.findAllData = async (type) => {
  if(type == 'all'){
    return await Product.find({});
  }else{
    const data = await Product.find({ productType: type });
    console.log(data ,"auhcv" ,type);
    return await Product.find({ productType: type });
  }
};

exports.findSingleData = async (id) => {
  return await Product.findById({ _id: new ObjectId(id) });
};

// { $ne: 0 } }
exports.customeData = async (id, type) => {
  console.log(id, type, "aya");
  return await Product.find({ _id: { $ne: id }, productType: type });
};

exports.findTotalCount = async()=>{
  const TotalProductCount = await Product.countDocuments({});
  const TotalWeddingCount = await Product.countDocuments({ productType: 'wedding' });
  const TotalFoodCount = await Product.countDocuments({ productType: 'food' });
  const TotalRoomCount = await Product.countDocuments({ productType: 'room' });
  const TotalUserCount = await User.countDocuments({ isadmin: false });
  const userData = await User.find().sort({'_id':-1}).limit(10);
  const latestItem = await Product.find().sort({'_id':-1}).limit(5);
  const latestOrder = await Product.find({productType: 'wedding' }).sort({'_id':-1}).limit(5);

  return {WeddingCount:TotalWeddingCount,FoodCount:TotalFoodCount,latestUser:userData,latestItem:latestItem,
          RoomCount:TotalRoomCount,UserCount:TotalUserCount,ProductCount:TotalProductCount,latestOrder:latestOrder}

}

exports.saveAddToCart =async(cardData ,currentIp)=>{
  console.log(cardData);
  const findData = await Cart.findOne({productName:cardData?.productName});
  if(findData?.productName){
    await Cart.findOneAndUpdate(
      { productName: cardData.productName },
      { $set: { productId: cardData.productId,count: cardData.count,productName:cardData.productName,currentIp:currentIp} },
      { new: true }
    );
    return await Cart.findOne({productName:cardData?.productName});
  }else{
 const  saveCart = new Cart({
  productId: cardData.productId,
  count: cardData.count,
  productName:cardData.productName,
  currentIp:currentIp,
 })
 return saveCart.save()
}
}

exports.findAllDataCart = async(id)=>{
  

  if(id){
    const findProduct = await Product.findById({_id:new ObjectId(id)});
  //   console.log(id);
  //   const changeData = await Cart.findById({ _id: ObjectId(id) },{ _id:0,productId:1,productName:1,currentIp: 1, count: 1,createdAt:1 });
  //   console.log(changeData ,"changeData");
  //   const findProduct = await Product.findById({_id:new ObjectId(changeData.productId)});
  //   let productData ={};
  //   if(findProduct.productName == changeData.productName){
  //     productData ={
  //       productId:changeData?.changeData,
  //       productName:changeData?.productName,
  //       currentIp:changeData?.currentIp,
  //       count:changeData?.count,
  //       _id: findProduct?._id,
  //       productType:findProduct?.productType,
  //       price:findProduct?.price,
  //       product_image:findProduct?.product_image,
  //       status:findProduct?.status,
  //       userId:findProduct?.userId,
  //     }
  //   }
    return findProduct
  }else{
  const CartData = await Cart.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    {
      $unwind: "$productInfo", // Unwind the productInfo array
    },
  ]);
  return CartData;
}
}


exports.removeCartData = async(id)=>{
 return await Cart.findByIdAndDelete({_id:new ObjectId(id)})
}
