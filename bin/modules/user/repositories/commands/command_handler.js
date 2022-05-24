
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const Redis = require('../../../../helpers/cache/redis/common');
const Http = require('../../../../helpers/components/axios/http');
const config = require('../../../../infra/configs/global_config');
const redis = new Redis(config.get('/redisConfig'));
const http = new Http();

const createUser = async (payload) => {
  const db = new Mongo(`${config.get('/mongoDbUrl')}?authSource=admin`, `${payload.company}_db`);
  const dbMaster = new Mongo(`${config.get('/mongoDbUrl')}?authSource=admin`, 'masterDb');
  const user = new User(http, redis, db, dbMaster);
  const postCommand = async () => await user.createUser(payload);
  return await postCommand();
};


module.exports = {
  createUser
};
