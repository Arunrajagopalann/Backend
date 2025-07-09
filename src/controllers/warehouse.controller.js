const warehouseService = require('../services/warehouse.service')

exports.createOrUpdatewarehouse = async (req,res)=>{
    let result = await warehouseService.createOrUpdateWarehouse(req,res);
    res.status(result.statusCode).json(result)
}

exports.getWarehouse = async (req,res)=>{
    let result = await warehouseService.getWarehouse(req,res);
    res.status(result.statusCode).json(result)
}

exports.deleteWarehouse = async (req,res)=>{
    let result = await warehouseService.deleteWarehouse(req,res);
    res.status(result.statusCode).json(result)
}