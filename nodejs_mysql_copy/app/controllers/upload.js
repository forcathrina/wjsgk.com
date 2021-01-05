const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require("path");

AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json"); // 인증
const s3 = new AWS.S3();



const upload = multer({

  storage: multerS3({
    s3: s3,
    bucket: "openimageforcathrina",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    
    acl: 'public-read-write',

    key: function (req, file, cb) {
      console.log('원본파일명 : ' + file.originalname)
      console.log('저장파일명 : ' + file.filename)
      console.log('크기 : ' + file.size)
      console.log('경로 : ' + file.location)

      let extension = path.extname(file.originalname);
      let basename = path.basename(file.originalname, extension);
      cb(null, `images/${basename}`);
    }
  })

})

module.exports = upload;

