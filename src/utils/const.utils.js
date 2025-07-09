const HTTP_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error'
};

const HTTP_STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    ALREADY_EXISTS: 409,
    INTERNAL_SERVER_ERROR: 500
};
  
const ERROR_MESSAGES = {
    INVALID_INPUT: 'Invalid input data',
    UNAUTHORIZED_ACCESS: 'Unauthorized access',
    ROLE_AUTHORIZATION: 'Admin access required',
    NOT_FOUND: 'not found',
    NO_RECORDS_FOUND: 'No records found',
    ALREADY_EXISTS: 'already exists',
    INTERNAL_SERVER_ERROR: 'Internal server error'
};

const SUCCESS_MESSAGES = {
    CREATED: 'created successfully',
    UPDATED: 'updated successfully',
    RETRIEVED: 'retrieved successfully',
    DELETED: 'deleted successfully',
    ACKNOWLEDGED: 'acknowledged successfully'
};

module.exports = { 
    HTTP_STATUS,
    HTTP_STATUS_CODE, 
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
}