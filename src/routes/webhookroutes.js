const express = require('express');
const { handlewebhook } = require('../controllers/webhookcontroller');

const router = express.Router();


router.post('/webhook/request/:requestId' , handlewebhook);


module.exports = router;