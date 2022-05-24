const validate = require('validate.js');
const { UnprocessableEntityError } = require('../../../helpers/error');
const logger = require('../../../helpers/utils/logger');
const wrapper = require('../../../helpers/utils/wrapper');

const isValidPayload = (payload, schema) => {
  const { value, error } = schema.validate(payload);
  if (!validate.isEmpty(error)) {
    logger.error('User::validator', error.message, 'Joi::schama.validate', error);
    return wrapper.error(new UnprocessableEntityError(error.message));
  }
  return wrapper.data(value);
};

module.exports = {
  isValidPayload
};
