const brandService = require('../services/brand.service')

exports.createOrUpdateBrand = async (req,res)=>{
    let result = await brandService.createOrUpdateBrand(req,res);
    res.status(result.statusCode).json(result)
}

exports.getAllBrand = async (req,res)=>{
    let result = await brandService.getAllBrand(req,res);
    res.status(result.statusCode).json(result)
}

exports.deletebrand = async (req,res)=>{
    let result = await brandService.deletebrand(req,res);
    res.status(result.statusCode).json(result)
}