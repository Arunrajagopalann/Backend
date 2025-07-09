const authService = require('../services/auth.service')

exports.createRegister = async (req,res)=>{
    let result = await authService.createRegister(req,res);
    res.status(result.statusCode).json(result)
}
exports.login = async (req,res)=>{
    let result = await authService.login(req,res);
    res.status(result.statusCode).json(result)
}
exports.refreshToken = async (req,res)=>{
    let result = await authService.refreshToken(req);   
    res.status(result.statusCode).json(result)
}
exports.forgotPassword = async (req,res)=>{
    let result = await authService.forgotPassword(req);   
    res.status(result.statusCode).json(result)
}