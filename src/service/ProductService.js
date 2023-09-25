const Product = require("../models/productModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const { ObjectId } = require("mongodb");
const moment = require("moment");
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
        product_image:
          "https://king-place-backend.onrender.com/public" + imageUrl,
        // 'https://king-place-backend.onrender.com/public'
        status: userData.status,
        productDescription: userData.productDescription,
      };
    } else {
      updateProduct = {
        userId: userData.userId,
        productName: userData.productName,
        productType: userData.productType,
        price: userData.price,
        status: userData.status,
        productDescription: userData.productDescription,
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
      productDescription: userData.productDescription,
    });
    return await createData.save();
  }
};

exports.findAllData = async (type) => {
  if (type == "all") {
    return await Product.find({});
  } else {
    const data = await Product.find({ productType: type });
    console.log(data, "auhcv", type);
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

exports.findTotalCount = async (reqst) => {
  if (reqst.query.type === "all") {
    const TotalWeddingCount = await Order.countDocuments({
      productType: "wedding",
    });
    const TotalFoodCount = await Order.countDocuments({ productType: "food" });
    const TotalRoomCount = await Order.countDocuments({ productType: "room" });
    const TotalUserCount = await User.countDocuments({ isadmin: false });
    const userData = await User.find().sort({ _id: -1 }).limit(10);
    const latestItem = await Product.find().sort({ _id: -1 }).limit(5);
    const TotalProductCount = await Product.countDocuments({});
    const TotalOrder = await Order.find().countDocuments({});
    const latestOrder = await Product.find({ productType: "wedding" })
      .sort({ _id: -1 })
      .limit(5);

    const currentMonth = moment().format("MM");
    const currentYear = moment().format("YYYY");

    const UsersData = [];
    const ProductData = [];
    const OrderData = [];
    const Users1 = [];
    const Users2 = [];


    for (let month = 1; month <= currentMonth; month++) {
      // Calculate the start and end dates for the current month
      const startDate = `${currentYear}-${String(month).padStart(
        2,
        "0"
      )}-01 00:00:00`;
      const endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");

      const roomData = await Order.countDocuments({
        isadmin: { $in: [false] }, // Modify this to include other statuses if needed
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      UsersData.push(roomData);
      const foodData = await Product.countDocuments({
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      ProductData.push(foodData);

      const weddingData = await Order.countDocuments({
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      OrderData.push(weddingData);

      const user1 = await Order.countDocuments({
        status: { $in: [1] }, // Modify this to include other statuses if needed
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      Users1.push(user1);

      const user2 = await Product.countDocuments({
        status: { $in: [0] }, 
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      Users2.push(user2);
    }


    // Order Shipping/complete Status
    const OrderShipping = await Order.countDocuments({
      stage: { $in: ["shipping"] }, 
    });
    const OrderComplete = await Order.countDocuments({
      stage: { $in: ["complete"] }, 
    });

    
    // Product Count According Items
    const foodProduct = await Product.countDocuments({
      productType: { $in: ["food"] }, 
    });

    const roomProduct = await Product.countDocuments({
      productType: { $in: ["room"] }, 
    });

    const WeddingProduct = await Product.countDocuments({
      productType: { $in: ["wedding"] }, 
    });
    

    

    return {
      WeddingCount: TotalWeddingCount,
      FoodCount: TotalFoodCount,
      RoomCount: TotalRoomCount,
      UserCount: TotalUserCount,
      ProductCount: TotalProductCount,
      TotalOrder: TotalOrder,
      ChartUsersData: UsersData,
      ChartProductData: ProductData,
      ChartOrderData: OrderData,
      OrderShipping:OrderShipping,
      OrderComplete:OrderComplete,
      Users1:Users1,
      Users2:Users2,
      foodProduct:foodProduct,
      roomProduct:roomProduct,
      WeddingProduct:WeddingProduct,
      latestUser: userData,
      latestItem: latestItem,
      latestOrder: latestOrder,
    };
  } else {
    const clientfood = await Order.countDocuments({
      customerId: reqst.query.type,
      productType: "food",
    });
    const clientwedding = await Order.countDocuments({
      customerId: reqst.query.type,
      productType: "wedding",
    });
    const clientroom = await Order.countDocuments({
      customerId: reqst.query.type,
      productType: "room",
    });

    const currentMonth = moment().format("MM");
    const currentYear = moment().format("YYYY");

    const monthlyFoodCounts = [];
    const monthlyRoomCounts = [];
    const monthlyWeddingCounts = [];

    for (let month = 1; month <= currentMonth; month++) {
      // Calculate the start and end dates for the current month
      const startDate = `${currentYear}-${String(month).padStart(
        2,
        "0"
      )}-01 00:00:00`;
      const endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");

      const roomData = await Order.countDocuments({
        productType: { $in: ["room"] }, // Modify this to include other statuses if needed
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      monthlyRoomCounts.push(roomData);
      const foodData = await Order.countDocuments({
        productType: { $in: ["food"] }, // Modify this to include other statuses if needed
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      monthlyFoodCounts.push(foodData);

      const weddingData = await Order.countDocuments({
        productType: { $in: ["wedding"] }, // Modify this to include other statuses if needed
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      monthlyWeddingCounts.push(weddingData);
    }

    return {
      clientfood: clientfood,
      clientroom: clientroom,
      clientwedding: clientwedding,
      monthlyFoodCounts: monthlyFoodCounts,
      monthlyRoomCounts: monthlyRoomCounts,
      monthlyWeddingCounts: monthlyWeddingCounts,
    };
  }
};

exports.saveAddToCart = async (cardData, currentIp) => {
  console.log(cardData);
  const findData = await Cart.findOne({ productName: cardData?.productName });
  if (findData?.productName) {
    await Cart.findOneAndUpdate(
      { productName: cardData.productName },
      {
        $set: {
          productId: cardData.productId,
          count: cardData.count,
          productName: cardData.productName,
          currentIp: currentIp,
        },
      },
      { new: true }
    );
    return await Cart.findOne({ productName: cardData?.productName });
  } else {
    const saveCart = new Cart({
      productId: cardData.productId,
      count: cardData.count,
      productName: cardData.productName,
      currentIp: currentIp,
    });
    return saveCart.save();
  }
};

exports.findAllDataCart = async (id) => {
  if (id) {
    const findProduct = await Product.findById({ _id: new ObjectId(id) });
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
    return findProduct;
  } else {
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
};

exports.removeCartData = async (id) => {
  return await Cart.findByIdAndDelete({ _id: new ObjectId(id) });
};
