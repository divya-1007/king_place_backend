const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactUs = new Schema({
    full_Name:{
        type:Schema.Types.String
    },

    email:{
        type:Schema.Types.String
    },
    message:{
        type:Schema.Types.String
    }

}, { timestamps: true, strict: false })

const ContactUsModel = mongoose.model("contact_us",ContactUs)
module.exports=ContactUsModel;