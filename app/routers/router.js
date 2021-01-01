

const express = require('express'); 

const router = express.Router();
 
const data = require('../controllers/controller.js');

router.post('/api/datum', data.createDatum);
router.put('/api/datum', data.updateDatum);

router.get('/api/datum/:id', data.getDatum);
router.get('/api/data', data.Data);

router.delete('/api/datum/:id', data.deleteDatum);

module.exports = router;