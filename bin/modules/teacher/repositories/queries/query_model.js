const Joi = require('joi');

const getAll = Joi.object({
  page: Joi.number().min(1).required(),
  size: Joi.number().min(0).required(),
  search: Joi.string().optional().allow(null, ''),
  school: Joi.string().required(),
  userId: Joi.string().optional(),
  role: Joi.string().optional().default('student'),
  startDate: Joi.date().optional().allow(null, '').default(''),
  endDate: Joi.date().optional().allow(null, '').default('')
});

const getById = Joi.object({
  id: Joi.string().required(),
  school: Joi.string().required(),
  userId: Joi.string().optional(),
  role: Joi.string().optional().allow(null, '')
});

module.exports = {
  getAll,
  getById
};
