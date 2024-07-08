const Request = require('../models/request');
const axios = require('axios');

async function sendWebhook(requestId, status) {
    try {
        const webhookUrl = `http://localhost:3000/api/webhook/request/${requestId}`; // Replace with your actual webhook URL
        
        await axios.post(webhookUrl, { status });
        
        console.log(`Webhook sent for :${requestId}`);
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}

async function updateRequestStatus(requestId){
    
    const request = await Request.findById(requestId).populate('products');
    const allCompleted = request.products.every(product => product.status==='completed');
    const anyFailed = request.products.some(product => product.status === 'failed');

    if(allCompleted) {
        request.status = 'completed';

        await sendWebhook(requestId , 'completed');
    }else if(anyFailed){
        request.status  = 'failed';
    }else{
        request.status  = 'processing';
    }

    await request.save();

}
module.exports = { updateRequestStatus };