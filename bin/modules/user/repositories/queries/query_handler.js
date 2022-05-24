
const Student = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const Redis = require('../../../../helpers/cache/redis/common');
const Http = require('../../../../helpers/components/axios/http');
const config = require('../../../../infra/configs/global_config');

// const db = new Mongo(config.get('/mongoDbUrl'));
const redis = new Redis(config.get('/redisConfig'));
const http = new Http();
const student = new Student(http, redis);

const getCached = async (cacheKey) => {
  const getData = async () => await student.getCached(cacheKey);
  return await getData();
};

const getStudentInfo = async(payload) => {
  const db = new Mongo(`${config.get('/mongoDbUrlStudent')}?authSource=admin`, `${payload.school}_db`);
  const student = new Student(http, redis,db);
  const studentInfo = async () => await student.getStudentInfo(payload);
  return await studentInfo();
};

const checkStatus = async (payload) => {
  const student = new Student(http, redis);
  const checkStatus = async () => await student.checkStatus(payload);
  return await checkStatus();
};

const getGrade = async(payload) => {
  const db = new Mongo(`${config.get('/mongoDbUrlActivation')}?authSource=admin`, 'activation_db');
  const student = new Student(http, redis,db);
  const grade = async () => await student.getGrade(payload);
  return await grade();
};

const getActivateLogs = async (payload) => {
  const db = new Mongo(`${config.get('/mongoDbUrlActivation')}?authSource=admin`, 'activation_db');
  const student = new Student(http, redis, db);
  const activateLogs = async () => await student.getActivateLogs(payload);
  return await activateLogs();
};

module.exports = {
  getCached,
  getStudentInfo,
  checkStatus,
  getGrade,
  getActivateLogs
};
