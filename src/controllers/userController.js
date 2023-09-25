const User = require("../models/userModel");
const ContactUs = require("../models/contactUsModel");
const { ObjectId } = require("mongodb");
const { generateToken } = require("../middleware/authMiddleware");
const { errorHandling } = require("../utils/errorHandler");
const { sendMailData,sendContactUs,sendContactUsClient } = require("../utils/email");
const bcrypt = require("bcrypt");
const axios = require('axios');

const verifyRecaptcha = async(token) =>{
  const recaptchaBody = {
    secret: '6Lfzrl8nAAAAAN_okR_2VBnym8UWsjko7SHx5cX-',
    response: token,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios
      .post("https://www.google.com/recaptcha/api/siteverify", new URLSearchParams(Object.entries(recaptchaBody)).toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      const { success } = response.data;
      resolve(success);
    } catch (err) {
        console.log(err);
        reject(err);
    }
});
}

exports.signIn = async (req, res) => {
  const { firstName, lastName, email, password,captchaToken } = req.body;
  const isRecaptchaValid = await verifyRecaptcha(captchaToken);

  if (!isRecaptchaValid) {
    return res.status(403).json({ error: 'Invalid reCAPTCHA verification' });
  }

  User.create({ firstName, lastName, email, password })
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((err) => {
      errorHandling(res, err, "user");
    });
};

exports.logIn = async (req, res) => {
  const { email, password ,captchaToken } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password required!",
    });
  }
  let isCorrect = false;
  User.findOne({ email }).select("+password")
  .then(async (data) => {
      if (data) {
        isCorrect = await data.validatePassword(password, data.password);
      }
      if(data == null){
        return res.status(401).json({
          message: "Incorrect Email Please try Again ",
        });
      }else if (!data || !isCorrect) {
        return res.status(401).json({
          message: "Incorrect password Please try Again ",
        });
      }
      data.password = undefined;
      const isRecaptchaValid = await verifyRecaptcha(captchaToken);

      if (!isRecaptchaValid) {
        return res.status(403).json({ error: 'Invalid reCAPTCHA verification' });
      }

      const { token, cookieOptions } = generateToken(data);
      res.cookie("jwt", token, cookieOptions);
      res.status(200).json({
        status: true,
        data: data,
        message: "success",
        token,
      });
    })
    .catch((err) => {
      errorHandling(res, err, "user");
    });
};

const generateOTP = () => {
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.forgotPassword = (req, res) => {
  let user;
  User.findOne({ email: req.body.email })
    .then(async (data) => {
      if (!data) {
        return res.status(404).json({
          message: "User does not exists",
        });
      }
      user = data;
      const OTP = generateOTP();
      const options = {
        email: req.body.email,
        id: data._id,
        subject: "Password reset OTP for Pizzeria",
      };
      try {
        const emailresponse = await sendMailData(options, OTP);
        if (emailresponse.messageId) {
          console.log("Message Sent" + emailresponse);
          user.passwordResetOTP = `${OTP}`;
          user.passwordResetOTPExpire = Date.now() + 10 * 60 * 1000;
          await user.save();
          res.status(200).json({
            message: "Check email for password reset OTP",
          });
        }
      } catch (err) {
        res.status(500).json({
          message: "Something went wrong!",
          err,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Enter a valid email address",
      });
    });
};

const dateDifferenceMin = (d1, d2) => {
  const diff = d1 - d2;
  const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
  return diffMins;
};

exports.resetPassword = async (req, res) => {
    try {
  const { newPassword, id, otp } = req.body;

  const user = await User.findOne({
    _id: new ObjectId(id),
    OTP: otp,
    passwordResetOTPExpire: { $gt: Date.now() },
  });
  if (
    !user ||
    dateDifferenceMin(Date.now(), user.passwordResetOTPExpire) > 10
  ) {
    return res.status(400).json({
      status:409,
      message: "OTP is invalid or expired",
    });
  }
 
  user.password = newPassword;
  user.passwordResetOTP = undefined;
  user.passwordResetOTPExpire = undefined;

  const updatePassword = await user.save();
  if (updatePassword) {
    return res.status(200).json({
      status: true,
      message: "Password reset success",
    });
  }
} catch (error) {
  errorHandling(res, error, "user");    
}
};

exports.editUser = (req, res) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((data) => {
      res.status(200).json({
        user: data,
      });
    })
    .catch((err) => {
      errorHandling(res, err, "order");
    });
};

exports.changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  User.findById(req.user._id)
    .select("+password")
    .then(async (data) => {
      const isCorrect = await data.validatePassword(oldPassword, data.password);
      if (!data || !isCorrect) {
        return res.status(400).json({
          message: "Incorrect Password",
        });
      }
      data.password = newPassword;
      await data.save();
      res.status(200).json({
        message: "Password change success",
      });
    })
    .catch((err) => {
      errorHandling(res, err, "User");
    });
};

exports.getAllUserData =async (req,res)=>{
  try{
    const findAllData = await User.find({})
 
   if(findAllData){
   return res.status(200).json({
      status:true,
      user:findAllData
    })
   }else{
    errorHandling(res, err, 'User')
   }
  
}catch(err){
    errorHandling(res, err, 'User')
}
}

exports.ContactUs = async(req,res)=>{
  try {
    const { full_Name, email, message } = req.body
    if (full_Name == undefined || full_Name == "") {
        return res.json({
            staus: 422,
            message: "please fill Name!"
        });
    }
  
    if (email == undefined || email == "") {
        return res.json({
            staus: 422,
            message: "Please fill Email Address!",
        });
    }
   
    if (message == undefined || message == "") {
        return res.json({
            staus: 422,
            message: "please fill Message!"
        });
    }

    const contactInformation = new ContactUs({
      full_Name: full_Name,
        email: email,
        message: message,
    });
   const findAllData = await contactInformation.save();
 
   if(findAllData){
    const options = {
      email:'divyachourasiya.infograins@gmail.com',
      full_Name: findAllData.full_Name,
      message: findAllData.message,
      id:findAllData._id,
      subject:"Contact Us Details",
    };
    const emailresponse = await sendContactUs(options);
        if (emailresponse.messageId) {
       const emailresponseClient = await    sendContactUsClient({email:findAllData.email,})
       if (emailresponseClient.messageId) {
        console.log("Message Sent" + emailresponse);
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Contact information details saved successfully!",
      })
       }else{
       errorHandling(res, err, 'User')
       }
         
        }
   }else{
    errorHandling(res, err, 'User')
   }
  }catch(err){
    errorHandling(res, err, 'Contact Us')
}
}


