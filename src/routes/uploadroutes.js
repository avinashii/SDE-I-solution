const express = require('express');
const multer = require('multer');
const { uploadCSV } = require('../controllers/uploadcontroller');

const router = express.Router();
const upload = multer({dest: 'uploads/'});

router.post('/upload' , upload.single('csv'), uploadCSV);

module.exports = router;

