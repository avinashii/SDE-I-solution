const express = require('express');
const { checkStatus } = require('../controllers/statuscontroller');

const router = express.Router();

router.get('/status/:requestId' , checkStatus);

module.exports = router;
