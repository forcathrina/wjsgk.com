const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require("path");

AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json"); // 인증



exports.deleteFile = async (req, res) => {

  let userId = req.params.id;
  var deleteFile = new AWS.S3();
  deleteFile.deleteObject({
    Bucket: "openimageforcathrina",
    Key: 'images/' + userId
  }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error -> Can NOT delete a user with id = " + req.params.id,
        error: error.message
      });
    }

    res.status(200).json(data)
  })

}
