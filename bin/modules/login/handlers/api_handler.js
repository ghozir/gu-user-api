
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandModel = require('../repositories/commands/command_model');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../../../helpers/utils/validator');

const login = async (req, res) => {
  const payload = req.body || {};
  const validatePayload = validator.isValidPayload(payload, commandModel.login);
  const postRequest = (result) =>
    (result.err)
      ? result
      : commandHandler.login(result.data);

  const sendResponse = (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, 'Failed to log user in')
      : wrapper.response(res, 'success', result, 'Successfully log user in');
  };
  sendResponse(await postRequest(validatePayload));
};

const checkStatus = async (req, res) => {
  const payload = req.query || {};
  const validatePayload = validator.isValidPayload(payload, queryModel.getStatus);
  // return wrapper.response(res, 'success', {data: payload},'succes');
  const postRequest = (result) =>
    (result.err)
      ? result
      : queryHandler.checkStatus(result.data);

  const sendResponse = (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, 'Failed check status')
      : wrapper.response(res, 'success', result, 'Successfully check status');
  };

  sendResponse(await postRequest(validatePayload));
};

const logout = async (req, res) => {

  const postRequest = () => commandHandler.logout(req.userId);

  const sendResponse = (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, 'Failed to log teacher out')
      : wrapper.response(res, 'success', result, 'Successfully log teacher out');
  };

  sendResponse(await postRequest());
};

const getInfo = async (req, res) => {
  return wrapper.response(res, 'success', {data: req.user}, 'Successfully get authentication status');
};

const getKeys = async (req, res) => {
  const validatePayload = validator.isValidPayload(req.body, queryModel.getKeys);
  const postRequest = (result) =>
    (result.err)
      ? result
      : queryHandler.getKeys(result.data);

  const sendResponse = (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, 'Failed get KEYS')
      : wrapper.response(res, 'success', result, 'Successfully get KEYS');
  };

  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  login,
  logout,
  getInfo,
  getKeys,
  checkStatus,
};
