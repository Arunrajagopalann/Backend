const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth.middleware');
const authorizeRole= require('../middleware/user.middleware')

const admin_SuperAdmin=['Admin','Super_Admin'];
const allRoles=['Admin','Super_Admin','User'];  
const { createOrUpdatewarehouse,getWarehouse,deleteWarehouse } = require('../controllers/warehouse.controller')


router.route('/warehouse').get(
    // authentication,authorizeRole(allRoles),
     getWarehouse).post(
        // authentication,authorizeRole(allRoles),
         createOrUpdatewarehouse);
router.route('/warehouse/:id').get(
    // authentication,authorizeRole(allRoles),
     getWarehouse).put(
        // authentication,authorizeRole(allRoles),
         createOrUpdatewarehouse).delete(
            // authentication,authorizeRole(allRoles),
             deleteWarehouse);


module.exports = router;
