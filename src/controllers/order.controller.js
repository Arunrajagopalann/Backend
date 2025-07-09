const orderService = require('../services/order.service')

exports.createOrUpdateOrder = async (req,res)=>{
    let result = await orderService.createOrUpdateOrder(req, res);
    res.status(result.statusCode).json(result)
}

exports.getAllOrder = async (req,res)=>{
    let result = await orderService.getAllOrder(req,res);
    res.status(result.statusCode).json(result)
}

exports.deleteOrder = async (Req,res)=>{
    let result = await orderService.deleteOrder(req,res);
    res.status(result.statusCode).json(result)
}

exports.orderXml = async (req,res) => {
    let result = await orderService.orderXml(req,res);
    res.status(result.statusCode).json(result)
}