const Joi = require('joi');

const getKeys = Joi.object({
  nis: Joi.array().required(),
});

const getStatus = Joi.object({
  token: Joi.string().required()
});

module.exports = {
  getKeys,
  getStatus
};
