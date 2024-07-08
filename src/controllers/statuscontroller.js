const Request = require('../models/request');
//const Product = require('../models/product');

async function checkStatus(req,res){
    try {

        const { requestId } = req.params;

        if(!requestId){
            return res.status(400).json({
                error : 'Request Id is required'
            });
        }

        const request = await Request.findOne({ requestId}).populate('products');

        if(!request){
            return res.status(404).json({
                error: 'Request Not Found'
            });
        }

        const productStatus = request.products.map( product => ({
            productId: product._id,
            status: product.status
        }));

        res.status(200).json({
            requestId: request.requestId,
            status: request.status,
            createdAt: request.createdAt,
            productStatus
        });
        
    } catch (error) {
        console.error('Status check error : ' , error);
        res.status(500).json({ 
            error:'Internal Server Error '
        });
    }
}

module.exports = { checkStatus };