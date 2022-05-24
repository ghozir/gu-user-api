/* eslint-disable no-console */

const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const common = require('../../../../helpers/utils/common');
const config = require('../../../../infra/configs/global_config');
const { UnauthorizedError } = require('../../../../helpers/error');
const _ = require('lodash');
// const { NotFoundError } = require('../../../../helpers/error');

class Student {

  constructor(http, redis, db) {
    this.query = new Query(http, redis, db);
    this.ctx = 'Student::query-domain';
  }

  async getCached(cacheKey) {
    const result = await this.query.getCached(cacheKey);
    if (result.err) {
      logger.error(this.ctx, 'Failed to get student', 'getCached::query.getCached', result.err);
      return wrapper.error(result.err);
    }
    return wrapper.data(result.data);
  }

  async checkStatus(payload) {
    console.log(payload);
    const checkToken = common.parseString(payload.token);
    if (checkToken.err) {
      return wrapper.error(new UnauthorizedError('Invalid Token'));
    }

    const result = await this.query.getKeys(`*${checkToken.data.token}*`);
    delete checkToken.data.token;
    if (_.isEmpty(result.data)) {
      return wrapper.error(new UnauthorizedError('Token Expired!'), checkToken.data);
    }
    return wrapper.data(checkToken.data);
  }

  async getStudentInfo(payload) {
    const student = await this.query.findOne({ studentId: payload.studentId });
    if (student.err) {
      return wrapper.error(student.err);
    }
    student.data.id = student.data._id;
    student.data.school = common.setDomain(payload);
    delete student.data._id;
    delete student.data.password;
    delete student.data.createdAt;
    delete student.data.updatedAt;
    student.data.role = 'student';
    student.data.school = payload.school;
    if (!_.isEmpty(student.data.foto)) {
      student.data.linkFoto = `${config.get('/minioAsset')}`+
      `/${student.data.foto}?`+`time=${Math.floor(Date.now() / 1000)}`;
    }
    return wrapper.data(student.data);
  }
  async getGrade(payload) {
    payload = {
      subDomain: payload,
    };
    const grade = await this.query.getGrade(payload);
    if(grade.err){
      return wrapper.error(grade.err);
    }
    return wrapper.data(grade.data);
  }

  async getActivateLogs(payload){
    const data = await this.query.getActivateLogs(payload);
    if(data.err){
      return wrapper.error(data.err);
    }

    return wrapper.data(data.data);
  }
}

module.exports = Student;
