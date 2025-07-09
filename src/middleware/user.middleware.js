
const { HTTP_STATUS, HTTP_STATUS_CODE, ERROR_MESSAGES } = require("../utils/const.utils");

const authorizeRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).send({
                status: HTTP_STATUS.ERROR,
                message: ERROR_MESSAGES.ROLE_AUTHORIZATION,
                statusCode: HTTP_STATUS_CODE.FORBIDDEN
              });        }
        next();
    };
};

module.exports =  authorizeRole 