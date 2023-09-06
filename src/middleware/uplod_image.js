const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public");
    },
    filename: function (req, file, cb) {
        let ext =   path.extname(file.originalname);
        cb(null, Date.now()+"_"+file.fieldname + ext);
    },
});


var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/jpeg" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/webp" ||
            file.mimetype == "application/pdf"||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            // console.log("only jpg,jpeg and png file supported");
            // return cb(new Error('file is not allowed'))
            return cb("only jpg,jpeg and png file supported",false);
        }
    },
})
// webp
module.exports = upload;