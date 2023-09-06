const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const initAPIs = require('./routes/indexRouters');
const path = require("path")
const bodyParser = require("body-parser");
const requestIp = require('request-ip')
dotenv.config({
    path: "./config.env"
})

const app = express()
app.use(express.json())
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(morgan("tiny"))
app.use(cors())
app.use(cors({ origin: '*' }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(requestIp.mw())
app.use("/public", express.static("public"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
  });

  app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

initAPIs(app) 


if(process.env.NODE_ENV === 'production'){
    app.use("/", express.static("client/build"))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "/client/build/index.html"))
    })
}


module.exports = app