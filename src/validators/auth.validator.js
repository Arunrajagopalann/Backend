const Joi = require('joi');

const registerValidator = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Enter the  name',
        'any.required': ' name is required.'
    }),
    email: Joi.string().email().required().messages({
        'any.required': ' email is required.',
        'string.empty': 'email the  name',
    }),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password and Confirm Password do not match'
    }),
    role: Joi.string().valid('User', 'Admin', 'Super_Admin').default('User')
});

const registerValidation = async (req, res, next) => {
    const { error } = registerValidator.validate(req.body);
	if (error) {
		const errorMessage = error.errors && error.errors[Object.keys(error.errors)[0]].message || error.message;
        return res.status(400).json({ success: false, message:errorMessage });
	} else {
		next();
	}
};

const loginValidator = Joi.object({
  
    email: Joi.string().email().required().messages({
        'any.required': ' email is required.',
        'string.empty': 'email the  name',
    }),
    password: Joi.string().required(),
 
});

const loginValidation = async (req, res, next) => {
    const { error } = loginValidator.validate(req.body);
	if (error) {
		const errorMessage = error.errors && error.errors[Object.keys(error.errors)[0]].message || error.message;
        return res.status(400).json({ success: false, message:errorMessage });
	} else {
		next();
	}
};


module.exports = {registerValidation,loginValidation}