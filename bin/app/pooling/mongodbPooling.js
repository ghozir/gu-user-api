const config = require('../../infra/configs/global_config');
const mongodbPooling = require('../../helpers/databases/mongodb/connection');

const connect = (req, res, next) => {
  mongodbPooling.init(`${config.get('/mongoDbUrl')}/${req.userInfo.school}_db?authSource=admin`);
  next();
};

module.exports = {
  connect
};
