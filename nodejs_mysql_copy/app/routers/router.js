const path = require("path");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require('multer-s3');

const express = require('express');

const router = express.Router();

const data = require('../controllers/controller.js');

const upload = require('../controllers/upload.js');
const deleteFile = require('../controllers/delete.js');

AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json"); // 인증




router.post('/api/datum', data.createDatum);
router.put('/api/datum', data.updateDatum);

router.get('/api/datum/:id', data.getDatum);
router.get('/api/data', data.Data);

router.get('/api/editid', data.editId);

router.delete('/api/datum/:id', data.deleteDatum);


router.delete('/api/upload/delete/:id', deleteFile.deleteFile);

router.post('/api/upload', upload.single("userfile"), (req, res, next) => {



  /*
  if (res instanceof multer.MulterError) {
    return next(res);
  } else if (res) {
    return next(res);
  }
  */
  
  console.log('원본파일명 : ' + req.file.originalname)
  console.log('저장파일명 : ' + req.file.filename)
  console.log('크기 : ' + req.file.size)
  console.log('경로 : ' + req.file.location)
  
  return res.json({success:1});
})



module.exports = router;