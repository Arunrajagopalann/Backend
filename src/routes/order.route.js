const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth.middleware');
const authorizeRole= require('../middleware/user.middleware')

const admin_SuperAdmin=['Admin','Super_Admin'];
const allRoles=['Admin','Super_Admin','User'];    
const { createOrUpdateOrder,getAllOrder,deleteOrder,orderXml } = require('../controllers/order.controller')

router.route('/order').get(authentication,authorizeRole(allRoles),getAllOrder).post(authentication,authorizeRole(allRoles), createOrUpdateOrder);
router.route('/order/:id').get(authentication,authorizeRole(allRoles),getAllOrder).delete(authentication,authorizeRole(admin_SuperAdmin),deleteOrder)
// router.route('/order/xml').post(authentication,authorizeRole(admin_SuperAdmin),orderXml)
module.exports = router;
