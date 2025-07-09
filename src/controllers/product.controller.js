const productService = require('../services/product.service')
const logger = require('../utils/log/logger');

exports.getProducts = async (req,res)=>{
    console.log('getProducts');
    
    logger.info('get products started');
    let result = await productService.getProducts(req,res);
    res.status(result.statusCode).json(result)
    logger.info('get products ended');

}

exports.getByIdProducts = async (req,res)=>{
    let result = await productService.getByIdProducts(req,res);
    res.status(result.statusCode).json(result)
}

exports.createOrUpdateProduct = async (req,res)=>{
    let result = await productService.createOrUpdateProduct(req, res);
    res.status(result.statusCode).json(result)
}


exports.deleteProduct = async (req,res)=>{
    let result = await productService.deleteProduct(req,res);
    res.status(result.statusCode).json(result)
}

exports.patchProduct = async (req,res)=>{
    let result = await productService.patchProduct(req,res);
    res.status(result.statusCode).json(result)
}

exports.downloadProduct = async (req,res)=>{
    let result = await productService.downloadProduct(req,res);
}
exports.downloadimage = async (req,res)=>{
    let result = await productService.downloadimage(req,res);
}
exports.bulkUploadProducts = async (req,res)=>{
    let result = await productService.bulkUploadProducts(req,res);
    res.status(result.statusCode).json(result)
}