
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
// const queryHandler = require('../repositories/queries/query_handler');
const commandModel = require('../repositories/commands/command_model');
// const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');
const {SUCCESS: http } = require('../../../helpers/http-status/status_code');

const addTeacher = async (req, res) => {
  const payload = {...req.files, ...req.body, };
  const validatePayload = validator.isValidPayload(payload, commandModel.create);
  const postRequest = (result) =>
    (result.err)
      ? result
      : commandHandler.addTeacher(result.data,req.user);

  const sendResponse = (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, 'Create teacher')
      : wrapper.response(res, 'success', result, 'Create teacher', http.OK);
  };

  sendResponse(await postRequest(validatePayload));
};

const deleteTeacher = async (req, res) => {
  const payload = {...req.query};
  const validatePayload = validator.isValidPayload(payload, commandModel.deleteTeacher);
  const postRequest = (result) =>
    (result.err)
      ? result
      : commandHandler.deleteTeacher(result.data,req.user);

  const sendResponse = (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, 'Delete Teacher')
      : wrapper.response(res, 'success', result, 'Delete Teacher', http.OK);
  };

  sendResponse(await postRequest(validatePayload));
};

const updateAdmin = async (req, res) => {
  const payload = {...req.query};
  const validatePayload = validator.isValidPayload(payload, commandModel.deleteTeacher);
  const postRequest = (result) =>
    (result.err)
      ? result
      : commandHandler.updateAdmin(result.data,req.user);

  const sendResponse = (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, 'Upgrade to admin')
      : wrapper.response(res, 'success', result, 'Upgrade to admin', http.OK);
  };

  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  addTeacher,
  deleteTeacher,
  updateAdmin
};
