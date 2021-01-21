const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');


const s3 = new aws.s3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

module.exports = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mern-sports-app",
        metadata: function(req, file, cb){
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb){
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname)
            cb(null, `${name.replace(/\s/g,'')}-${Date.now()}${ext}`)
        }
    })
})