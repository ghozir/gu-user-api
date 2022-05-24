const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().max(200).required(),
  code: Joi.string().max(7).required(),
  birthDate: Joi.date().required(),
  username: Joi.string().max(128).required(),
  subject: Joi.array().default([]).optional().items(Joi.string().hex().length(24)),
});

const deleteTeacher = Joi.object({
  id: Joi.string().hex().length(24).required()
});

module.exports = {
  create,
  deleteTeacher
};
