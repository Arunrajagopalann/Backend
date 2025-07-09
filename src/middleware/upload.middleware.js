const multer = require('multer');
const path = require('path');
const uploadDir = "uploads/";
const fs = require("fs");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  
const upload = multer({
    storage: storage,
    limits:{fileSize:2 * 1024 * 1024}
})

module.exports = upload;
