const handler = require('../../modules/login/handlers/api_handler');
// const pooling = require('./mongodb_pooling');

const init = (router, jwtAuth, basicAuth) => {
  router.post('/user/login', basicAuth.isAuthenticated, handler.login);
  router.post('/user/logout', jwtAuth.verifyToken, handler.logout);
  router.get('/user/status', jwtAuth.verifyToken, handler.getInfo);
  router.post('/user/get-keys', handler.getKeys);
};

module.exports = {
  init
};
