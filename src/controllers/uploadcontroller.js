const { v4:uuidv4 } = require('uuid');
const Request = require('../models/request') ;
const {processCSV} = require('../services/csvservices');

async function uploadCSV(req,res){
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const requestId = uuidv4();
        const request = await Request.create({ requestId , status:'pending' });

        console.log('Request created with ID: ' , requestId);

        processCSV(req.file.path , request._id )
        .then(  () => {
            console.log('CSV processing comleted for request: ' , requestId);
        })
        .catch( (error) => {
            console.error('CSV Processing error: ' , error);
            Request.findOneAndUpdate( {requestId} , { status: 'failed'});
        });

        console.log('CSV processing started for request:', requestId);

        res.status(202).json({ requestId, message: 'File uploaded and processing started' });


    } catch (error) {
        console.error('Upload Error:' , error);
        res.status(500).json({ error: 'Internal server error'});
    }
}

module.exports = { uploadCSV};