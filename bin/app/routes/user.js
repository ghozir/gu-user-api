const handler = require('../../modules/user/handlers/api_handler');

const init = (router, jwtAuth, basicAuth) => {
  router.post('/user/create', basicAuth.isAuthenticated,  handler.createUser);
};

module.exports = {
  init
};
