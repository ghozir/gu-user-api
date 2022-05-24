
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandModel = require('../repositories/commands/command_model');
const validator = require('../../../helpers/utils/validator');
const { ERROR: httpError, SUCCESS: http } = require('../../../helpers/http-status/status_code');

const createUser = async (req, res) => {
  const payload = req.body || {};
  const validatePayload = validator.isValidPayload(payload, commandModel.createUser);

  const postRequest = (result) =>
    (result.err)
      ? result
      : commandHandler.createUser(result.data);

  const sendResponse = (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, 'Failed create user')
      : wrapper.response(res, 'success', result, 'Success create user', http.OK);
  };

  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  createUser
};
