const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs').promises;

const Product = require('../models/product');
const { updateRequestStatus } = require('./requestservices');



async function downloadImg(url , outputPath){
    const response = await axios.get(url, {responseType: 'arraybuffer'});

    await fs.writeFile(outputpath , response.data);
}

async function compressImg( inputPath , outputPath){
    await sharp(inputPath)
    .jpeg( {
        quality:50
    })
    .toFile(outputPath);
}

async function processImg(productId , requestId){

    try {

        const product = await Product.findById(productId);
        
        if(!product){
            throw new Error('Product not found');
        }

        const outputImageUrls = product.inputImageUrls.map( url =>{
            //simulating processing as publicimageurl is given or we can use compress defined above
            return `${url}?quality=50`;
        });

        product.outputImageUrls = outputImageUrls;
        product.status = 'completed';
        await product.save();

        console.log(`Processing completed for product ${productId}`);

        await updateRequestStatus(requestId);
        
    } catch (error) {
        console.error('Image processing error :' , error);
        await Product.findByIdAndUpdate( productId , {status: 'failed'});
        await updateRequestStatus(requestId);
    }
}

module.exports = {processImg};

