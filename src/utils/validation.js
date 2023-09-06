const Joi = require('joi');

// Define the validation schema for your data
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const productSchema = Joi.object({
    userId: Joi.string().required(),
    productName: Joi.string().required(),
    productType: Joi.string().required(),
    price: Joi.number().min(0).required(),
    status:Joi.string().required(),
    productDescription:Joi.string().required(),
  });

  const orderSchema = Joi.object({
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
    country: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    zipCode:Joi.string().required(),
    address:Joi.string().required(),
    productName: Joi.string().required(),
    productType: Joi.string().required(),
    price: Joi.number().min(0).required(),
    product_image:Joi.string().required(),
    quentity:Joi.number().required(),
    currency:Joi.string().required(),
  });


module.exports = {
  userSchema,
  productSchema,
  orderSchema,
};