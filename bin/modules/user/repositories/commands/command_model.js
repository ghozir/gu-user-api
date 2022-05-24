const Joi = require('joi');

const createUser = Joi.object({
  name: Joi.string().max(200).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(20),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({'any.only': 'confirmPassword must be same with password'}),
  company: Joi.string().required(),
});

module.exports = {
  createUser
};
