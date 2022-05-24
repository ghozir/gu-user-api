
const Teacher = require('./domain');
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const Redis = require('../../../../helpers/cache/redis/common');
const Http = require('../../../../helpers/components/axios/http');
const config = require('../../../../infra/configs/global_config');
const common = require('../../../../helpers/utils/common');
const redis = new Redis(config.get('/redisConfig'));
const http = new Http();

const login = async (payload) => {
  const db = new Mongo(`${config.get('/mongoDbUrl')}?authSource=admin`, `GalaxyUniversity`);
  const user = new User(http, redis, config, db);
  const postCommand = async () => await user.login(payload);
  return await postCommand();
};

const logout = async (cacheKey) => {
  const teacher = new Teacher(http, redis, config);
  const postCommand = async () => await teacher.logout(cacheKey);
  return await postCommand();
};

module.exports = {
  login,
  logout
};
