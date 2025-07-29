const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth.middleware");
const authorizeRole = require("../middleware/user.middleware");
const upload = require("../middleware/upload.middleware");
const multerErrorMiddleware = require("../utils/helper.utils");
const imageDownload = require("../utils/helper.utils");
const admin_SuperAdmin = ["Admin", "Super_Admin"];
const allRoles = ["Admin", "Super_Admin", "User"];
const {
  getProducts,
  getByIdProducts,
  createOrUpdateProduct,
  deleteProduct,
  patchProduct,
  downloadProduct,
  downloadimage,
  bulkUploadProducts,
} = require("../controllers/product.controller");

router
  .route("/products")
  .get(authentication, authorizeRole(allRoles), getProducts)
  .post(
    authentication,
    authorizeRole(allRoles),
    upload.array("images"),
    multerErrorMiddleware.multerErrorHandler,
    createOrUpdateProduct
  );

router
  .route("/products/:id")
  .get(authentication, authorizeRole(allRoles), getByIdProducts)
  .put(authentication, authorizeRole(allRoles), createOrUpdateProduct)
  .delete(authentication, authorizeRole(admin_SuperAdmin), deleteProduct)
  .patch(authentication, authorizeRole(admin_SuperAdmin), patchProduct);
router.route("/productsDownload").get(downloadProduct);
router.route("/imageDownload/:filename").get(downloadimage);
router.route("/bulkUpload").post(upload.single("file"), bulkUploadProducts);

module.exports = router;
