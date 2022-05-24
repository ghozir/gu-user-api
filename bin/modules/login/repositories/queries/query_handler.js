
const Teacher = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const Redis = require('../../../../helpers/cache/redis/common');
const Http = require('../../../../helpers/components/axios/http');
const config = require('../../../../infra/configs/global_config');
// const common = require('../../../../helpers/utils/common');

// const db = new Mongo(config.get('/mongoDbUrl'));
const redis = new Redis(config.get('/redisConfig'));
const http = new Http();
const teacher = new Teacher(http, redis);

const getCached = async (cacheKey) => {
  const getData = async () => await teacher.getCached(cacheKey);
  return await getData();
};

const getKeys = async(payload) => {
  const getKeys = async () => await teacher.getKeys(payload);
  return await getKeys();
};

const checkStatus = async(payload) => {
  const checkStatus = async () => await teacher.checkStatus(payload);
  return await checkStatus();
};

const getTeacherInfo = async(payload) => {
  const db = new Mongo(`${config.get('/mongoDbUrlTeacher')}?authSource=admin`, `${payload.school}_db`);
  const teacher = new Teacher(http, redis,db);
  const teacherInfo = async () => await teacher.getTeacherInfo(payload);
  return await teacherInfo();
};

module.exports = {
  getCached,
  getKeys,
  checkStatus,
  getTeacherInfo
};
