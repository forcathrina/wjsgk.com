

const express = require('express'); 

const router = express.Router();
 
const data = require('../controllers/controller.js');

const AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");

let s3 = new AWS.S3();

router.post('/api/datum', data.createDatum);
router.put('/api/datum', data.updateDatum);

router.get('/api/datum/:id', data.getDatum);
router.get('/api/data', data.Data);

router.delete('/api/datum/:id', data.deleteDatum);


module.exports = router;