const Joi = require('joi');

// Register validation schema
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.validateRegister = (data) => registerSchema.validate(data);
exports.validateLogin = (data) => loginSchema.validate(data);