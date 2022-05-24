const Joi = require('joi');

const messages = {
  any: {
    required: '{{#label}} wajib diisi'
  },
  boolean: {
    base: '{{#label}} harus berupa boolean (true/false)',
  },
  string: {
    base: '{{#label}} harus berupa string',
    min: '{{#label}} harus berisi minimal {{#limit}} karakter',
  },
  custom: {
    subdomain: {
      pattern: '{{#label}} harus memiliki format yang benar'
    }
  }
};


const login = Joi.object({
  username: Joi.string().trim().required().messages({
    'any.required': messages.any.required,
    'string.base': messages.string.base,
  }),
  password: Joi.string().trim().required().messages({
    'any.required': messages.any.required,
    'string.base': messages.string.base,
  }),
  rme: Joi.boolean().default(false).messages({
    'boolean.base': messages.boolean.base,
  }),
}).rename('remember', 'rme');

module.exports = {
  login
};
