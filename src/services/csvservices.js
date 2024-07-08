const csv = require('csv-parser');
const fs = require('fs');
const Product = require('../models/product');
const Request = require('../models/request');

const {processImg} = require('./imgprocessing');



function validateCSV(filepath){
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filepath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end' , () => {
            const isValid = results.every(row => {
                const hasReqfields = row['S. No.'] 
                &&row['Product Name'] &&row['Input Image Urls'];
                
                const hasMultipleUrls = row['Input Image Urls'] &&
                row['Input Image Urls'].split(',').length > 1;
                
                return hasMultipleUrls && hasReqfields;
            });

            if( isValid ){
                console.log('CSV validation successful');
                resolve(results);
            }
            else{
                console.log('CSV validation successful');
                reject(new Error('Invalid CSV Format or missing requirements in URLs'));
            }
        });
    });
}

async function  processCSV(filepath, requestId){

    const data = await validateCSV(filepath);

    const request =await Request.findById(requestId);

    if(!request){
        throw new Error('Request not found');
    }

    request.status = 'processing';
    await request.save();

    for( const row of data ){
        const product = await Product.create({
            serialNumber: row['S. No.'],
            requestId: requestId,
            productName: row['Product Name'],
            inputImageUrls: row['Input Image Urls'].split(',').map(url => url.trim()),
            status:'pending'
        });

        request.products.push(product._id);
        await request.save();

        console.log(`Created product: ${product._id}`);
        processImg(product._id , requestId).catch(error =>{
            console.log(`Error parsing product ${product._id}: `,error);
        });
    }
    console.log('CSV processing completed');

}


module.exports= { validateCSV , processCSV};