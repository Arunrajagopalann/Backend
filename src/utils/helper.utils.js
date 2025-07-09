const multer = require('multer');

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({
            status: "error",
            message: "File size too large. Maximum file size allowed is 2MB.",
            statusCode: 400,
          });
      }
      return res
        .status(500)
        .json({
          status: "error",
          message: "An unexpected error occurred during file upload.",
          statusCode: 500,
        });
    }
    next(err);
  };

module.exports = { multerErrorHandler };

