const service = require("../service/ProductService");
const { errorHandling ,errorHandlStatus ,statusOk} = require("../utils/errorHandler");
const checkValidation = require("../utils/validation");
const {Message} = require('../utils/message')



exports.createProduct = async (req, res) => {
    try {
      console.log("hello",req?.body);
      const image_path = req.file;
      if(req?.body?.id){
        const imageUrl = image_path?.filename;
  
      const createProduct = await service.saveProduct(req.body,imageUrl ,'update');
      
      if (createProduct) {
        statusOk(res,200,{status: true, message:Message.PRODUCT_SAVE ,Product: createProduct})
        
      } else {
        errorHandlStatus(res, 422, "product");
      }
      }else{
  
      if (!image_path) {
        return res.status(400).json({ error: Message.Image });
      }
  
      const { error } = checkValidation.productSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const imageUrl = Message.URL + image_path.filename;
  
      const createProduct = await service.saveProduct(req.body,imageUrl ,'create');
  
      if (createProduct) {
        statusOk(res,200,{status: true, message:Message.PRODUCT_SAVE ,Product: createProduct})
        
      } else {
        errorHandlStatus(res, 422, "product");
      }
    }
    } catch (error) {
      console.log(error ,"jfv");
      errorHandling(res, error, "product");
    }
};


exports. getAllProduct = async(req,res)=>{
    try {
      const findProduct = await service.findAllData(req.query.type)
      statusOk(res ,200 ,{status:true,productData:findProduct})
    } catch (error) {
      errorHandling(res, error, "product");   
    }
} 

exports.commanProduct = async(req,res)=>{
  try {
    const findData = await service.findSingleData(req.params.id)
    if(findData){
    const findProduct = await service.customeData(findData._id ,findData.productType)
    statusOk(res ,200 ,{status:true,productData:findProduct})
    }
  } catch (error) {
    errorHandling(res, error, "product");   
  }
}

exports.getSingleProduct = async(req,res)=>{
  try {
    const findProduct = await service.findSingleData(req.params.id)
    statusOk(res ,200 ,{status:true,productData:findProduct})
  } catch (error) {
    errorHandling(res, error, "product");   
  }
} 

exports.dashboardData = async(req,res)=>{
  try {
    const DashBoardData = await service.findTotalCount()
    statusOk(res ,200 ,{status:true,DashBoardData:DashBoardData})
  } catch (error) {
    errorHandling(res, error, "product"); 
  }
}


exports.addToCart = async(req,res)=>{
  try{
  const createProduct = await service.saveAddToCart(req.body ,req.clientIp.split(':')[3]);
  if (createProduct) {
    statusOk(res,200,{status: true, message:Message.PRODUCT_SAVE ,cart: createProduct})
  } else {
    errorHandlStatus(res, 422, "cart");
  }
} catch (error) {
  errorHandling(res, error, "cart");   
}
}


exports.getAllCart = async(req,res)=>{
  try {
    const findCart= await service.findAllDataCart()
    statusOk(res ,200 ,{status:true,cart:findCart})
  } catch (error) {
    errorHandling(res, error, "cart");    
  }
}

exports.cardDataRemove = async(req,res)=>{
  try {
    const findCart = await service.removeCartData(req.params.id)
    statusOk(res ,200 ,{status:true,cart:"sucessfully Delete"})
    
  } catch (error) {
    errorHandling(res, error, "cart");    
  }
}


exports.getSingleCart = async(req,res)=>{
  try {
    const findsingleCart = await service.findAllDataCart(req.params.id)
    statusOk(res ,200 ,{status:true,cartData:findsingleCart})
  } catch (error) {
    errorHandling(res, error, "cart");  
  }
}