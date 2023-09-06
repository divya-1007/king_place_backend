exports.errorHandling = (res, err, model)=>{
    console.log(err ,"ayega");
    let message = ""
    let statusCode = ""
    if(err.name === "ValidationError"){
        statusCode = 400
        let m
        let r = err.message.replace(":", " --")
        r = r.replace(":", " --")
        m = r.split("--")[2]
        message = m.trim()
    }else if(err.code === 11000){
        statusCode = 400
        message = `A ${model} already exists`
    }else{
        statusCode = 500
        message = "Something went wrong"
    }
   return res.status(statusCode).json({
        message,
        err
    })
}


exports.errorHandlStatus = (res,code,mode)=>{
    let message = "";
    let statusCode = "";

  if(code === 422){
    statusCode = 422
    message = `Data not Inserted. Please Try Again`
  }

 return res.status(statusCode).json({
    message,
    code
 })
}

exports.statusOk = async(res,code,mode)=>{
 if(code === 200){
 return res.status(200).json(mode)
 }
}
