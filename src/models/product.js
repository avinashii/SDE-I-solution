const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    serialNumber: {
        type:Number,
        required:true
    },
    requestId: {
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    inputImageUrls:[{ type: String }],
    outputImageUrls:[{ type: String }],
    status: { type: String,
         enum: ['pending', 'processing', 'completed', 'failed'],
         default: 'pending' 
    },
    
});

module.exports = mongoose.model('Product' , ProductSchema);