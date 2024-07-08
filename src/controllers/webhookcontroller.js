const Request = require('../models/request');

async function handlewebhook(req,res){

    const {requestId} = req.params;
    const {status} = req.body;
    
    try {
        const request = await Request.findOne({ requestId: requestId });
    
        if (!request) {
          return res.status(404).json({ error: 'Request not found' });
        }
    
        request.status = status;
        await request.save();
        console.log(`Request ${requestId} status updated to ${status}`);

        res.status(200).json({ message: 'Request webhook processed successfully' });
  } catch (error) {
    console.error('Request webhook processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = { handlewebhook };