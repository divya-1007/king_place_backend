const sgMail = require("@sendgrid/mail")
const nodemailer = require('nodemailer');

exports.sendMail123 = async (options, otp)=>{
    sgMail.setApiKey(process.env.SENDGRID_KEY) 
    const mailOptions = {
        to: options.email,
        from: "ayushm.dev@gmail.com",
        subject: options.subject,
        html: `<html> <head> <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet"> </head> <body> <div style="font-family: 'Montserrat', sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 0"> <div style="border-bottom:1px solid #eee"> <a style="font-size:1.4em;color: #DD4145;text-decoration:none;font-weight:600">Yours Pizzeria</a> </div> <p style="font-size:1.1em">Hi,</p> <p>Use the following OTP to complete your password reset process. OTP is valid for 10 minutes only.</p> <h2 style="background: #DD4145;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><OTP></h2> <p style="font-size:0.9em;">Regards,<br />Pizzeria</p> <hr style="border:none;border-top:1px solid #eee" /> <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"> <p>Pizzeria Pvt Ltd</p> <p>Park Avenue, Hyderabad</p> <p>Telangana</p> </div> </div> </div> </body></html>`.replace("<OTP>", otp)
    }
    await sgMail.send(mailOptions);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
     transportMethod: 'SMTP',
    auth: {
        user: 'divyachourasiya.infograins@gmail.com',
        pass: "qxdujecsoudvqznj"
    },
  });


  exports.sendMailData = async (options, otp) => {
       let mailOptions ={}
      mailOptions = {
           from: 'divyachourasiya.infograins@gmail.com',
           to: options.email,
           subject: options.subject,
           text: 'Hello People!',
           html: `<html> <head> <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet"> </head> <body> <div style="font-family: 'Montserrat', sans-serif;min-width:1000px;overflow:auto;line-height:2"> 
           <div style="margin:50px auto;width:70%;padding:20px 0"> <div style="border-bottom:1px solid #eee"><a style="font-size:1.4em;color: #DD4145;text-decoration:none;font-weight:600">Yours Pizzeria</a> </div> 
           <p style="font-size:1.1em">Hi,</p>
            <p>Use the following process to complete your password reset process is valid for 10 minutes only.</p>
           <a href="http://127.0.0.1:3000/reset/${options.id}/${otp}" "style="text-decoration:none;line-height:100%;color:#DD4145;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;">Verify Email</a> 
             <h2 style="background: #DD4145;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><OTP></h2>
            <p style="font-size:0.9em;">Regards,<br />Pizzeria</p> <hr style="border:none;border-top:1px solid #eee" /> <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"> <p>Pizzeria Pvt Ltd</p> <p>Park Avenue, Hyderabad</p> <p>Telangana</p> </div> </div> </div> </body></html>`
       };
       const sebdEmail = await transporter.sendMail(mailOptions)
       return sebdEmail
   }