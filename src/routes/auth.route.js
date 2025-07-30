const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth.middleware');
const {registerValidation,loginValidation} = require('../validators/auth.validator')
const {createRegister,login,refreshToken,forgotPassword,getUserDetails,getByIdUserDetails,updateUserDetails} = require('../controllers/auth.controller')

router.route('/register').post(registerValidation,createRegister)
router.route('/login').post(loginValidation,login)
router.route('/refreshToken').post(authentication,refreshToken)
router.route('/forgotPassword').post(forgotPassword)
router.route('/user').get(authentication,getUserDetails)
router.route('/user/:id').get(authentication,getByIdUserDetails).put(authentication,updateUserDetails)







module.exports = router;