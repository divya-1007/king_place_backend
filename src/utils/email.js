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
           html: `<!DOCTYPE html>
           <html lang="en">
           
           <head>
               <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <meta http-equiv="X-UA-Compatible" content="ie=edge">
               <title>Document</title>
           </head>
           
           <body>
           
               <style type="text/css">
                   body {
                       font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji !important;
                   }
           
                   element.style {
                       display: inline-block;
                       width: 123px;
                   }
           
                   .hx,
                   .im {
                       color: #222222 !important;
                   }
               </style>
               <div
                   style="padding:50px 0;margin:0;background-color:#ececec;font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji">
           
                   <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                       style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;color: #222222;">
                       <tbody>
                           <tr>
                               <td
                                   style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-size:15px">
                                   <table width="600" border="0" cellpadding="0" cellspacing="0"
                                       style="width:600px;margin:0 auto;background-color:#fff">
                                       <tbody> 
                                           <tr> 
                                               <td align="center"
                                                   style="text-align:center;background:#001e3c;padding:10px 0px 10px">
                                                   
                                                   <a href="{{email}}"
                                                       style="text-decoration:none;display:inline-block;font-weight: 700;color: #fff;"
                                                       target="_blank">Reset Password 
                                                   </a>
                                               </td>
                                           </tr>
           
           
                                           <tr> 
                                               <td
                                                   style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;padding:20px 20px">
                                                   <p style="color:#000000; margin-top: 0px;"><b></b></p>
                                                 <img src="	https://king-place.netlify.app/images/logo1.png" style="width:30%; margin-bottom:2rem;" target='AI_Development'>
                                                 
                                            
                                                   <p style=" margin-top: 0rem; margin-bottom:1rem;">
                                                   Need to reste Password ? No problem  ! just click the link bellow and you'll on your way. if you did not make this request, please ignore this email, 
                                                   </p>
                                                  
                                                   <p style=" margin-top: 0px;">
                                                    <a href="https://king-place.netlify.app/reset/64a541c8947edc2336ac5bee/339824">https://king-place.netlify.app/reset/${options.id}/${otp}</a> 
                                                   </p>
                                                   
                                                   
                                                    <p style="margin-top: 0px; margin-bottom: 2px;color: #611A5F;font-weight: 600;">
                                                     Best Regards,   
                                                   </p>
                                                    <p style="margin-top: 0px; margin-bottom: 2px;color: #611A5F;font-weight: 600;">
                                                      King Place Hotel  
                                                   </p>
                       
                                               </td> 
                                           </tr>
                                           <tr>
           
                                           </tr>
                                       </tbody>
                                   </table>
                               </td>
                           </tr>`
       };
       const sebdEmail = await transporter.sendMail(mailOptions)
       return sebdEmail
   }

   exports.sendContactUs = async (options) => {
   
    let mailOptions = {
        from: 'divyachourasiya.infograins@gmail.com',
        to: options.email,
        subject: options.subject,
        text: 'Hello People!',
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        
        <body>
        
            <style type="text/css">
                body {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji !important;
                }
        
                element.style {
                    display: inline-block;
                    width: 123px;
                }
        
                .hx,
                .im {
                    color: #222222 !important;
                }
            </style>
            <div
                style="padding:50px 0;margin:0;background-color:#ececec;font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji">
        
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                    style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;color: #222222;">
                    <tbody>
                        <tr>
                            <td
                                style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-size:15px">
                                <table width="600" border="0" cellpadding="0" cellspacing="0"
                                    style="width:600px;margin:0 auto;background-color:#fff">
                                    <tbody> 
                                        <tr> 
                                            <td align="center"
                                                style="text-align:center;background:#ffcd5f;padding:10px 0px 10px">
                                                <a href="{{email}}"
                                                    style="text-decoration:none;display:inline-block;font-weight: 700;color: #000;"
                                                    target="_blank">Contact-us
                                                </a>
                                            </td>
                                        </tr>
        
        
                                        <tr> 
                                            <td
                                                style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;padding:20px 20px">
                                                <p style="color:#000000; margin-top: 0px;"><b></b></p>
        
                                                <p style="color: #110f0f;">Contatct-Information</p>
                                                <p style=" margin-top: 0px; margin-bottom: 2px;">
                                                    <label style="display:inline-block; width:123px;"> Name                 : </label><b
                                                        style="color: #1b1c1f;">${options.full_Name}</b> 
                                                </p>
                                               
                                                <p style=" margin-top: 0px; margin-bottom: 2px;">
                                                    <label style="display:inline-block; width:123px;"> Email                : </Section>
                                                    </label><b style="color: #1b1c1f;">${options.email}</b>
                                                </p>
                                               
                                                <p style=" margin-top: 0px; margin-bottom: 2px;">
                                                    <label style="display:inline-block; width:123px;"> message         : </Section>
                                                    </label><b style="color:  #1b1c1f;">${options.message}</b>
                                                </p>
        
                                                <div style="height:5px;"></div>
                                            </td> 
                                        </tr>
                                        <tr>
        
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>`
    };
    const contactEmail = await transporter.sendMail(mailOptions)
    return contactEmail
}

exports.sendContactUsClient = async (options) => {
   
    let mailOptions = {
        from: 'divyachourasiya.infograins@gmail.com',
        to: options.email,
        subject: 'Contact-Us',
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        
        <body>
        
            <style type="text/css">
                body {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji !important;
                }
        
                element.style {
                    display: inline-block;
                    width: 123px;
                }
        
                .hx,
                .im {
                    color: #222222 !important;
                }
            </style>
            <div
                style="padding:50px 0;margin:0;background-color:#ececec;font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji">
        
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                    style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;color: #222222;">
                    <tbody>
                        <tr>
                            <td
                                style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-size:15px">
                                <table width="600" border="0" cellpadding="0" cellspacing="0"
                                    style="width:600px;margin:0 auto;background-color:#fff">
                                    <tbody> 
                                        <tr> 
                                            <td align="center"
                                                style="text-align:center;background:#001e3c;padding:10px 0px 10px">
                                                
                                                <a href="{{email}}"
                                                    style="text-decoration:none;display:inline-block;font-weight: 700;color: #fff;"
                                                    target="_blank">Contact-US  
                                                </a>
                                            </td>
                                        </tr>
        
        
                                        <tr> 
                                            <td
                                                style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;padding:20px 20px">
                                                <p style="color:#000000; margin-top: 0px;"></p>
                                              <img src="https://king-place.netlify.app/images/logo1.png" style="width:30%; margin-bottom:2rem;" target='AI_Development'>
                                              </p>
                                              
                                                 <hr>
                                                 <p style=" margin-top: 3rem; margin-bottom:1rem;color: #611A5F;
            font-weight: 600;">Thanks for the enquiry we have received it,</p>
                                                <p style=" margin-top: 0rem; margin-bottom:1rem;">
                                                 <span style="color: #611A5F;
            font-weight: 600;">King Place Hotal</span> , to welcome you on behalf of King Place, we will be in touch with you shortly, In a meantime if you have any questions or requirements details you can revert on this email itself so that based on it we can quickly schedule our discussion or conversation on it. 
        Also, you can schedule a meeting to discuss your specific requirements, here is the calendly link, kindly book your slot as per your convenience, so that we can connect with you to have a more precise conversation regarding your requirement.
                                                </p>
                                               
                                                 <p style=" margin-top: 0px;">
                                                 <a href="https://king-place.netlify.app/">King Place Hotal</a> 
                                                </p>
                                                
                                                
                                                 <p style="margin-top: 0px; margin-bottom: 2px;color: #611A5F;font-weight: 600;">
                                                  Best Regards,   
                                                </p>
                                                 <p style="margin-top: 0px; margin-bottom: 2px;color: #611A5F;font-weight: 600;">
                                                   King Place Hotel  
                                                </p>
                    
                                            </td> 
                                        </tr>
                                        <tr>
        
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>`
    };
    const contactEmail = await transporter.sendMail(mailOptions)
    return contactEmail
}