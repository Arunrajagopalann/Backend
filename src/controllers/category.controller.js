
const categoryService = require('../services/category.service')

exports.getAllCategory = async (req,res)=>{
    let result = await categoryService.getAllCategory(req,res);
    res.status(result.statusCode).json(result)
}

exports.createOrUpdateCategory = async (req,res)=>{
    let result = await categoryService.createOrUpdateCategory(req,res);
    res.status(result.statusCode).json(result)
}


exports.deleteCategory = async (req,res)=>{
    let result = await categoryService.deleteCategory(req,res);
    res.status(result.statusCode).json(result)
}

exports.patchCategory = async (req,res)=>{
    let result = await categoryService.patchCategory(req,res);
    res.status(result.statusCode).json(result)
}