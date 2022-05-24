const handler = require('../../modules/teacher/handlers/api_handler');
// const pooling = require('../pooling/mongodbPooling');

const init = (router, jwtAuth) => {
  router.post('/teacher/add', jwtAuth.verifyToken, handler.addTeacher);
  router.put('/teacher/upgradeAdmin', jwtAuth.verifyToken, handler.updateAdmin);
  router.del('/teacher/delete', jwtAuth.verifyToken, handler.deleteTeacher);
};

module.exports = {
  init
};
