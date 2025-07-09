const express = require('express');
const router = express.Router();
const authentication= require('../middleware/auth.middleware')
const authorizeRole= require('../middleware/user.middleware')
const admin_SuperAdmin=['Admin','Super_Admin'];
const allRoles=['Admin','Super_Admin','User'];


const { getAllCategory, createOrUpdateCategory,deleteCategory ,patchCategory,} = require('../controllers/category.controller');
const {createOrUpdateBrand,getAllBrand,deletebrand} = require('../controllers/brand.controller');

router.route('/category').get(
    // authentication,authorizeRole(allRoles),
    getAllCategory).post(
    // authentication,authorizeRole(allRoles),
    createOrUpdateCategory);
router.route('/category/:id').get(
    // authentication,authorizeRole(allRoles),
    getAllCategory).put(
    // authentication,authorizeRole(allRoles),
    createOrUpdateCategory).delete(
        // authentication,authorizeRole(admin_SuperAdmin),
        deleteCategory).patch(authentication,authorizeRole(admin_SuperAdmin),patchCategory);

router.route('/brand').post(
    // authentication,authorizeRole(allRoles),
createOrUpdateBrand).get(
    // authentication,authorizeRole(allRoles),
    getAllBrand);
router.route('/brand/:id').get(
    // authentication,authorizeRole(allRoles),
    getAllBrand).delete(deletebrand);


module.exports = router;