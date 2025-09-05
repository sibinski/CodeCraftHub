// src/validations/userValidation.js
const Joi = require('joi');

const userValidationSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const validateUser = (user) => userValidationSchema.validate(user);

module.exports = validateUser;
