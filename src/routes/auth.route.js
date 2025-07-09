const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth.middleware');
const {registerValidation,loginValidation} = require('../validators/auth.validator')
const {createRegister,login,refreshToken,forgotPassword} = require('../controllers/auth.controller')

router.route('/register').post(registerValidation,createRegister)
router.route('/login').post(loginValidation,login)
router.route('/refreshToken').post(authentication,refreshToken)
router.route('/forgotPassword').post(forgotPassword)




module.exports = router;